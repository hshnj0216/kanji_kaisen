import express from "express";
const router = express.Router();
import { client } from "./server.js";

//Retrieve kanji details
router.get("/kanjis/:kanji_id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.params.kanji_id);
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
router.get("/kanjis/search/:query_string", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    //Initialize an empty array that will contain the matching objects
    let matches = [];

    let { query_string } = req.params;

    // Remove spaces and punctuation marks from query string
    query_string = query_string.replace(/[\s\.,;:!?]/g, "");

    const result = await client.ft.search(
      "idx:kanjis",
      `(@meaning_search:{${query_string}}) | (@onyomi_search:{${query_string}}) | (@kunyomi_search:{${query_string}})`
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

router.get("/kanjis/radicals/:radicals", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`request made to endpoitn`);
  try {
    const { radicals } = req.params;
    console.log(typeof(radicals));

    console.log(`radicals: ${radicals}`);

    let tags = radicals.split(",");

    let query = `@rad_search: {${tags.join(" | ")}}`;

    console.log(query);

    const result = await client.ft.search(
      "idx:kanjis",
      query
    );

    function hasAllChars(string, chars) {
      for(let i = 0; i < chars.length; i++) {
        if(!string.includes(chars[i])) {
          return false;
        }
      }
      return true;
    }

    const matches = [];
    for(let item of result.documents) {
      let rad_string = item.value.rad_search.join("");
      console.log(rad_string);
      if(hasAllChars(rad_string, radicals)) {
        matches.push({
          id: item.id,
          kanji: item.value.ka_utf,
        });
      }
      
    }

    res.json(matches);
  } catch(error) {
    console.log(error.message);
  }
})



export default router;
