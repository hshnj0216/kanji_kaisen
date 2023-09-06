import express from "express";
const router = express.Router();
import { client } from "./server.js";

//Endpoint that provides data for the kanji recognition
router.get("/kanjiRecognitionData/:grade", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Pick 30 random items from the data
  const randomItems = [];
  const response = await client.ft.search(
    "idx:kanjis",
    `@grade:[${req.params.grade} ${req.params.grade}]`,
    {
      LIMIT:{
        from: 0,
        size: 300,
      }
    }
  );
  const kanjiGroup = response.documents;

  for (let i = 0; i < 30; i++) {
    let randomIndex = Math.floor(Math.random() * kanjiGroup.length);
    let randomItem = kanjiGroup.slice(randomIndex, randomIndex + 1)[0];
    if (!randomItems.includes(randomItem)) {
      randomItems.push(randomItem.value);
    } else {
      i--;
    }
  }

  res.send(randomItems);
});

//Endpoint that provides data for kanji match
router.get("/kanjiMatchData/:grade", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const response = await client.ft.search(
    "idx:kanjis",
    `@grade:[${req.params.grade} ${req.params.grade}]`,
    {
      LIMIT: {
        from: 0,
        size: 300
      }
    }
  )

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
    kanjiMeaningPairArray.push({ kanji: kanji.ka_utf, meaning: kanji.meaning });
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

export default router;
