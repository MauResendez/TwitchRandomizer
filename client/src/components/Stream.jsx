import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

import Loader from "react-loader-spinner";

import ReactTwitchEmbedVideo from "react-twitch-embed-video";

import '../styles/Stream.css';

function Stream(props) 
{
    // const [game, setGame] = useState(props.location.state.game);
    // const [viewers, setViewers] = useState(props.location.state.viewers);
    // const [language, setLanguage] = useState(props.location.state.language);
    // const [channel, setChannel] = useState(props.location.state.channel);

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
                if(channel)
                {
                    setState({ stream: channel, loading: false, ...error });
                }
                else if(localStorage.getItem('results') === null || localStorage.getItem('results') === [])
                {
                    const response = await axios.get(`/api/results/game=${game}&viewers=${viewers}&language=${language}`);

                    let randomNumber = Math.floor(Math.random() * response.data.length);

                    localStorage.setItem('results', JSON.stringify(response.data));

                    setState({ stream: JSON.parse(localStorage.getItem('results'))[randomNumber].user_login, loading: false, ...error });
                }
                else
                {
                    let randomNumber;
                    
                    let isLiveAndOnGame = false;

                    while(isLiveAndOnGame === false)
                    {
                        randomNumber = Math.floor(Math.random() * JSON.parse(localStorage.getItem('results')).length);

                        let results = JSON.parse(localStorage.getItem('results'));

                        isLiveAndOnGame = await axios.get(`/api/stream/streamer=${results[randomNumber].user_login}&game=${game}`); 

                        if(isLiveAndOnGame === false)
                        {
                            console.log("False");
                            results.splice(randomNumber, 1);
                            localStorage.setItem('results', JSON.stringify(results));
                        }
                    }

                    setState({ stream: JSON.parse(localStorage.getItem('results'))[randomNumber].user_login, loading: false, ...error });
                }
                // else
                // {
                //     const response = await axios.get(`/api/stream/game=${game}&viewers=${viewers}&language=${language}`);
    
                //     setState({ stream: response.data.user_name, loading: false, ...error });
                // }
            } 
            catch (err) 
            {
                setState({ ...stream, loading: false, error: err });
            }; 
        }
          
        if(loading) 
        {
            findStream(game, viewers, language);
        }

    }, [stream, loading, error])

    return (
        <div>
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

            {!loading && stream &&
                <div id="stream">
                    <ReactTwitchEmbedVideo 
                        autoFocus
                        autoplay
                        channel={stream}
                        layout="video-with-chat"
                        width="940"
                        height="480"
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
        </div>
    )
}

export default Stream;