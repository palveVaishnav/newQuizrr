import StartLiveTest from "@/components/StartLiveTest";

export default function TheTest() {
    return (
        <div>
            <StartLiveTest />
        </div>
    )
}




/*
// ------------------------------------------------------------------------------------
import { Check, ChevronDown, ChevronRight, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate

enum Qstatus {
    notVisited,
    answered,
    notAnswered,
    marked,
    markedAnswered
}

// question component
const QuestionComp: React.FC<{ question: Question; onAnswerChange: (index: number) => void }> = ({ question, onAnswerChange }) => {
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
export const TestComponent = ({ id }: { id: string }) => {
    const [test, setTest] = useState<Test | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // interaction handling
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // Fetch test data and store it in state
    useEffect(() => {
        async function fetchTest() {
            try {
                const backendUrl = `http://127.0.0.1:8080/api/test/${id}`;
                console.log("Fetching data from:", backendUrl);

                const response = await fetch(backendUrl);
                console.log("Raw response:", response);

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const jsonData: Test = await response.json();
                console.log("Response JSON:", jsonData);

                // Parse `options` field in each question
                const parsedData = {
                    ...jsonData,
                    sections: jsonData.sections.map((section) => ({
                        ...section,
                        questions: section.questions.map((question) => ({
                            ...question,
                            options: JSON.parse(question.options || '[]'), // Parse options field to make it an actual JSON array
                            answer: -1,
                            status: Qstatus.notVisited,
                        })),
                    })),
                };

                setTest(parsedData); // Store the parsed test data
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchTest();
        } else {
            setError("No test ID provided");
            setLoading(false);
        }
    }, [id]);

    // Function to handle form submission
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!test) {
            console.error("No test data to submit");
            return;
        }

        setSubmitting(true); // Set submitting state to true

        try {
            navigate('/submitpage', { state: { test } });

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
        updatedQuestion: Partial<Question>
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

    // Render loading, error, or test data
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <div className="flex flex-col text-left h-screen p-0">
            {test && (
                <>
                    <header className="bg-blue-500 text-white p-2 text-lg font-bold">
                        {test.name}
                    </header>

                    //Navigation bar
                    <nav className="bg-[#404040] text-white flex items-center justify-between p-2">
                        <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 bg-[#000] px-2 py-1 rounded-xl">
                                <span>All Sections</span>
                                <Info size={16} className="bg-blue-400 rounded-full" />
                            </button>
                        </div>
                        <p>Time Left:
                            <span className='bg-black py-1 px-2 rounded-xl'>
                                {test.time}
                            </span>
                        </p>
                        <div className="flex items-center space-x-4">
                            <button className="px-2 py-1 rounded flex items-center space-x-1">
                                <Info size={16} className='bg-green-500 rounded-xl' />
                                <span>Question Paper</span>
                            </button>
                            <button className="px-2 py-1 rounded flex items-center space-x-1">
                                <Info size={16} className='bg-blue-400 rounded-xl' />
                                <span>Instructions</span>
                            </button>
                        </div>
                    </nav>

                    //  Main content
<div className="flex flex-1 overflow-hidden">
    {/* Left panel 
    <div className="flex-1 overflow-auto">
        //   Sections
        <div className="flex border justify-stretch">
            {test.sections && test.sections.length > 0 ? (
                test.sections.map((section, idx) => (
                    <div key={section.id} className='flex justify-stretch'>
                        <button
                            className={`border px-4 py-2 flex gap-2 items-center ${idx === currentSection ? 'bg-blue-400' : ''}`}
                            onClick={() => handleSectionSwitch(idx)}
                        >
                            {section.title}
                            <Info size={16} className="bg-blue-400 rounded-full text-white" />
                        </button>
                    </div>
                ))
            ) : (
                <p>No sections available</p>
            )}
        </div>

        <div className="bg-white">
            <div className="flex justify-between items-center mb-4 px-6">
                <span className="text-gray-500 font-bold flex items-center gap-2">
                    Question No. {currentQuestion + 1}
                    <p className='text-gray-400'>{`#${test.sections[currentSection].questions[currentQuestion].id}`}</p>
                </span>
                <div className="flex space-x-2 text-red-500">
                    <button className="flex items-center">
                        <span>Section Details</span>
                        <ChevronDown size={16} />
                    </button>
                    <button className="flex items-center text-purple-500">
                        <span>Marking Scheme</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className='p-4 text-center border-b'>
                <h2 className="text-xl font-semibold mb-2">
                    {test.sections[currentSection].title} (Maximum Marks: {test.sections[currentSection].maxMarks})
                </h2>
                <h3 className="text-lg mb-4">Only One Option Correct Type</h3>
                <p className="mb-4">This section contains {test.sections[currentSection].questions.length} questions.</p>
            </div>

            //  Display questions and handle updates 
            {test.sections[currentSection].questions.map((question, index) => (
                index === currentQuestion && (
                    <QuestionComp
                        key={question.id}
                        question={question}
                        onAnswerChange={(answerIndex) => handleUpdateQuestion(question.sectionsId, question.id, { answer: answerIndex, status: Qstatus.answered })}
                    />
                )
            ))}
        </div>
    </div>

    //   Right panel 
    <div className="max-w-80 bg-gray-00 overflow-auto border">
        <div className="mt-4 space-y-2 grid grid-cols-2 text-sm border-b border-black p-2">
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 flex items-center justify-center"
                    style={{
                        clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 100% 100%, 0 100%, 0% 50%)",
                    }}
                >
                    {0}
                </div>
                <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-500 flex items-center justify-center"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    }}
                ></div>
                <span>Not Answered</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="rounded-xl border border-blue-600 h-8 w-8 flex items-center justify-center"
                >
                    {0}
                </div>
                <span>Not Visited</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-purple-500 rounded-full p-4 flex items-center justify-center"
                >
                    {0}
                </div>
                <span>Marked for Review</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2">
                <div className="w-10 h-10 bg-purple-500 rounded-full p-4 flex relative items-center justify-center">
                    <Check size={28} strokeWidth={2.75} className='text-green-400 absolute mt-6' />
                    {0}
                </div>
                <span className=''>Answered & Marked for Review (will be considered for evaluation)</span>
            </div>
        </div>
        <div>
            <h3 className="font-bold mb-2 bg-blue-400 text-white p-2">
                {test.sections[currentSection].title}
            </h3>

            <div className='p-2'>
                <p className="mb-2">Choose a question</p>
                <div className="grid grid-cols-5 gap-2">
                    {test.sections[currentSection].questions.map((question, i) => (
                        <button
                            key={i}
                            className={`w-10 h-10 border rounded-md     
                                                    ${question.status === Qstatus.notVisited ? 'border border-blue-500 rounded-md' : ''}
                                                    ${question.status === Qstatus.answered ? ' bg-green-500 polygonUp  overflow-hidden' : 'overflow-hidden'}
                                                    ${question.status === Qstatus.notAnswered ? ' bg-red-500 polygonDown' : ''}
                                                    ${question.status === Qstatus.marked ? 'bg-purple-500 rounded-full' : ''}
                                                    ${question.status === Qstatus.markedAnswered ? 'bg-purple-500 text-white border-green-500' : ''}
                                                    `}
                            onClick={() => {
                                setCurrentQuestion(i)
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
</div>

//  Submit button 
<footer className="p-2 flex justify-between border">
    <div className='flex gap-2'>
        <button className="border text-gray-800 px-10 py-2 "
            onClick={() => {
                const ans = test.sections[currentSection].questions[currentQuestion].answer;
                // section id, question id and changes
                handleUpdateQuestion(test.sections[currentSection].id, test.sections[currentSection].questions[currentQuestion].id, { status: ans === -1 ? Qstatus.marked : Qstatus.markedAnswered })
                if (currentQuestion < test.sections[currentSection].questions.length - 1) {
                    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                } else {
                    handleSectionSwitch(currentSection + 1)
                }
            }}
        >
            Mark for Review & Next
        </button>
        <button className="border text-gray-800 px-10 py-2 "
            onClick={() =>
                handleUpdateQuestion(test.sections[currentSection].id, test.sections[currentSection].questions[currentQuestion].id, { status: Qstatus.notAnswered, answer: -1 })
            }
        >
            Clear Response
        </button>
    </div>
    <div className='flex gap-10 mr-20'>
        <button className="bg-blue-500 text-white px-10 py-2"
            onClick={() => {
                const ans = test.sections[currentSection].questions[currentQuestion].answer;
                handleUpdateQuestion(test.sections[currentSection].id, test.sections[currentSection].questions[currentQuestion].id, { status: ans === -1 ? Qstatus.notAnswered : Qstatus.answered, answer: ans })
                if (currentQuestion < test.sections[currentSection].questions.length - 1) {
                    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                } else {
                    handleSectionSwitch(currentSection + 1)
                }
            }}
        >Save & Next
        </button>
        <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
    </div>
</footer>
                </>
            )
            }
        </div >
    );
};

*/