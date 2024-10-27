'use client'
import { Input } from '@/components/ui/input';
import { MCQ } from '@/models/dbModels';
import { getQuestion } from '@/server/actions/getQuestion';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Question from '@/components/Question';
import { aiQuestion } from '@/server/actions/gemini';

const page = () => {
  const [questions, setQuestions] = useState<MCQ[] | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const search = useSearchParams();
  const tag = search.get('id');

  const onFind = async () => {
    try {
      const response = await aiQuestion( limit || 0, tag as string);
      if (!response.questions) throw new Error('Something went wrong!');
      setQuestions(response.questions || null);
      return { success: true, message: 'Successful fetch' };
    } catch (e) {
      console.log(e)
      toast({ title: 'Error fetching questions' });
      return { success: false, message: 'Unsuccessful fetch' };
    }
  };

  const handleQuestionSelect = (index: number) => {
    setSelectedQuestion(index);
  };

  if (!questions) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-50'>
        <div className='flex flex-col items-center space-y-4'>
          <Input
            placeholder='Enter limit'
            className='w-64 p-2 border border-gray-300 rounded shadow'
            onChange={e => setLimit(parseInt(e.target.value))}
          />
          <Button className='w-32' onClick={onFind}>
            Find Questions
          </Button> 
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center h-screen bg-gray-100'>
      <div className='flex w-full space-x-4 p-4 bg-white shadow rounded justify-evenly'>
        {questions.map((_, index) => (
          <Button
            key={index}
            className={`px-4 py-2 ${selectedQuestion === index ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`}
            onClick={() => handleQuestionSelect(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      {selectedQuestion !== null && (
        <div className='mt-6 p-2 rounded shadow w-full h-screen'>
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

export default page;
