import express from "express";
const router = express.Router();
import { client } from "./server.js";
import FormData from "form-data";
import axios from "axios";

//Gets up to 300 kanjis for a given grade
async function getKanjisByGrade(grade) {
	const response = await client.ft.search(
		"idx:kanjis",
		`@grade:[${grade} ${grade}]`,
		{
			LIMIT: {
				from: 0,
				size: 300,
			},
		}
	);
	return response.documents;
}

//Returns an array of unique elements of specified size from the given array
function getUniqueSubset(array, size) {
	const shuffledArray = array.slice();

	// Fisher-Yates shuffle algorithm
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [
			shuffledArray[j],
			shuffledArray[i],
		];
	}

	// Build the subset with unique values
	const subset = [];
	const valuesSet = new Set();

	for (let i = 0; i < shuffledArray.length && subset.length < size; i++) {
		const value = shuffledArray[i].value;
		if (!valuesSet.has(value)) {
			valuesSet.add(value);
			subset.push(value);
		}
	}

	return subset;
}

//Provides data for the kanji recognition
router.get("/kanjiRecognitionData/:grade/:testSize", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	let { grade, testSize } = req.params;

	const kanjiGroup = await getKanjisByGrade(grade);

	const randomItems = getUniqueSubset(kanjiGroup, testSize);

	const quizItems = [];

	randomItems.forEach((item) => {
		quizItems.push({ character: item.ka_utf, meaning: item.meaning });
	});

	res.send(quizItems);
});

//Provides data for kanji match
router.get("/kanjiMatchData/:grade/:testSize", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	let { grade, testSize } = req.params;

	const kanjiGroup = await getKanjisByGrade(grade);

	const randomKanjis = new Set();

	//Add random kanjis to the set
	while (randomKanjis.size < testSize / 2) {
		let randomIndex = Math.floor(Math.random() * kanjiGroup.length);
		let randomKanji = kanjiGroup[randomIndex];
		randomKanjis.add(randomKanji.value);
	}

	//Convert the Set object to an array
	const randomKanjisArray = Array.from(randomKanjis);

	const kanjiMeaningPairArray = [];

	//Create an array consisting of kanjis and their corresponding meaning
	for (let kanji of randomKanjisArray) {
		kanjiMeaningPairArray.push({
			kanji: kanji.ka_utf,
			meaning: kanji.meaning,
			onyomi: kanji.onyomi_ja,
			kunyomi: kanji.kunyomi_ja,
		});
		kanjiMeaningPairArray.push(kanji.meaning);
	}

	//Scramble the kanjiMeaningPairs array
	for (let i = kanjiMeaningPairArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[kanjiMeaningPairArray[i], kanjiMeaningPairArray[j]] = [
			kanjiMeaningPairArray[j],
			kanjiMeaningPairArray[i],
		];
	}

	res.send(kanjiMeaningPairArray);
});

//Provides data for draw the kanji
router.get("/drawTheKanjiData/:grade/:testSize", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const { grade, testSize } = req.params;
	const kanjiGroup = await getKanjisByGrade(grade);
	const randomItems = getUniqueSubset(kanjiGroup, testSize);
	res.send(randomItems);
});

//Checks user submission for draw the kanji
//Receives a base64 string of the kanji drawing and the correct answer string
//Converts base64 to binary
//Makes request to the kanji classification web API
//Compares correct answer with the response data
//Sends a boolean as response
router.post("/imageClassification", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	//Convert base64 image string to IFormFile
	const base64Image = req.body.image;
	const imageBuffer = Buffer.from(base64Image, "base64");

	let formData = new FormData();

	// Append the imageBuffer as a Blob
	formData.append("imageBinary", imageBuffer, {
		filename: "canvas.png",
		contentType: "image/png",
		knownLength: imageBuffer.length,
	});

	//Make request to image classification API
	try {
		let endpointURL;

		if (process.env.NODE_ENV === "production") {
			// In production, use the Docker service name
			endpointURL = process.env.KANJI_CLASSIFICATION_PRODUCTION;
		} else {
			// In development, use localhost
			endpointURL = process.env.KANJI_CLASSIFICATION_DEVELOPMENT;
		}
		const response = await axios.post(endpointURL, formData, {
			headers: formData.getHeaders(),
		});

		let classificationResult = response.data;
		let correctAnswer =
			"U+" + req.body.kanji_utf.charCodeAt(0).toString(16).toUpperCase();

		res.send(classificationResult == correctAnswer);
	} catch (error) {
		console.error("Error:", error);
	}
});

export default router;
