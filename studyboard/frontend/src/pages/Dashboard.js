import React from 'react'
import { BarChart } from './BarChart'
import { PieChart } from './PieChart'
import { Radar } from './Radar'
import { BubbleChart } from './BubbleChart'
import { DoughnutChart } from './DoughnutChart'

export const Dashboard = ({subData, setSubData}) => {
  return (
    <main>
    <section className="max-w-7xl mx-auto py-7">
      <div className="flex justify-start flex-wrap other:justify-evenly">
      <div className='w-1/2'><BarChart /></div>
      <div className='w-1/2'><Radar /></div>
      <div className='w-1/2'><PieChart /></div>
      <div className='w-1/2'><DoughnutChart subData={subData} setSubData={setSubData} /></div>
      <div className='w-full'><BubbleChart subData={subData} setSubData={setSubData} /></div>
      
      </div>
    </section>
    </main>

  )
}
