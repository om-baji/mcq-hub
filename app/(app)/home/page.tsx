import CustomCard from '@/components/CustomCard'
import React from 'react'
import { subjects } from '@/server/utilities'

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(({ title, description }) => (
          <CustomCard 
            key={title} 
            title={title} 
            description={description} 
          />
        ))}
      </div>
    </div>
  )
}

export default Home
