import express from "express";
import axios from "axios";
import dotenv from "dotenv";
const app = express();
dotenv.config();

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
        console.log(JSON.stringify(response.data.kanji.strokes, null, 4));
        res.send(response.data);
    } catch {
        console.log('error')
    }
});

//Perform basic search using query strings
app.get('/search/:queryString', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const options = {
        method: 'GET',
        url: `https://kanjialive-api.p.rapidapi.com/api/public/search/${req.params.queryString}`,
        headers: {
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
    };
    const response = await axios.request(options);
    console.log(`key: ${req.params.queryString}, results: ${response.data}`);
    if(response.data.length > 0) {
        const results = response.data.map(item => item['kanji']['character']);
        res.send(results);
    } else {
    }
});

app.get('/getKanjiList/:level', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const options = {
        method: 'GET',
        url: `https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/`,
        params: {grade: req.params.level},
        headers: {
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
    };
    
    const response = await axios.request(options);
    const data = response.data;
    
    // Pick 30 random items from the data
    const randomItems = [];
    for (let i = 0; i < 30; i++) {
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
        return detailsResponse.data.kanji;
    }));
    res.send(kanjiDetails);
});


app.listen(5000, () => console.log('app listening on port 5000'));