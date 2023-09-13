import express from "express";
const router = express.Router();
import { client } from "./server.js";

//Retrieve kanji details
router.get("/kanjiDetails/:kanji_id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let { kanji_id } = req.params;
    const kanji = await client.json.get(kanji_id);
    res.json(kanji);
  } catch(error) {
    console.log(error);
  }
});

//Performs full string search on the Redis cloud db
//Sends kanji object array containing the character and meaning
router.get("/kanjis/:query_string", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    //Initialize an empty array that will contain the matching objects
    let matches = [];

    let { query_string } = req.params;

    // Remove spaces and punctuation marks from query string
    query = query.replace(/[\s\.,;:!?]/g, "");

    const result = await client.ft.search(
      "idx:kanjis",
      `(@meaning_search:{${query}}) | (@onyomi_search:{${query}}) | (@kunyomi_search:{${query}})`
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
  } catch(error) {
    console.log(error.message);
  }
});

export default router;
