'use client'
import Question from '@/components/Question';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { MCQ } from '@/models/dbModels';
import { aiQuestion } from '@/server/actions/gemini';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { ReloadIcon } from "@radix-ui/react-icons"

const Page = () => {
  const [questions, setQuestions] = useState<MCQ[] | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const search = useSearchParams();
  const [time, setTime] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const fetchedOnce = useRef(false)

  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const getQuestions = async () => {
      const tag = search.get('id') || "";
      const num = search.get('limit') || "0";

      const parsedLimit = parseInt(num);

      if (parsedLimit == 10) setTime(3 * 60)
      else if (parsedLimit == 15) setTime(5 * 60)
      else setTime(7 * 60)

      try {
        const response = await aiQuestion(parsedLimit, tag);
        if (!response.questions) throw new Error('Something went wrong!');
        setQuestions(response.questions);
      } catch (e) {
        console.error(e);
        toast({ title: 'Error fetching questions' });
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [search]);

  useEffect(() => {
    if (time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [time]);

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index);
  };

  if (time < 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-900 text-white">
        <h1 className="text-4xl font-bold">Test Over</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-gray-200">
        <ReloadIcon className="animate-spin text-gray-300 w-12 h-12" />
        <p className="mt-4 text-lg font-semibold text-gray-200">Loading...</p>
      </div>
    );
  }

  if (!questions) {
    toast({ title: "Unsuccessful fetch" });
    return <div>No questions found.</div>;
  }

  return (
    <div className='flex flex-col items-center h-screen bg-gray-300 text-white'>
      <div className='flex w-full space-x-4 p-4 bg-gray-200 shadow-lg rounded justify-evenly overflow-y-scroll'>

        {questions.map((_, index) => (
          <Button
            key={index}
            className={`px-4 py-2 rounded-full ${selectedQuestion === index ? 'bg-zinc-500 text-white' : 'bg-gray-800'}`}
            onClick={() => handleQuestionSelect(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      {selectedQuestion !== null && (
        <div className='rounded-lg shadow-lg w-full h-[85vh]'>
          <Question
            key={selectedQuestion}
            title={questions[selectedQuestion].question}
            options={questions[selectedQuestion].options}
            tag={questions[selectedQuestion].tag}
            correct={questions[selectedQuestion].correctAnswer}
          />
        </div>
      )}
      <div className="fixed bottom-4 right-4 bg-gray-800 bg-opacity-75 text-yellow-400 text-xl font-semibold p-2 rounded-lg shadow-lg">
        Time Left: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Page;
