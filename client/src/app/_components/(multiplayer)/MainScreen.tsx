"use client";

import {FC} from "react";
import SpinnerLoadingIndicator from "../SpinnerLoadingIndicator";
import BouncingBallLoadingIndicator from "../BouncingBallsLoadingIndicator";

const MainScreen: FC = () => {
    return (
        <div className="border rounded border-slate-50 p-3 col-span-9">
            <div className="p-3 border rounded border-slate-50">
                <p>Kanji game 1</p>
                <button>Find match</button>
            </div>
            <div className="p-3 border rounded border-slate-50n">
                <p>Kanji game 2</p>
                <button>Find match</button>
            </div>
        </div>
    )
}

export default MainScreen;