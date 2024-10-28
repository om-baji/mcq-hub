'use client'
import Question from '@/components/Question';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { MCQ } from '@/models/dbModels';
import { aiQuestion } from '@/server/actions/gemini';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
  const [questions, setQuestions] = useState<MCQ[] | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  const search = useSearchParams();
  const tag = search.get('id');

  const onFind = async () => {
    if (limit < 10 || limit > 25) {
      setError("Maximum 25 questions at a time, Min. 10, time must be 5, 10, or 15 minutes!");
      return;
    }

    try {
      const response = await aiQuestion(limit || 0, tag as string);
      if (!response.questions) throw new Error('Something went wrong!');
      setQuestions(response.questions || null);
      return { success: true, message: 'Successful fetch' };
    } catch (e) {
      console.log(e);
      toast({ title: 'Error fetching questions' });
      return { success: false, message: 'Unsuccessful fetch' };
    }
  };

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index);
  };

  if (!questions) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-300 '>
        <div className='flex flex-col items-center space-y-4'>
          <Input
            placeholder='Enter limit'
            type='number'
            min={5}
            max={20}
            className='w-64 p-2 border border-gray-600 bg-neutral-200 rounded '
            onChange={e => setLimit(parseInt(e.target.value))}
          />

          <Button className='w-32' onClick={onFind}>
            Start
          </Button>

          {error && (
            <small className="text-sm rounded bg-red-500 p-4 font-semibold">
              {error}
            </small>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center h-screen bg-gray-300 text-white'>
      <div className='flex w-full space-x-4 p-4 bg-gray-200 shadow-lg rounded justify-evenly overflow-y-scroll'>
        {questions.map((_, index) => (
          <Button
            key={index}
            className={`px-4 py-2 rounded-full ${selectedQuestion === index ? 'bg-zinc-500 text-white' : 'bg-gray-800'
              }`}
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
