"use client";

import {FC} from "react";
import Image from "next/image";
import {FaUser} from "react-icons/fa6";

interface IFriendProps{
    name: string;
    avatarUrl: string;
    isOnline: boolean;
    rank: string;
    points: number;
}

const Friend: FC<IFriendProps> = ({name, avatarUrl, isOnline, rank, points}) => {
    return (
        <div className="flex items-center w-full border rounded border-slate-50 p-2 justify-between mb-3">
            <FaUser></FaUser>
            <p>{name}</p>
            <p>{rank}</p>
            <p>{points}</p>
            {isOnline ? (
                <div className="border rounded-full bg-green-400 w-3 h-3"></div>
            ) : (
                <div className="border rounded-full bg-slate-400 w-3 h-3"></div>
            ) }
        </div>
    )
}

export default Friend;