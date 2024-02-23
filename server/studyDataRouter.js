import express from "express";
const router = express.Router();
import { client } from "./server.js";
import axios from "axios";
import FormData from "form-data";

//Retrieve kanji details
router.get("/kanjis/:kanji_id", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	try {
		let { kanji_id } = req.params;
		const kanji = await client.json.get(kanji_id);
		res.json(kanji);
	} catch (error) {
		console.log(error);
	}
});

//Handles the text input search bar requests
//Performs full string search on the Redis cloud db
//Sends kanji object array containing the character and meaning
router.get("/kanjis/search/field_search/:query_string", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	try {
		//Initialize an empty array that will contain the matching objects
		let matches = [];

		let { query_string } = req.params;

		// Remove spaces and punctuation marks from query string
		query_string = query_string.replace(/[\s\.,;:!?]/g, "");
		console.log(query_string);
		const result = await client.ft.search(
			"idx:kanjis",
			`(@kanji:{${query_string}}) | (@meaning_search:{${query_string}}) | (@onyomi_search:{${query_string}}) | (@kunyomi_search:{${query_string}})`
		);

		const kanjis = result.documents;
		for (let kanji of kanjis) {
			matches.push({
				id: kanji.id,
				kanji: kanji.value.ka_utf,
				meaning: kanji.value.meaning,
			});
		}
		res.send(matches);
	} catch (error) {
		console.log(error.message);
	}
});

router.get("/kanjis/search/radical_search/:radicals", async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	try {
		const { radicals } = req.params;

		let radicalsString = radicals.replace(/\s/g, "");

		let tags = radicalsString
			.split("")
			.filter((char) => char.trim() !== "");

		let query = `@rad_search: {${tags.join(" | ")}}`;

		const result = await client.ft.search("idx:kanjis", query, {
			LIMIT: {
				from: 0,
				size: 40,
			},
		});

		function hasAllChars(string, chars) {
			for (let i = 0; i < chars.length; i++) {
				if (!string.includes(chars[i])) {
					return false;
				}
			}
			return true;
		}

		const matches = [];
		for (let item of result.documents) {
			let rad_string = item.value.rad_search.join("");
			if (hasAllChars(rad_string, radicalsString)) {
				matches.push({
					id: item.id,
					kanji: item.value.ka_utf,
					rad_search: item.value.rad_search,
				});
			}
		}
		res.json(matches);
	} catch (error) {
		console.log(error.message);
	}
});

//Handle the drawing inferrence
router.post("/kanjis/search/infer", async (req, res) => {
	let imageBase64 = req.body.image;
	let imageBuffer = Buffer.from(imageBase64, "base64");

	let formData = new FormData();

	formData.append("imageBinary", imageBuffer, {
		filename: "canvas.png",
		contentType: "image/png",
		knownLength: imageBuffer.length,
	});

	try {
		const endpointURL =
			"http://localhost:8080/api/Classification/InferTopKanjiClasses";
		const response = await axios.post(endpointURL, formData, {
			headers: formData.getHeaders(),
		});
		//Data received is an array of size 10 of unicode in the `U+XXXX` format
		const results = response.data;
		const characters = [];
		for (let result of results) {
			let hexCode = result.replace("U+", "");
			let decimalCode = parseInt(hexCode, 16);
			let character = String.fromCharCode(decimalCode);
			let item = await client.ft.search(
				"idx:kanjis",
				`@kanji: ${character}`
			);
			let kanji = item.documents[0];
			let simplifiedObj = {
				id: kanji.id,
				character: kanji.value.ka_utf,
			};
			characters.push(simplifiedObj);
		}
		res.send(characters);
	} catch (error) {
		console.log(error.message);
	}
});

export default router;
