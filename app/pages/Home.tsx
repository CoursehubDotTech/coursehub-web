"use client"

interface UserObj {
    fullName: string;
    emailAddresses: { emailAddress: string }[];
    primaryEmailAddress: string;
    totpEnabled: boolean;
}
//import { useEffect, useState } from "react";

export default function Homepage({userObj}: {userObj: UserObj | null}) {
    return(
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <h1>Welcome to Coursehub.tech</h1>
      <p className="mt-2 text-sm">
        {userObj?.fullName ? `Good to see you, ${userObj.fullName}!` : 'You are currently signed out.'}
      </p>
    </div>
)
}