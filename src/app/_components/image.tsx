"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const AltImage = ({ defaultSrc, alternateSrc, alt }: { 
    defaultSrc: string, 
    alternateSrc: string,
    alt: string
}) => {
    const { theme } = useTheme();
    return (
        <Image
            src={theme === "dark" ? defaultSrc : alternateSrc}
            alt={alt}
            width={18}
            height={18}
        />
    );
}

export default AltImage;