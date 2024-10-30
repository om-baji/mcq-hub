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

  const fetchedOnce = useRef(false)

  useEffect(() => {
    if (fetchedOnce.current) return; 
    fetchedOnce.current = true; 

    const getQuestions = async () => {
      const tag = search.get('id') || "";
      const num = search.get('limit') || "0";
      const parsedLimit = parseInt(num);

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

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index);
  };

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
    </div>
  );
};

export default Page;
