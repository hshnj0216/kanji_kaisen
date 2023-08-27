import express, { query } from "express";
const router = express.Router();
import { allKanjiData } from "./server.js";

//Retrieve kanji details
router.get("/kanjiDetails/:kanji_char", async (req, res) => {
  console.log(`Request made to kanji, looked for ${req.params.kanji_char}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const kanji = allKanjiData.get(req.params.kanji_char);
    console.log(`Kanji found. Returned kanji: ${kanji.ka_utf}`);
    res.json(kanji);
  } catch {
    console.log("error");
  }
});

//Perform basic search by matching substrings
//Returns and array of 10 kanji objects
router.get("/kanjis/:queryString", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    //Initialize an empty array that will contain the matching objects
    let matches = [];

    let query = req.params.queryString;

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

export default router;
