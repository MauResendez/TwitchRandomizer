import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';
import Loader from "react-loader-spinner";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

import '../styles/Stream.css';

function Stream() 
{
    const [game, setGame] = useState(localStorage.getItem('game'));
    const [viewers, setViewers] = useState(localStorage.getItem('viewers'));
    const [language, setLanguage] = useState(localStorage.getItem('language'));
    const [channel, setChannel] = useState(localStorage.getItem('channel'));
    const [{ stream, loading, error }, setState] = useState({ stream: null, loading: true, error: null });

    function Refresh() 
    {
        localStorage.removeItem('channel');
        setChannel(null);
        window.location.reload();
    }

    useEffect(() => 
    {
        const findStream = async (game, viewers, language) =>
        {
            try 
            {
                if(channel) // If you clicked on a stream from the Results page, it'll set up the stream to be that one
                {
                    setState({ stream: channel, loading: false, ...error });
                }
                else if(localStorage.getItem('results') === null || localStorage.getItem('results') === []) // If you first started searching, 
                {                                                                                           // it'll retrieve results and pick a random stream from there

                    const response = await axios.get(`/api/results/game=${game}&viewers=${viewers}&language=${language}`);

                    let randomNumber = Math.floor(Math.random() * response.data.length);

                    localStorage.setItem('results', JSON.stringify(response.data));

                    setState({ stream: JSON.parse(localStorage.getItem('results'))[randomNumber].user_login, loading: false, ...error });
                }
                else // If you already have results, it'll go back to the results array and choose another stream from there
                {
                    let randomNumber;
                    let isLiveAndOnGame = false;

                    while(isLiveAndOnGame === false) // Have a loop in case some streams from the array have stop streaming
                    {
                        randomNumber = Math.floor(Math.random() * JSON.parse(localStorage.getItem('results')).length);

                        let results = JSON.parse(localStorage.getItem('results'));

                        isLiveAndOnGame = await axios.get(`/api/stream/streamer=${results[randomNumber].user_login}&game=${game}`); // Checks to see if you found a streamer
                                                                                                                                    // That's live and on the game you're searching for
                        if(isLiveAndOnGame === false) // If you found a streamer that's not live anymore, remove the streamer from the results and start finding another one
                        {
                            results.splice(randomNumber, 1);
                            localStorage.setItem('results', JSON.stringify(results));
                        }
                    }

                    setState({ stream: JSON.parse(localStorage.getItem('results'))[randomNumber].user_login, loading: false, ...error });
                }
            } 
            catch (err) 
            {
                setState({ ...stream, loading: false, error: err });
            }; 
        }
          
        if(loading) // If loading state is true (When you're first starting searching)
        {
            findStream(game, viewers, language);
        }

    }, [stream, loading, error])

    return (
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '91.5vh' }}>  
            <Container component='main' center>
                {loading && 
                    <div id="streamLoader">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>
                }

                {stream && !loading &&
                    <div id="stream">
                        <ReactTwitchEmbedVideo 
                            autoFocus
                            autoplay
                            channel={stream}
                            layout="video-with-chat"
                            onPlay={function noRefCheck(){}}
                            onReady={function noRefCheck(){}}
                            theme="dark"
                        />
                    </div>
                }

                {!stream && !loading &&
                    <div id="streamError">
                        <h1>Error: No stream found</h1>
                    </div>
                }

                {!loading &&
                    <div id="streamButtons">
                        <Link to={{pathname: `/stream`}} onClick={Refresh}>
                            <Button type="button" halfWidth variant="contained" color="primary" className="submit">Find Another Stream</Button>
                        </Link>
                        <Link to={{pathname: `/`}}>
                            <Button type="button" halfWidth variant="contained" color="primary" className="submit">Home</Button>
                        </Link>
                    </div>
                } 
            </Container>
        </Grid>
    )
}

export default Stream;