const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const uniqueRandomArray = require('unique-random-array');

async function getToken()
{
    const response = await fetch(`${process.env.TOKEN_URL}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, { method: 'POST' });

    const data = await response.json();

    return data;
}

function filter(streams, viewers)
{
    let filtered_streams = [];

    for(var i = 0; i < streams.data.length; ++i) 
    {
        if(streams.data[i].viewer_count <= viewers) 
        {
            filtered_streams.push(streams.data[i]);
        }
    }

    return filtered_streams;
}

router.get('/game=:game&viewers=:viewers', async (req, res) =>
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
        
        if(viewers == 'null')
        {
            viewers = 9999999; // Max value to get all streams
        }

        let game_response = await fetch(`${process.env.GAMES_URL}?name=${game}`, { headers: headers });

        let game_data = await game_response.json();

        let gameID = game_data.data[0].id;

        let streams = [];

        let cursor = '';

        let count = 10;

        // Loops through every hundred live streams and puts it into the streams array whenever the remainder of count / 2 = 0
        // so we can have a wider range of high to low viewers while saving time.

        while(count != 0) 
        {
            if(count % 2 == 0)
            {
                let response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (cursor ? `&after=${cursor}`: ``), { headers: headers });
                let data = await response.json();

                if(!data.pagination || data.data[0].viewer_count < 10)
                {
                    break;
                }
                else if(streams.length == 0)
                {
                    streams = data;
                }
                else
                {
                    streams.data = streams.data.concat(data.data);
                }

                cursor = data.pagination.cursor;
            }

            --count;
        }

        let filtered_streams = [];

        filtered_streams = filter(streams, viewers); // Filter streams to ones that have equal or lower amount of given viewers from the parameters.

        let randomStream = uniqueRandomArray(filtered_streams); // Use uniqueRandomArray to pick a random stream for us.

        if(filtered_streams.length != 0) // If we found one, send the data
        {
            res.json(randomStream());
        }
        else // Else, we have to continue searching for more streams until we have streams that have equal or lower the given viewers.
        {
            let count = 10;

            while(count != 0)
            {
                if(count % 2 == 0)
                {
                    let response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (cursor ? `&after=${cursor}`: ``), { headers: headers });
                    let data = await response.json();

                    if(!data.pagination || data.data[0].viewer_count < 10)
                    {
                        break;
                    }
                    else if(streams.length == 0)
                    {
                        streams = data;
                    }
                    else
                    {
                        streams.data = streams.data.concat(data.data);
                    }

                    cursor = data.pagination.cursor;
                }

                --count;
            }

            filtered_streams = filter(streams, viewers);

            let randomStream = uniqueRandomArray(filtered_streams);

            res.json(randomStream());
        }
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