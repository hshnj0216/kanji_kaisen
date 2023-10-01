import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import util from "util";
import csv from "csv-parser";
const readFile = util.promisify(fs.readFile);
const app = express();
const router = express.Router();
dotenv.config();

//Redis connection
import { createClient, SchemaFieldTypes } from "redis";

const client = createClient({
  password: process.env.REDISDB_PASSWORD,
  socket: {
    host: process.env.REDISDB_HOST,
    port: process.env.REDISDB_PORT,
  },
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

client.on("end", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

//Makes a call to the Kanji Alive API
//Gets all the 1300 kanji from the API and their details
async function loadAllKanjiData() {
  // Open a connection to the Redis cloud
  console.log("Connecting to Redis cloud...");
  client.connect();

  //Check if there's data in the Redis cloud database
  let dataExists = await client.exists("kanji:54317b05791eba5146ee4bf6");

  if (!dataExists) {
    //Fetch the data from the API
    console.log("Loading kanji data...");
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
    console.log("Adding data to Redis cloud db");
    // Add data to the database
    for (let kanji of kanjis) {
      // Add kanji to the database...
      await client.json.set(`kanji:${kanji._id}`, ".", kanji);
    }
  } else {
    console.log("Data already exists");
  }

  if (!dataExists) {
    // Create the index
    try {
      console.log("Indexing...");
      await client.ft.create(
        "idx:kanjis",
        {
          "$.ka_utf": {
            type: SchemaFieldTypes.TEXT,
            AS: "kanji",
          },
          "$.meaning_search": {
            type: SchemaFieldTypes.TAG,
            SEPARATOR: ",",
            AS: "meaning_search",
          },
          "$.kunyomi_search": {
            type: SchemaFieldTypes.TAG,
            SEPARATOR: ",",
            AS: "kunyomi_search",
          },
          "$.onyomi_search": {
            type: SchemaFieldTypes.TAG,
            SEPARATOR: ",",
            AS: "onyomi_search",
          },
          "$.grade": {
            type: SchemaFieldTypes.NUMERIC,
            AS: "grade",
          },
        },
        {
          ON: "JSON",
          PREFIX: "kanji",
        }
      );
      console.log("Indexing finished");
    } catch (e) {
      if (e.message === "Index already exists") {
        console.log("Index exists already, skipped creation.");
      } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(e);
        process.exit(1);
      }
    }

    console.log("All kanji data added to Redis cloud");
  }
}

async function updateDatabase() {
  try {
    const kcData = await readFile("components-kc.csv", "utf8");
    const ckData = await readFile("components-ck.csv", "utf8");

    const kcLines = kcData.split("\r\n");
    const ckLines = ckData.split("\n");
    const kcMap = new Map();
    const ckMap = new Map();

    // Populate the kcMap
    for (let line of kcLines) {
      const [kanji, components] = line.split(",");
      kcMap.set(kanji, components);
    }

    // Populate the ckMap
    for (let line of ckLines) {
      const [component, kanjis] = line.split(",");
      ckMap.set(component, kanjis.split(","));
    }

    function createTree([kanji, components]) {
      let tree = { data: kanji, children: [] };
      const componentList = [...components];
      for (let i = 0; i < componentList.length; i++) {
        let component = componentList[i];
        if (kcMap.has(component)) {
          let subComponents = kcMap.get(component).split("");
          if (
            subComponents.every((subComponent) =>
              componentList.includes(subComponent)
            )
          ) {
            tree.children.push(createTree([component, kcMap.get(component)]));
            i += subComponents.length - 1; // Skip over the sub-components in the next iterations
          }
        } else if (!tree.children.some((child) => child.data === component)) {
          tree.children.push({ data: component, children: [] });
        }
      }
      return tree;
    }

    let trees = [];
    for (let entry of kcMap) {
      trees.push(createTree(entry));
    }

    console.log(trees.length);
    return trees;
  } catch (error) {
    console.log(error);
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/test", async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  let result = await updateDatabase();
  res.send(result);
});

app.listen(5000, () => {
  console.log("app listening on port 5000");
  //Load all the data as soon as the server starts
  //loadAllKanjiData();
});

export { client };
