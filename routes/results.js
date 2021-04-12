const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
var shuffle = require('shuffle-array');

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
        streams.data[i].thumbnail_url = streams.data[i].thumbnail_url.replace('{width}x{height}', '325x180');

        if(streams.data[i].viewer_count <= viewers) 
        {
            filtered_streams.push(streams.data[i]);
        }
    }

    return filtered_streams;
}

router.get('/game=:game&viewers=:viewers&language=:language', async (req, res) =>
{
    try
    {
        let tokenData = await getToken();

        let accessToken = tokenData.access_token;

        let headers = {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken
        }

        let { game, viewers, language } = req.params;

        if(language == "null")
        {
            language = '';
        }

        let game_response = await fetch(`${process.env.GAMES_URL}?name=${game}`, { headers: headers });

        let game_data = await game_response.json();

        if(game_data.data.length == 0) // If there is no game found, send empty array to display no results found message
        {
            return res.json([]);
        }

        let gameID = game_data.data[0].id;

        let streams = [];

        let count = 10;

        let cursor = '';

        let response;

        let data;

        while(count != 0)
        {
            if(count % 2 == 0)
            {
                response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (language ? `&language=${language}` : '') + (cursor ? `&after=${cursor}`: ''), { headers: headers });
                data = await response.json();
    
                if(streams.length == 0)
                {
                    streams = data;
                }
                else if(data.data.length == 0)
                {
                    break;
                }
                else if(data.data[0].viewer_count < 10)
                {
                    break;
                }
                else
                {
                    streams.data = streams.data.concat(data.data);
                }            

                if(data.pagination.cursor)
                {
                    cursor = data.pagination.cursor;
                }
                else
                {
                    break;
                }
            }

            --count;
        }

        let filtered_streams = [];

        filtered_streams = filter(streams, viewers); // Filter streams to ones that have equal or lower amount of given viewers from the parameters.

        shuffle(filtered_streams);

        if(filtered_streams.length != 0) // If we found one, send the data
        {
            return res.json(filtered_streams);
        }
        else // Else, we have to continue searching for more streams until we have streams that have equal or lower the given viewers.
        {
            let count = 10;

            while(count != 0)
            {
                if(count % 2 == 0)
                {
                    let response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (language ? `&language=${language}` : '') + (cursor ? `&after=${cursor}`: ''), { headers: headers });
                    let data = await response.json();

                    if(streams.length == 0)
                    {
                        streams = data;
                    }
                    else if(data.data.length == 0)
                    {
                        break;
                    }
                    else if(data.data[0].viewer_count < 10)
                    {
                        break;
                    }
                    else
                    {
                        streams.data = streams.data.concat(data.data);
                    }            

                    if(data.pagination.cursor)
                    {
                        cursor = data.pagination.cursor;
                    }
                    else
                    {
                        break;
                    }
                }

                --count;
            }

            filtered_streams = filter(streams, viewers);

            shuffle(filtered_streams);

            return res.json(filtered_streams);
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