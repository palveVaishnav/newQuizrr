"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { useRecoilValue } from "recoil";
import { examAtom } from "@/state/exam";
import { useRouter } from "next/navigation";
import { RadioGroup } from "./ui/radio-group";
import { examType } from "@/types/test";
import { sectionWithQuestionType } from "@/types/section";
import { questionType } from "@/types/question";
import { Separator } from "./ui/separator";

export default function StartLiveTest() {
    const exam = useRecoilValue<examType>(examAtom);
    const router = useRouter();

    // State for timer
    const [timeLeft, setTimeLeft] = useState(exam.testTime * 60 + 30); // 30 seconds extra
    const [activeSection, setActiveSection] = useState<sectionWithQuestionType>(exam.sections[0]);
    const [activeQuestion, setActiveQuestion] = useState<questionType>(activeSection.questions[0]);

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Redirect if exam does not exist
    if (!exam) {
        router.push('/home');
        return <div>Loading...</div>; // Loading state
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="container mx-auto p-4">
            {/* Header Section */}
            <header className="bg-blue-500 text-white p-4 flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">{exam.title}</h1>
                <span>Time Left: {formatTime(timeLeft)}</span>
            </header>

            {/* Main Content Area */}
            <div className="flex space-x-4">
                <div className="w-3/4">
                    <Tabs defaultValue={activeSection.title}>
                        {/* Section Buttons */}
                        <div className="grid w-full grid-cols-5">
                            {exam.sections.map((section) => (
                                <Button
                                    key={section.id}
                                    className={`${section.id === activeSection.id ? 'bg-blue-500 text-white' : ''
                                        }`}
                                    onClick={() => {
                                        setActiveSection(section);
                                        setActiveQuestion(activeSection.questions[0]); // Reset to first question of the new section
                                    }}
                                >
                                    {section.questions.length < 1 && <p>No Questions</p>}
                                    {section.title}
                                </Button>
                            ))}
                        </div>

                        {/* Active Section Content */}
                        <TabsContent value={activeSection.title}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex justify-between">
                                        <span>Question id. #{activeQuestion.id}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-4 border border-black">
                                        <h3 className="font-semibold mb-2">{activeSection.title}</h3>
                                        <p className="text-sm mb-4">Only One Option Correct Type</p>
                                        <p className="mb-4">
                                            This section contains {activeSection.questions.length} questions. Each question has multiple options out of which ONLY ONE is correct.
                                        </p>
                                    </div>
                                    <Separator />
                                    <span className="text-xl ">
                                        {activeQuestion.question}
                                    </span>
                                    <div className="mb-4 font-mono">
                                        <RadioGroup>
                                            {JSON.parse(activeQuestion.options).map((option: string, index: number) => (
                                                <div key={index}>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name={`question-${activeQuestion.id}`}
                                                            checked={activeQuestion.answer === index}
                                                        // Handle change to update answer here if needed
                                                        />
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4">
                        <Button variant="outline">Mark for Review & Next</Button>
                        <Button variant="outline">Clear Response</Button>
                        <Button variant="default">Save & Next</Button>
                        <Button variant="secondary">Submit</Button>
                    </div>
                </div>

                {/* Sidebar for Questions */}
                <div className="w-1/4">
                    <Card>
                        <CardHeader>
                            <CardTitle>{activeSection.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">Choose a question</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {activeSection.questions.map((question, idx) => (
                                    <Button
                                        key={question.id}
                                        variant={question.id === activeQuestion.id ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setActiveQuestion(question)}
                                    >
                                        {idx + 1}
                                    </Button>
                                ))}
                            </div>

                            {/* Status Indicators */}
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">0</span>
                                    <span>Answered</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">1</span>
                                    <span>Not Answered</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">19</span>
                                    <span>Not Visited</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">0</span>
                                    <span>Marked for Review</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">0</span>
                                    <Info className="w-4 h-4" />
                                    <span>Answered & Marked for Review (will be considered for evaluation)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
