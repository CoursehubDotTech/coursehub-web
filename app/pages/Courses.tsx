"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export type UserObj = {
    fullName: string;
}

type Course = {
    id: string;
    name: string;
    description: string | null;
    category: string | null;
}

export default function CoursesPage({userObj}: {userObj: UserObj | null}) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
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
                <h1 className="text-3xl font-semibold">Courses</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {userObj?.fullName ? `${greeting}, ${userObj.fullName}!` : 'You are currently signed out.'}
                </p>
            </div>

            <div className="flex-1 px-4 pb-8">
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">Loading courses...</p>
                    </div>
                )}

                {error && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {!loading && !error && courses.length === 0 && (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No courses available yet.</p>
                    </div>
                )}

                {!loading && !error && courses.length > 0 && (
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {course.name}
                                    </h3>
                                    {course.category && (
                                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                            {course.category}
                                        </p>
                                    )}
                                    {course.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                            {course.description}
                                        </p>
                                    )}
                                    <button className="mt-4 w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-3 rounded transition-colors">
                                        View Course
                                    </button>
                                </div>
                            </div>
                        ))}
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