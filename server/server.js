import express from "express";
import axios from "axios";
const app = express();

const baseUrl = 'https://kanjiapi.dev/v1/'
app.get('/getKanji', async (req, res) => {
    console.log('Client connected to /getKanji endpoint');
    res.setHeader('Access-Control-Allow-Origin', '*');  
    const response = await axios.get(baseUrl+'kanji/愛');
    res.send(response.data);
});

app.listen(5000, () => console.log('app listening on port 5000'));