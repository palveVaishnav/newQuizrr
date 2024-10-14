"use client"
import { liveTest, Qstatus, question } from '@/state/livetest';
import { questionType } from '@/types/question';
// import { Check, ChevronDown, ChevronRight, Info } from 'lucide-react';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate
import { useRecoilState } from 'recoil';



// question component
const QuestionComp: React.FC<{ question: questionType; onAnswerChange: (index: number) => void }> = ({ question, onAnswerChange }) => {
    return (
        <div style={{ marginBottom: '1em' }}>
            <p><strong>Q: {question.question}</strong></p>
            {question.options.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={question.answer === index}
                            onChange={() => onAnswerChange(index)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default function TestComponent() {
    const [test, setTest] = useRecoilState(liveTest)

    // interaction handling
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // Function to handle form submission
    // const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!test) {
            console.error("No test data to submit");
            return;
        }
        setSubmitting(true); // Set submitting state to true

        try {
            // navigate('/submitpage', { state: { test } });

        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setSubmitting(false); // Reset submitting state
        }
    };



    // Function to handle question updates
    const handleUpdateQuestion = (
        sectionId: string,
        questionId: string,
        updatedQuestion: Partial<question>
    ) => {
        if (!test) return;

        // Find and update the question within the sections
        const updatedSections = test.sections.map((section) => {
            if (section.id !== sectionId) return section;

            return {
                ...section,
                questions: section.questions.map((question) =>
                    question.id === questionId
                        ? {
                            ...question,
                            ...updatedQuestion
                        }
                        : question
                ),
            };
        });

        setTest({ ...test, sections: updatedSections }); // Update the state
    };


    // Function to handle section switch
    const handleSectionSwitch = (index: number) => {
        if (!test) return;
        if (index > test?.sections.length - 1) handleSubmit()

        setCurrentSection(index);
        setCurrentQuestion(0); // Reset question number when switching sections
    };

    console.log("inside live")
    console.log(test)

    return (
        <>Hello</>
    )

};