import express from "express";
import axios, { all } from "axios";
import dotenv from "dotenv";
const app = express();
dotenv.config();

let allKanjiData = [];

async function loadAllKanjiData() {
    const options = {
        method: 'GET',
        url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/`,
        headers: {
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
    };

    const response = await axios.request(options);

    allKanjiData = response.data;

    console.log(allKanjiData.length);

}

loadAllKanjiData();

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

//Retrieve kanji details
app.get('/getKanjiDetails/:queryString', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const options = {
        method: 'GET',
        url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${req.params.queryString}`,
        headers: {
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
    };
    try{
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch {
        console.log('error')
    }
});

//Perform basic search using query strings
app.get('/search/:queryString', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try{
        //Initialize an empty array that will contain the matching objects
        let matches = [];
        
        let query = req.params.queryString;
        
        //Traverse the array and find the substrings
        for(let kanji of allKanjiData) {
            let onyomi_search = kanji.onyomi_search;
            let kunyomi_search = kanji.kunyomi_search;
            let meaning_search = kanji.meaning_search;

            if (onyomi_search.includes(query) || kunyomi_search.includes(query) || meaning_search.includes(query)) {
                // If yes, push the kanji object to the matches array
                matches.push({'kanji':kanji.kanji.character, 'meaning': kanji.kanji.meaning.english});
            }

        }

        res.send(matches);
    } catch(error) {
        console.log(error.message)
    }
    
});

app.get('/getKanjiList/:grade', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const options = {
        method: 'GET',
        url: `https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/`,
        params: {grade: req.params.grade},
        headers: {
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
    };
    const response = await axios.request(options);
    const data = response.data;
    
    // Pick 30 random items from the data
    const randomItems = [];
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        randomItems.push(data[randomIndex]);
        data.splice(randomIndex, 1);
    }
    
    const kanjiDetails = await Promise.all(randomItems.map(async (item) => {
        const options = {
            method: 'GET',
            url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${item.kanji.character}`,
            headers: {
                'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            }
        };
        const detailsResponse = await axios.request(options);
        return detailsResponse.data;
    }));
    res.send(kanjiDetails);
});

app.get('/testEndPoint/', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const options = {
        method: 'GET',
        url: `https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/`,
        params: {kanji: '火'},
        headers: {
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
    };
    try{
        const response = await axios.request(options);
        res.send(response.data);
    } catch {
        console.log('error')
    }
})


app.listen(5000, () => console.log('app listening on port 5000'));