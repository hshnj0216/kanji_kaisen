import express from "express";
import axios, { all } from "axios";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const allKanjiData = new Map();
const kanjiByGrade = Array.from({ length: 6 }, () => []);

//Makes a call to the Kanji Alive API
//Gets all the 1300 kanji from the API and their details
async function loadAllKanjiData() {
  let startTime = performance.now();
  const options = {
    method: "GET",
    url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/`,
    headers: {
      "X-RapidAPI-Host": "kanjialive-api.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    },
  };

  const response = await axios.request(options);

  //Add each item to the map
  //Use the kanji character as the key
  for (let kanji of response.data) {
    allKanjiData.set(kanji.ka_utf, kanji);
  }

  populateKanjiByGrade();
  // Get the end time of the code
  let endTime = performance.now();

  // Calculate and log the execution time of the code
  let executionTime = endTime - startTime;
  console.log(`The code took ${executionTime} milliseconds to execute`);
}

function populateKanjiByGrade() {
  console.log('populating kanjiByGrade');
  //Loop through the allKanjiData map
  //Push the item to the respective array
  for (let [key, kanji] of allKanjiData.entries()) {
    if (kanji.grade !== null) {
      kanjiByGrade[kanji.grade - 1].push(kanji);
    }
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

//Retrieve kanji details
app.get("/getKanjiDetails/:kanji_char", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const kanji = allKanjiData.get(req.params.kanji_char);
    res.json(kanji);
  } catch {
    console.log("error");
  }
});

//Perform basic search by matching substrings
//Returns and array of 10 kanji objects
app.get("/search/:queryString", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    //Initialize an empty array that will contain the matching objects
    let matches = [];

    let query = req.params.queryString;
    console.log(query);

    //Traverse the map and find the substrings
    for (let [key, kanji] of allKanjiData.entries()) {
      let onyomi_search = kanji.onyomi_search;
      let kunyomi_search = kanji.kunyomi_search;
      let meaning_search = kanji.meaning_search;

      if (
        (onyomi_search.includes(query) ||
          kunyomi_search.includes(query) ||
          meaning_search.includes(query)) &&
        matches.length != 10
      ) {
        // If yes, push the kanji object to the matches array
        matches.push({
          kanji: kanji.kanji.character,
          meaning: kanji.kanji.meaning.english,
        });
      }
    }
    res.send(matches);
  } catch (error) {
    console.log(error.message);
  }
});

//Endpoint that provides data for the kanji recognition
app.get("/getKanjiList/:grade", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Pick 30 random items from the data
	const randomItems = [];
	const kanjiGroup = kanjiByGrade[req.params.grade - 1];

	for (let i = 0; i < 30; i++) {
		let randomIndex = Math.floor(Math.random() * kanjiGroup.length);
		let randomItem = kanjiGroup.slice(randomIndex, randomIndex + 1)[0];
		if (!randomItems.includes(randomItem)) {
			randomItems.push(randomItem);
		} else {
			i--;
		}
	}

  res.send(randomItems);
});

//Endpoint that provides data for kanji match
app.get("/getKanjiMatchData/:grade", async (req, res) => {

	let startTime = performance.now();
	res.setHeader("Access-Control-Allow-Origin", "*");

	const randomKanjis = [];
	const kanjiGroup = kanjiByGrade[req.params.grade - 1];

	for(let i = 0; i < 15; i++) {
		let randomIndex = Math.floor(Math.random() * kanjiGroup.length);
		let randomKanji = kanjiGroup.slice(randomIndex, randomIndex + 1)[0];

		//Prevent duplicates 
		if (!randomKanjis.includes(randomKanji)) {
			randomKanjis.push(randomKanji);
		} else {
			i--;
		}
	}

	//Push the kanjis and their corresponding meaning to the array as pairs
	const kanjiMeaningPairArray = [];
	for(let kanji of randomKanjis) {
		kanjiMeaningPairArray.push({kanji: kanji.ka_utf, meaning: kanji.meaning});
		kanjiMeaningPairArray.push(kanji.meaning);
	}

	//Scramble the array
	for(let i = kanjiMeaningPairArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[kanjiMeaningPairArray[i], kanjiMeaningPairArray[j]] = [kanjiMeaningPairArray[j], kanjiMeaningPairArray[i]];
	}
	console.log(kanjiMeaningPairArray);
	res.send(kanjiMeaningPairArray);
	let endTime = performance.now();
	let duration = endTime - startTime;
	console.log(`It took ${duration} to finish`);
});

app.listen(5000, () => {
	console.log("app listening on port 5000");
	//Load all the data as soon as the server starts
	loadAllKanjiData();
});
