import React from 'react'

export const Home = () => {
  return (
    <main className="bg-gray-100 min-h-16">
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-7">
      <div className="w-full md:w-1/2 p-4 border-4 rounded-md bg-white">
          <p className="text-justify leading-7">
            The project is a web application designed to assist students in planning their studies
            effectively. By inputting subjects and chapter names, students can visualize their
            workload through informative graphs. The app provides a user-friendly dashboard that
            helps manage time efficiently, optimize productivity, and enhance overall output. It
            empowers students to create better study plans, enabling them to effectively manage
            their workload and achieve improved academic results.
          </p>
        </div>
      </section>
    </main>
  )
}
