'use client'
import { Input } from '@/components/ui/input';
import { MCQ } from '@/models/dbModels';
import { getQuestion } from '@/server/actions/getQuestion';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Question from '@/components/Question';

const page = () => {

  const [questions,setQuestions] = useState<MCQ[] | null>(null);
  const [limit,setLimit] = useState<number | null>(null);
  const search = useSearchParams();

  const tag = search.get("id")

  const onFind = async () => {
    try {
      const response = await getQuestion(tag as string,limit || 0);
        if(!response.questions) throw new Error("Something went wrong!")
        console.log(response)
      
        setQuestions(response.questions || null)

        return {
          success : true,
          message : "Succesfull fetch"
        }

    } catch (e) {
      toast({
        title : "Error fetuching questions"
      })
      console.log(e)
      return {
        success : false,
        message : "Unsuccesfull fetch"
      }
    }
  }

  if(!questions) {
    return (
      <div className='flex justify-center items-center h-screen'>
          <Input placeholder='Enter limit' 
          onChange={e => setLimit(parseInt(e.target.value))}
          />
          <Button onClick={onFind}
          >Find</Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
    {
      questions.map((question) => {
        return <Question 
        title={question.question}
        options={question.options}
        tag={question.tag}
        />
      })
    }
    </div>
  )
}

export default page
