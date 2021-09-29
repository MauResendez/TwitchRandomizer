const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

async function getToken()
{
    const response = await fetch(`${process.env.TOKEN_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, { method: 'POST' });
    const data = await response.json();

    return data;
}

router.get('/streamer=:streamer&game=:game', async (req, res) => 
{
    let tokenData = await getToken();

    let accessToken = tokenData.access_token;

    let headers = {
        'Client-ID': process.env.CLIENT_ID,
        'Authorization': 'Bearer ' + accessToken
    }

    let { streamer } = req.params;
    let response = await fetch(`${process.env.STREAMS_URL}?user_login=${streamer}`, { headers: headers });
    let stream_json = await response.json();
    let data = stream_json.data;

    if(data.length !== 0 && data[0].type === 'live' && data[0].game_name) // If the streamer is playing the game that the user is looking for and is live, return true
    {
        return res.json(true);
    }
    else // Else return false
    {
        return res.json(false);
    }
});

module.exports = router;