"use client";

import {FC, useState} from "react";
import SpinnerLoadingIndicator from "../SpinnerLoadingIndicator";
import BouncingBallLoadingIndicator from "../BouncingBallsLoadingIndicator";
import TestSizeSetter from "../(practice)/TestSizeSetter";
import { motion } from 'framer-motion';
import Link from "next/link";
import ModeCard from "../(practice)/ModeCard";
import FlipCard
 from "../FlipCard";
const MainScreen: FC = () => {
    const [isToggled, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!isToggled);
    };

    return (
        <div className="border rounded border-slate-50 p-3 col-span-9">
            <FlipCard />
        </div>
    )
}

export default MainScreen;
