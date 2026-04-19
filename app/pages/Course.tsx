"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function CoursesPage({userObj}: {userObj: UserObj | null}) {
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
    }, []);

    const time = new Date().getHours();
    const greeting = time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";

    return(
        <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black font-sans">
            <div className="flex flex-col items-center py-8">
                <h1 className="text-3xl font-semibold">Course</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {userObj?.fullName ? `${greeting}, ${userObj.fullName}!` : 'You are currently signed out.'}
                </p>
            </div>

            <div className="flex-1 px-4 pb-8">
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
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course ? (
                            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                                <p className="text-gray-600 dark:text-gray-400">{course.description || "No description available."}</p>
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Category: {course.category || "Uncategorized"}</p>
                                <pre>{course.data || "No data available."}</pre>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">Course not found.</p>
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