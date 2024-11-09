import { MainComp } from '@/components/mainPage/MainComp'
import { Suspense } from 'react'


const page = () => {
  return (
    <Suspense fallback={
      <div>
        Loading...
      </div>
    }>
      <MainComp />
    </Suspense>
  )
}

export default page
