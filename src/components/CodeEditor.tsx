"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useEffect, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useTheme } from "next-themes";
import { darkMode, lightMode, themeColors } from "data/editor-themes";

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CodeEditor() {
	const room = useRoom();
	const [element, setElement] = useState<HTMLElement>();
	const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();

	const { theme } = useTheme();

	// Get user info from Liveblocks authentication endpoint
	const userInfo = useSelf((me) => me.info);

	const ref = useCallback((node: HTMLElement | null) => {
		if (!node) return;
		setElement(node);
	}, []);



	// Set up Liveblocks Yjs provider and attach CodeMirror editor
	useEffect(() => {
		let provider: LiveblocksYjsProvider;
		let ydoc: Y.Doc;
		let view: EditorView;

		if (!element || !room || !userInfo) {
			return;
		}

		// Create Yjs provider and document
		ydoc = new Y.Doc();
		provider = new LiveblocksYjsProvider(room as any, ydoc);
		const ytext = ydoc.getText("codemirror");
		const undoManager = new Y.UndoManager(ytext);
		setYUndoManager(undoManager);

		// Attach user info to Yjs
		provider.awareness.setLocalStateField("user", {
			name: userInfo.name,
			color: userInfo.color,
			colorLight: userInfo.color + "80", // 6-digit hex code at 50% opacity
		});

		// Set up CodeMirror and extensions
		const state = EditorState.create({
			doc: ytext.toString(),
			extensions: [
				basicSetup,
				javascript(),
				yCollab(ytext, provider.awareness, { undoManager }),
				theme === "dark" ? darkMode : lightMode
			],
		});

		// Attach CodeMirror to element
		view = new EditorView({
			state,
			parent: element,
		});

		return () => {
			ydoc?.destroy();
			provider?.destroy();
			view?.destroy();
		};
	}, [element, room, userInfo, theme]);

	return (
		<div className={`flex flex-col relative rounded-lg dark:bg-[#1e1e1e] bg-white p-4 h-full w-full`}>
			<div className={"flex flex-row items-center justify-between"}>
				<div>
				{/* {yUndoManager ? <Toolbar yUndoManager={yUndoManager} /> : null} */}
				</div>
				{/* <Avatars /> */}
			</div>
			<div className={"relative flex-1"} ref={ref}></div>
		</div>
	);
}
