"use client";

import {FC} from "react";
import axios from "axios";
import MainScreen from "@/app/_components/(multiplayer)/MainScreen";
import FriendsList from "@/app/_components/(multiplayer)/FriendsList";

const Multiplayer: FC = () => {
    return (
        <div className="h-full grid grid-cols-12 grid-rows-12 p-5 gap-3">
            <MainScreen />               
            <FriendsList/>
        </div>
    )
}

export default Multiplayer;