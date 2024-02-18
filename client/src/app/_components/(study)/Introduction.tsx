"use client";

const Introduction = () => {
    return (
        <div className="bg-slate-300 p-5 w-full rounded">
            <div className="mb-5">
                <h2 className="text-3xl">Welcome to our Kanji Study feature!</h2>
                <p>Here, you can explore and learn Kanjis in detail.</p>
            </div>
            
            <div className="mb-5">
                <h3 className="text-2xl">How to Search?</h3>
                <h4>Text search</h4>
                <ul>
                    <li>Type the Kanji, its English meaning, or its reading in the search bar at the top of the page.</li>
                    <li>Select from the list of suggestions that appear as you type.</li>
                    <li>If the Kanji does not show up, it may not be part of the database.</li>
                </ul>
                <h4>Radical/component search</h4>
                <ul>
                    <li>Click on the radicals or components.</li>
                    <li>Select from the list of suggestions that appear.</li>
                    <li>If the Kanji does not show up, it may not be part of the database.</li>
                </ul>
                <h4>Drawing search</h4>
                <ul>
                    <li>Draw the Kanji on the canvas.</li>
                    <li>Click submit and select from the suggestions that appear.</li>
                    <li>If the Kanji does not show up, it may not be part of the database or the web API did not recognize the input properly
                        so make sure your drawing is well formed.
                    </li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-2xl">What Can Be Searched?</h3>
                <p>The Kanji data is provided by KanjiAlive, so there are only 1,235 Kanjis from Grade 1 to Grade 6. 
                    You can also search using a radical or by drawing the Kanji.
                </p>
            </div>
        </div>
    )
}

export default Introduction;