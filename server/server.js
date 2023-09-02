import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
const router = express.Router();
dotenv.config();

//Redis connection
import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDISDB_PASSWORD,
    socket: {
        host: process.env.REDISDB_HOST,
        port: 12652
    }
});

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

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});



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
  const kanjis = response.data;
  console.log(`Retrieved all ${kanjis.length} kanjis`);

  client.connect();

  for (let kanji of kanjis) {
    client.hSet("allKanjiData", kanji.ka_utf, JSON.stringify(kanji));
  }

  console.log("All kanji data loaded");
  
}

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(5000, () => {
  console.log("app listening on port 5000");
  //Load all the data as soon as the server starts
  loadAllKanjiData();
});

