import React from 'react'
import { ChevronRight } from "lucide-react"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CustomCard from '@/components/CustomCard'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>

      <div className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        MCQ Hub
      </div>
      <h3 className="leading-7 [&:not(:first-child)]:mt-6">
        An ideal practice destination
      </h3>

      <div>
        <Button
          variant="outline" size="icon" className='w-35 p-2'>
          <ChevronRight className="h-4 w-4" />
          <Link href={"/sign-in"}>Get Started</Link>
        </Button>
      </div>

      

    </div>
  )
}

export default page;
