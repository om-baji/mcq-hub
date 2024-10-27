import { useState } from 'react';
import { Button } from './ui/button';

interface QuestionTypes {
    title: string;
    tag: string;
    options: string[];
    correct: string;
}

const Question = ({ title, tag, options, correct }: QuestionTypes) => {
    const [selected, setSelectedAnswer] = useState<string | null>(null);
    const [isChecked, setisChecked] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const handleSelect = (option: string) => {
        setSelectedAnswer(option);
        setisChecked(true);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] h-full w-full p-2 bg-white/70 backdrop-blur-md border border-zinc-300 rounded-lg shadow-md">
            <div className="hidden md:flex justify-center items-center text-lg font-semibold text-zinc-700 bg-neutral-300">
                { }
                <img src={"https://images.unsplash.com/photo-1520509414578-d9cbf09933a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXIlMjBzY2llbmNlfGVufDB8fDB8fHww"} alt={tag} />
            </div>
            <div className="flex flex-col justify-start md:justify-center gap-4 mx-8">
                <div>
                    <span className="text-3xl font-light tracking-wider text-zinc-800">
                        Q. {title}
                    </span>
                </div>
                <div className="flex flex-col gap-4 w-full text-lg">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => !isChecked && handleSelect(option)}
                            className={`p-4 rounded-lg transition-all shadow-sm cursor-pointer text-zinc-700 
                                ${isChecked && selected === option && option === correct ? 'bg-green-300 hover:bg-green-200' : ''}
                                ${isChecked && selected === option && option !== correct ? 'bg-red-300 hover:bg-red-200' : ''}
                                ${!isChecked ? 'bg-zinc-100 hover:bg-zinc-200' : ''}
                            `}
                        >
                            {option}
                        </div>
                    ))}

                </div>

                <div>
                    <Button
                        onClick={() => setShowAnswer(true)}
                        disabled={!isChecked} >
                        Check!
                    </Button>
                </div>

                {showAnswer && (
                    <small className="text-md rounded bg-green-300 p-4 font-semibold leading-none space-y-4">{correct}</small>
                )}
            </div>
        </div>
    );
};

export default Question;
