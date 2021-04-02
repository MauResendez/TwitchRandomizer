const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const request = require('request');

const getToken = (url, callback) => 
{
    const options = 
    {
        url: url,
        json: true,
        body: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'client_credentials'
        }
    }

    request.post(options, (err, res, body) => 
    {
        if(err)
        {
            return console.log(err);
        }

        callback(res);       
    })
} 

var accessToken = '';
getToken(process.env.TOKEN_URL, (res) => 
{
    accessToken = res.body.access_token;
    console.log(accessToken);
});

router.get('/', (req, res) => 
{
    const headers = {
        url: process.env.STREAMS_URL,
        method: 'GET',
        headers: 
        {
            'Client-ID': process.env.CLIENT_ID,
            'Authorization': 'Bearer ' + accessToken
        }
    }

    request.get(headers, (err, res, body) => 
    {
        if(err)
        {
            return console.log(err);
        }

        console.log(JSON.parse(body)); 
    });
});

module.exports = router;