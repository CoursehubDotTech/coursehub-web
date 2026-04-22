"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";

export type UserObj = {
    fullName: string;
}

type Course = {
    id: string;
    name: string;
    description: string | null;
    category: string | null;
    data: string | null;
}

export default function Course({userObj}: {userObj: UserObj | null}) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const id = useParams().id as string;
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch("/api/courses");
                if (!response.ok) {
                    if (response.status === 401) {
                        setError("Please log in to view courses");
                    } else {
                        setError("Failed to load courses");
                    }
                    return;
                }
                const data = await response.json();
                setCourses(data);
                setCourse(data.find((c: Course) => c.id === id) || null); // For demonstration, we just take the first course
            } catch (err) {
                setError("Failed to load courses");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, [id]);

    const time = new Date().getHours();
    const greeting = time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";

    return(
        <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black font-sans">
            <div className="flex flex-col items-center py-8">
                {course ? (
                    <>
                    <h1 className="text-4xl font-semibold mb-2">{course.name}</h1>
                <span className="text-[1rem] font-mono text-center">{course.description || "No description available."}</span>
                <p className="mt-4 text-sm rounded-xl p-1">{course.category || "Uncategorized"}</p>
                    </>            
                ) : null}
                <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                    {userObj?.fullName ? `${greeting}, ${userObj.fullName}! Have fun learning!` : 'You are currently signed out.'}
                </p>
            </div>

            <div className="flex-1 px-4 pb-8 w-full">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">Loading course...</p>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">This course doesn&apos;t exist.</p>
                    </div>
                )}

                {!loading && !error && courses.length > 0 && (
                    <div className="max-w-4xl mx-auto grid">
                        {course ? (
                            <div className="p-3.5 rounded-md hover:rounded-xl transition-all duration-500 w-full! card">
                                <Markdown
                                components={{
                                    h1: (props)=>{
                                        return <h1 className="text-2xl font-bold mb-4">{props.children}</h1>
                                    },
                                    h2: (props)=>{
                                        return <h2 className="text-xl font-bold mb-3">{props.children}</h2>
                                    },
                                    h3: (props)=>{
                                        return <h3 className="text-lg font-bold mb-2">{props.children}</h3>
                                    },
                                    strong: (props)=>{
                                        return <strong className="font-bold text-highlight">{props.children}</strong>
                                    },
                                    blockquote: (props)=>{
                                        return <blockquote className="italic pl-3 text-lg font-semibold">{props.children}</blockquote>
                                    }
                                }}
                                >{course.data || "> No data available."}</Markdown>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">The course you are looking for doesn&apos;t exist.</p>
                            </div>
                        )}    
                    </div>
                )}
            </div>

            <div className="flex justify-center py-4">
                <Link href="/" className="text-purple-700 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
                    ← Back to homepage
                </Link>
            </div>
        </div>
    )
}
