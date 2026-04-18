"use client"

import Link from "next/link";

export type UserObj = {
    fullName: string;
}
//import { useEffect, useState } from "react";

export default function Homepage({userObj}: {userObj: UserObj | null}) {
    const time= new Date().getHours();
    const greeting = time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";
    
    return(
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <h1 className="text-2xl font-semibold">Welcome to Coursehub</h1>
      <p className="mt-2 text-sm">
        {userObj?.fullName ? `${greeting}, ${userObj.fullName}!` : 'You are currently signed out. Please login to view courses.'}
      </p>
      <p className="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-md">
        CourseHub is a free platform where students can learn tech through clean, text-based lessons and earn shareable certificates. No paywalls, no friction — just sign in and start learning!
      </p>
      {userObj && 
      <h3 className="text-6xl font-bold mt-6 text-red-600!">Courses coming soon!</h3>
      }

      <Link href="/" className="mt-6 bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
        Back to homepage
      </Link>
    </div>
)
}