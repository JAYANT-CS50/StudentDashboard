import React from 'react';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';
import { Radar } from './Radar';
import { BubbleChart } from './BubbleChart';
import { DoughnutChart } from './DoughnutChart';

export const Dashboard = ({ subData, setSubData }) => {
  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-md p-4">
            <BarChart />
          </div>
          <div className="border rounded-md p-4">
            <Radar />
          </div>
          <div className="border rounded-md p-4">
            <PieChart />
          </div>
          <div className="border rounded-md p-4">
            <DoughnutChart subData={subData} setSubData={setSubData} />
          </div>
          <div className="col-span-2 border rounded-md p-4">
            <BubbleChart subData={subData} setSubData={setSubData} />
          </div>
        </div>
      </section>
    </main>
  );
};
