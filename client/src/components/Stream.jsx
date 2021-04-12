import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router'

import Loader from "react-loader-spinner";

import ReactTwitchEmbedVideo from "react-twitch-embed-video";

import '../styles/Stream.css';

const useStyles = makeStyles((theme) => 
({
    submit: 
    {
      background: '#9146ff !important',
      margin: '3px !important',
    },
}));

function Stream(props) 
{
    const classes = useStyles();

    const history = useHistory();

    const [game, setGame] = useState(props.location.state.game);
    const [viewers, setViewers] = useState(props.location.state.viewers);
    const [language, setLanguage] = useState(props.location.state.language);
    const [channel, setChannel] = useState(props.location.state.channel);
    const [{ stream, loading, error }, setState] = useState({ stream: null, loading: true, error: null });

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
                else
                {
                    const response = await axios.get(`/api/stream/game=${game}&viewers=${viewers}&language=${language}`);
    
                    setState({ stream: response.data.user_name, loading: false, ...error });
                }

                // else if(localStorage.getItem('results') === null || localStorage.getItem('results') === [])
                // {
                //     console.log("HEY");

                //     const response = await axios.get(`/api/results/game=${game}&viewers=${viewers}&language=${language}`);

                //     let randomNumber = Math.floor(Math.random() * response.data.length);

                //     localStorage.setItem('results', JSON.stringify(response.data));
                //     localStorage.setItem('oldresults', JSON.stringify(JSON.parse(localStorage.getItem('results')).filter(result => result.type === "live")));

                //     setState({ stream: JSON.parse(localStorage.getItem('results'))[randomNumber].user_name, loading: false, ...error });
                // }
                // else
                // {
                //     console.log("HI");

                //     localStorage.setItem('results', JSON.stringify(JSON.parse(localStorage.getItem('results')).filter(result => result.type === "live")));
                //     // localStorage.setItem('newresults', JSON.stringify(JSON.parse(localStorage.getItem('results')).filter(result => result.type === "live")));

                //     let randomNumber = Math.floor(Math.random() * JSON.parse(localStorage.getItem('results')).length);

                //     setState({ stream: JSON.parse(localStorage.getItem('results'))[randomNumber].user_name, loading: false, ...error });
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
        <Container>
            {loading && 
                <div id="loader">
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            }

            {!loading && stream &&
                <Container id="stream">
                    <ReactTwitchEmbedVideo autoFocus
                        autoplay
                        channel={stream}
                        layout="video-with-chat"
                        width="940"
                        height="480"
                        onPlay={function noRefCheck(){}}
                        onReady={function noRefCheck(){}}
                        muted="false"
                        theme="dark"
                    />
                </Container>
            }

            {!stream && !loading &&
                <div id="streamError">
                    <h1>Error: No stream found</h1>
                </div>
            }

            {!loading &&
                <div id="streamButtons">
                    <Link to={{state: { game: game, viewers: viewers, language: language, channel: null }}} onClick={() => window.location.reload()}>
                        <Button type="button" halfWidth variant="contained" color="primary" className={classes.submit}>Find Another Stream</Button>
                    </Link>
                    <Link to={{pathname: `/`}}>
                        <Button type="button" halfWidth variant="contained" color="primary" className={classes.submit}>Home</Button>
                    </Link>
                </div>
            }
            
        </Container>
    )
}

export default Stream;