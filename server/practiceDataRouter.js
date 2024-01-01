import express from "express";
const router = express.Router();
import { client } from "./server.js";
import FormData from "form-data";
import axios from "axios";

function getUniqueSubset(array, size) {
  const shuffledArray = array.slice();

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
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

//Endpoint that provides data for the kanji recognition
router.get("/kanjiRecognitionData/:grade", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Pick 30 random items from the data
  // Items should be unique
  let { grade } = req.params;
  const response = await client.ft.search(
    "idx:kanjis",
    `@grade:[${req.params.grade} ${grade}]`,
    {
      LIMIT: {
        from: 0,
        size: 300,
      },
    }
  );
  const kanjiGroup = response.documents;

  const randomItems = getUniqueSubset(kanjiGroup, 30);

  res.send(randomItems);
});

//Endpoint that provides data for kanji match
router.get("/kanjiMatchData/:grade", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let { grade } = req.params;
  const response = await client.ft.search(
    "idx:kanjis",
    `@grade:[${req.params.grade} ${grade}]`,
    {
      LIMIT: {
        from: 0,
        size: 300,
      },
    }
  );

  const kanjiGroup = response.documents;

  const randomKanjis = new Set();

  //Add random kanjis to the set
  while (randomKanjis.size < 15) {
    //console.log(`Size: ${randomKanjis.size}`);
    let randomIndex = Math.floor(Math.random() * kanjiGroup.length);
    //console.log(`Random Index: ${randomIndex}`);
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

  console.log(kanjiMeaningPairArray);

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

//Endpoint for image classification
router.post("/imageClassification", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
	//Todos:
	//Convert base64 image string to IFormFile
  const base64Image = req.body.image;
  const imageBuffer = Buffer.from(base64Image, 'base64');

  let formData = new FormData();

  // Append the imageBuffer as a Blob
  formData.append('image', imageBuffer, {
    filename: 'canvas.png',
    contentType: 'image/png',
    knownLength: imageBuffer.length
  });

	//Make request to image classification API
  try {
    let startTime = performance.now();
    const response = await axios.post('http://localhost:5227/api/Classification/classify_image', formData, {
        headers: formData.getHeaders()
    });
    let duration = performance.now() - startTime;
    console.log(`Operation took ${duration}ms to finish`);

    res.json(response.data);
  } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while forwarding the request to the .NET API.');
  }
	//Compare unicode values
	//Return a boolean
});

export default router;
