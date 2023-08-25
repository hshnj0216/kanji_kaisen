import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
const router = express.Router();
dotenv.config();
import practiceDataRouter from "./practiceDataRouter.js";
import studyDataRouter from "./studyDataRouter.js";

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/studyData", studyDataRouter);
app.use("/practiceData", practiceDataRouter);

const allKanjiData = new Map();
const kanjiByGrade = Array.from({ length: 6 }, () => []);

function populateKanjiByGrade() {
  //Loop through the allKanjiData map
  //Push the item to the respective array
  for (let [key, kanji] of allKanjiData.entries()) {
    if (kanji.grade !== null) {
      kanjiByGrade[kanji.grade - 1].push(kanji);
    }
  }
}

//Makes a call to the Kanji Alive API
//Gets all the 1300 kanji from the API and their details
async function loadAllKanjiData() {
  console.log("loading kanji data...");
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

  console.log('All kanji data loaded');
}

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(5000, () => {
  console.log("app listening on port 5000");
  //Load all the data as soon as the server starts
  loadAllKanjiData();
});

export { allKanjiData, kanjiByGrade };
