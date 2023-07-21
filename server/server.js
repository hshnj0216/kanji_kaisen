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
    console.log('This was called');
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
        console.log(response.data.examples[0].meaning);
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


app.listen(5000, () => console.log('app listening on port 5000'));