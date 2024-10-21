import React from 'react';
import { Button } from './ui/button';

interface QuestionTypes {
    title: string;
    tag: string;
    options: string[];
}

const Question = ({ title, tag, options }: QuestionTypes) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] h-full w-full p-2 bg-white/70 backdrop-blur-md border border-zinc-300 rounded-lg shadow-md">
            <div className="hidden md:flex justify-center items-center text-lg font-semibold text-zinc-700 bg-neutral-300">
                {tag}
            </div>
            <div className="flex flex-col justify-start md:justify-center gap-4 mx-8">
                <div>
                    <span className="text-3xl font-light tracking-wider text-zinc-800">
                        Q. {title}
                    </span>
                </div>
                <div className="flex flex-col gap-4 w-full text-lg">
                    {options.map((option) => {
                        return <div className="bg-zinc-100 p-4 rounded-lg hover:bg-zinc-200 transition-all shadow-sm cursor-pointer text-zinc-700">
                            {option}
                        </div>
                    })}
                </div>

                <div>
                    <Button variant={"outline"}
                    >Check</Button>
                </div>
            </div>
        </div>
    );
};

export default Question;
