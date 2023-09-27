import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import util from "util";
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
  const readFile = util.promisify(fs.readFile);
  const kcData = await readFile("components-kc.csv", "utf8");
  const ckData = await readFile("components-ck.csv", "utf8");

  const kcLines = kcData.split("\r\n");
  const ckLines = ckData.split("\r\n");
  const kcMap = new Map();
  const ckMap = new Map();
  
  //Populate the kcMap
  for (let line of kcLines) {
    const [kanji, components] = line.split(",");

    kcMap.set(kanji, components);
  }

  //Populate the ckMap
  for (let line of ckLines) {
    const [component, kanjis] = line.split(",");

    ckMap.set(component, kanjis);
  }

  class Node{
    constructor(data, parentId, parent = null) {
      this.data = data;
      this.parentId = parentId; //this property is a string
      this.parent = parent; //this property is a node or object
    }
  }

  function buildTree(kanji, components) {
    const rootNode = new Node(kanji);
    const nodeArr = [rootNode];
    //Loop through the kcMap
    for(let [kanji, components] of kcMap.entries()) {
      //Loop through the components 
      for(let char of components) {
        //Check if the char is a composite component or a pure component
        //If it's in kcMap, then it's a composite component
        if(kcMap.has(char)) {
          var componentDecomposition = kcMap.get(char);
          //Loop through the component decomposition 
          for(let component of componentDecomposition) {
            //Create a node
            const node = new Node(component, char);
            nodeArr.push(node);
          }
        }
        //If it's not in kcMap, then it's a pure component

      }
    }

  }
  
  /*
  const allRedisKanjiKeys = await client.keys('*');
  const allRedisKanjis = await Promise.all(
    allRedisKanjiKeys.map(async (key) => {
      const kanjiObject = await client.json.get(key);
      
      // Update the JSON object with the 'component_decomposition' field
      kanjiObject.component_decomposition = csvMap.get(kanjiObject.ka_utf);

      // Set the updated JSON object back to Redis
      await client.json.set(key, '.', kanjiObject);

      return kanjiObject;
    })
  );
  
  return allRedisKanjis;
  */


}
//updateDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/test", async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  let result = await updateDatabase();
  let arr = Array.from(result.entries(), ([key, value]) => value);
  res.send(arr);
});

app.listen(5000, () => {
  console.log("app listening on port 5000");
  //Load all the data as soon as the server starts
  //loadAllKanjiData();
});

export { client };
