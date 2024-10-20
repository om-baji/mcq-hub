'use client'
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { verifyUser } from '@/server/actions/verification';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Verify = ({ params }: { params: { username: string } }) => {

  const [verifyCode,setVerifyCode] = useState("");
  const router = useRouter();

  const onVerify = async () => {
    const response = await verifyUser({username : params.username, otp : verifyCode})

    if(!response.success) {
      toast({
        title : "Verification failed",
        description : response.message
      })
      return;
    }

    toast({
      title : "Verification Successfull",
      description : "You can login now!"
    })

    router.replace("/main")

  }

  return (
    <div className='flex flex-col justify-center items-center h-screen px-6'>
      <div className='bg-white dark:bg-zinc-900 shadow-lg rounded-md p-8 max-w-sm w-full'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>Verification Page</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
          A verification code has been sent to your email address with username <span className='underline'>{params.username}</span>. Please enter the code below. The code will expire in 1 hour.
        </p>
        <Input
          onChange={e => setVerifyCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          onClick={onVerify}
          className="w-full mt-4 bg-zinc-800 text-white rounded-md py-2 hover:bg-neutral-600 transition duration-200"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default Verify;
