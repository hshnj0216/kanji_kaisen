import Link from "next/link";
import Carousel from "./Carousel";
 

const QuizResults = ({score, fullQuizItems}) => {
    return (
        <div className="w-1/2 border rounded p-3 border-slate-50 flex-col justify-center items-center mt-8">
            <div className="mb-5">
                <p className="text-7xl text-slate-50 text-center">You scored:</p>
                <p className="text-9xl text-slate-50 text-center">{score}/{fullQuizItems.length}</p>
            </div>
            <Carousel />
            <div className="flex justify-center">
                <Link href="/practice">
                    <button className="border rounded bg-slate-50 p-3 m-3" type="button">Return to practice menu</button>
                </Link>
                <button
                    className="border rounded bg-slate-50 p-3 m-3"
                    type="button"
                >
                    Take Another Test
                </button>
                
            </div>
        </div>
    )
}

export default QuizResults;