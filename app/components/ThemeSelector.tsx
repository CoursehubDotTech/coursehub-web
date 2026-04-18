"use client"
import "../themes.css";
import { useEffect, useState } from "react";

export default function ThemeSelector() {
    const [t, setT]= useState("default");
    useEffect(() => {
        document.documentElement.className = t;
        localStorage.setItem("theme", t);
    }, [t]);
    return (
        <div className="flex items-center flex-col gap-2 text-sm">
            <button onClick={()=> setT("ember")} className="p-0.5 rounded-full ember" title="Ember Theme">Ember</button>
            <button onClick={()=> setT("matrixGreen")} className="p-0.5 rounded-full matrixGreen" title="Matrix Green">Matrix Green</button>
        </div>
    );
}