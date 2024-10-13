"use client"
import { useEffect, useState } from "react";
import TypingAnimation from "./ui/typing-animation";


const examData = [
    { name: 'JEE Main' },
    { name: 'JEE Advanced' },
    { name: 'BITSAT' },
    { name: 'UGEE' },
    { name: 'COMEDK' },
    { name: 'KCET' },
    { name: 'AP EAMCET' },
    { name: 'TS EAMCET' },
    { name: 'WBJEE' },
    { name: 'MHT CET' },
    { name: 'VITEEE' },
    { name: 'Manipal (MET)' },
    { name: 'SRMJEEE' },
]

export function TextTyping() {
    const changingTag: string[] = [];
    examData.map((exam) => {
        changingTag.push(exam.name)
    })
    const [currentTagIndex, setCurrentTagIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTagIndex(prevIndex => (prevIndex + 1) % changingTag.length);
        }, 3000); // Change tag every 3 seconds

        return () => {
            clearInterval(timer);
        };
    }, [changingTag.length]);

    return (
        <TypingAnimation
            key={currentTagIndex}
            text={changingTag[currentTagIndex]}
        />
    )
}