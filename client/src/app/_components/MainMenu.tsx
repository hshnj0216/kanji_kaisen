"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import ModeCard from "./(practice)/ModeCard";

const MainMenu: FC = (  ) => {
    return (
        <div className="flex">
             <Link href="/study">
                    <ModeCard title="Study" description="Search and study kanjis" isDisabled={false}/>
             </Link>
             <Link href="/practice">
                    <ModeCard title="Practice" description="Test your kanji knowledge" isDisabled={false}/>
             </Link> 
        </div>
    )

}

export default MainMenu;