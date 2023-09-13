"use client";

import {FC} from "react";
import Friend from "./Friend";

const FriendsList: FC = () => {
    return (
        <div className="border rounded border-slate-50 p-3 col-span-3">
            <div>
                <Friend name="John" isOnline={true} rank="master" points={1000} avatarUrl=""/>
                <Friend name="Joe" isOnline={false} rank="noob" points={100} avatarUrl=""/>
                <Friend name="Jane" isOnline={true} rank="master" points={1000} avatarUrl=""/>
            </div>
        </div>
    )
}

export default FriendsList;