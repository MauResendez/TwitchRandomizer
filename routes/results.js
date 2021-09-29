const express = require('express');
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

    for(var i = 0; i < streams.length; ++i) 
    {
        streams[i].thumbnail_url = streams[i].thumbnail_url.replace('{width}x{height}', '325x180');

        if(streams[i].viewer_count <= viewers) 
        {
            filtered_streams.push(streams[i]);
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

        if(language == 'null')
        {
            language = '';
        }

        let game_response = await fetch(`${process.env.GAMES_URL}?name=${game}`, { headers: headers });
        let game_json = await game_response.json();
        let game_data = game_json.data;

        if(game_data.length == 0) // If there is no game found, send empty array to display no results found message
        {
            return res.json([]);
        }

        let gameID = game_data[0].id;
        let streams = [];
        let cursor = '';
        let response;
        let count = 10;

        while(count != 0)
        {
            if(count % 2 == 0)
            {
                response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (language ? `&language=${language}` : '') + (cursor ? `&after=${cursor}`: ''), { headers: headers });
                streams_json = await response.json();
                streams_data = streams_json.data;
    
                if(streams.length == 0)
                {
                    streams = streams_data;
                }
                else if(streams_data.length == 0 || streams_data[0].viewer_count < 10)
                {
                    break;
                }
                else
                {
                    streams = streams.concat(streams_data);
                }            

                if(streams_json.pagination.cursor)
                {
                    cursor = streams_json.pagination.cursor;
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
                    response = await fetch(`${process.env.STREAMS_URL}?game_id=${gameID}&first=100` + (language ? `&language=${language}` : '') + (cursor ? `&after=${cursor}`: ''), { headers: headers });
                    streams_json = await response.json();
                    streams_data = streams_json.data;
        
                    if(streams.length == 0) // If the streams array is empty (When we're starting), assign the streams we received from the API response to it
                    {
                        streams = streams_data;
                    }
                    else if(streams_data.length == 0 || streams_data[0].viewer_count < 10) // If the API response shows no streams or we found a stream that is lower than 10 viewers
                    {                                                                      // Then break the loop
                        break;
                    }
                    else // Else, keep adding more streams received from the APi response to the current streams array
                    {
                        streams = streams.concat(streams_data);
                    }            

                    if(streams_json.pagination.cursor) // If the cursor exists in the API resposne,
                    {                                  // Set the cursor to that so we can receive the next amount of streams for the next loop
                        cursor = streams_json.pagination.cursor;
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