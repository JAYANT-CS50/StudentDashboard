import React from 'react'
import { BarChart } from './BarChart'
import { PieChart } from './PieChart'

export const Dashboard = () => {
  return (
    <main>
    <section className="grid grid-flow-col justify-stretch ">
      <div ><BarChart /></div>
      <div ><PieChart /></div>
    </section>
    </main>
    
  )
}
