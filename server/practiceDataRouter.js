import express from "express";
const router = express.Router();
import { allKanjiData, kanjiByGrade } from "./server.js";

//Endpoint that provides data for the kanji recognition
router.get("/kanjiRecognitionData/:grade", async (req, res) => {
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
router.get("/kanjiMatchData/:grade", async (req, res) => {
  let startTime = performance.now();
  res.setHeader("Access-Control-Allow-Origin", "*");

  const randomKanjis = [];
  const kanjiGroup = kanjiByGrade[req.params.grade - 1];

  for (let i = 0; i < 15; i++) {
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
  for (let kanji of randomKanjis) {
    kanjiMeaningPairArray.push({ kanji: kanji.ka_utf, meaning: kanji.meaning });
    kanjiMeaningPairArray.push(kanji.meaning);
  }

  //Scramble the array
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
