"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";

const MainMenu: FC = (props) => {
    return (
        <div className="bg-slate-300 p-3 rounded w-full sm:w-8/12 md:w-6/12 lg:w-4/12 lg:h-1/2">
            <div className="flex flex-col">
                <Link href="/study" className="bg-slate-500 text-white my-5 p-3 text-center rounded">Study</Link>
                <Link href="/practice" className="bg-slate-500 text-white my-5 p-3 text-center rounded">Practice</Link>
                <Link href="/multiplayer" className="bg-slate-500 text-white my-5 p-3 text-center rounded">Multiplayer</Link>
            </div>
        </div>
    )

}

export default MainMenu;