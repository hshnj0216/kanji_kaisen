import React, { FC } from "react";
import dynamic from 'next/dynamic';

//import useKanji from "@/app/_custom_hooks/useKanji";


const StudyDynamic = dynamic(
	() => import("@/app/_components/(study)/StudyDynamic"),
	{ ssr: false }
  );


const Study: FC = () => {
	return (
		<div className="w-4/5 mx-auto h-full">
			<StudyDynamic />	
		</div>
	);
};
export default Study;
