import { EditorView } from "codemirror";

const themeColors = {
    dark: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        caret: "#ffcc00",
        selection: "#44475a",
        gutter: "#313131",
    },
    light: {
        background: "#ffffff",
        foreground: "#4d4d4c",
        caret: "#222222",
        selection: "#d6d6d6",
        gutter: "#eeeeee",
    }
}

const darkMode = EditorView.theme({
    "&": {
        color: themeColors.dark.foreground,
        backgroundColor: themeColors.dark.background
    },
    ".cm-content": {
        caretColor: themeColors.dark.caret
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: themeColors.dark.foreground
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: themeColors.dark.selection
    },
    ".cm-gutters": {
        backgroundColor: themeColors.dark.gutter,
        color: themeColors.dark.foreground,
    }
})

const lightMode = EditorView.theme({
    "&": {
        color: themeColors.light.foreground,
        backgroundColor: themeColors.light.background
    },
    ".cm-content": {
        caretColor: themeColors.light.caret
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: themeColors.light.foreground
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: themeColors.light.selection,
    },
    ".cm-gutters": {
        backgroundColor: themeColors.light.gutter,
        color: themeColors.light.foreground,
    }
})

export { darkMode, lightMode, themeColors }