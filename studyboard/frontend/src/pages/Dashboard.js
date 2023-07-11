import React from 'react'
import { BarChart } from './BarChart'
import { PieChart } from './PieChart'
import { BarChartChapter } from './BarChartChapter'

export const Dashboard = () => {
  return (
    <main>
    <section className="max-w-7xl mx-auto py-7">
      <div className="flex justify-start flex-wrap other:justify-evenly">
      <div className='w-1/2'><BarChart /></div>
      <div className='w-1/2'><BarChartChapter /></div>
      <div className='w-1/2'><PieChart /></div>
      
      </div>
    </section>
    </main>

  )
}
