import { useState } from 'react';
import { Button } from './ui/button';

interface QuestionTypes {
    title: string;
    tag: string;
    options: string[];
    correct: string;
}
const Question = ({ title, tag, options, correct}: QuestionTypes) => {
    const [selected, setSelectedAnswer] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const handleSelect = (option: string) => {
        setSelectedAnswer(option);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
            <div className="grid-cols-1 w-full p-4 md:flex md:space-x-4 bg-zinc-100 rounded-lg shadow-lg">
                <div className=" md:flex md:w-1/3 items-center justify-center bg-neutral-300 rounded-lg overflow-hidden">
                    <img
                        className="max-h-1/4 md:h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1520509414578-d9cbf09933a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww"
                        alt={tag}
                    />
                </div>

                <div className="flex-1 flex flex-col gap-6 p-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-zinc-500">
                        <span className="uppercase tracking-wide">{tag}</span>
                        <span className='justify-end bg-neutral-600 text-white rounded-full p-2'>{30}</span>
                    </div>
                    <h1 className="text-2xl font-light text-zinc-900 leading-tight">Q. {title}</h1>
                    <div className="space-y-3">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`p-4 rounded-lg cursor-pointer text-zinc-800 transition-all
                              ${showAnswer ? (option === correct ? 'bg-green-300 text-white' : (option === selected ? 'bg-red-300 text-white' : 'bg-zinc-200')) : (selected === option ? 'bg-blue-300 text-white' : 'bg-zinc-200')}
                            `}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={() => setShowAnswer(true)}
                        disabled={!selected}
                        className="self-center mt-4 w-full md:w-auto px-6 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 disabled:bg-zinc-500"
                    >
                        Check!
                    </Button>
                    {showAnswer && (
                        <div className="mt-4 p-4 bg-green-100 text-green-900 rounded-md text-center font-medium">
                            Correct Answer: {correct}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Question;
