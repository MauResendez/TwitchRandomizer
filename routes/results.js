const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

async function getToken()
{
    const response = await fetch(`${process.env.TOKEN_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, { method: 'POST' });

    const data = await response.json();

    return data;
}

router.get('/:game/:viewers', async (req, res) =>
{
    try
    {
        let tokenData = await getToken();

        let accessToken = tokenData.access_token;

        let headers = {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken
        }

        let { game, viewers } = req.params;

        let game_response = await fetch(`${process.env.GAMES_URL}?name=${game}`, { headers: headers });

        let game_data = await game_response.json();

        let gameID = game_data.data[0].id;

        let streams = [];

        let count = 5;

        let cursor = '';

        while(count != 0)
        {
            let response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (cursor ? `&after=${cursor}`: ``), { headers: headers });
            let data = await response.json();

            if(!data.pagination || data.data[0].viewer_count < 10)
            {
                break;
            }

            if(streams.length == 0)
            {
                streams = data;
            }
            else
            {
                streams.data = streams.data.concat(data.data);
            }

            cursor = data.pagination.cursor;
            --count;
        }

        let filtered_streams = [];

        for(var i = 0; i < streams.data.length; ++i) 
        {
            if(streams.data[i].viewer_count <= viewers) 
            {
                filtered_streams.push(streams.data[i]);
            }
        }

        res.json(filtered_streams);
    }
    catch (err)
    {
        console.error(err);
        console.log(err.message);
        res.status(500).json
        ({
            message: 'Server Error'
        });
    }
});

module.exports = router;