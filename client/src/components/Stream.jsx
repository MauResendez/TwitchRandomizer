import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Loader from "react-loader-spinner";

import ReactTwitchEmbedVideo from "react-twitch-embed-video"

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

    // const [game, setGame] = useState(props.match.params.game);
    // const [viewers, setViewers] = useState(props.match.params.viewers);

    const [game, setGame] = useState(props.location.state.game);
    const [viewers, setViewers] = useState(props.location.state.viewers);
    const [channel, setChannel] = useState(props.location.state.channel);

    const [{ stream, loading, error }, setState] = useState({ stream: null, loading: true, error: null });

    useEffect(() => 
    {
        const findStream = async (game, viewers) =>
        {
            try 
            {
                if(channel)
                {
                    setState({ stream: channel, loading: false, ...error });
                }
                else
                {
                    const response = await axios.get(`/api/stream/game=${game}&viewers=${viewers}`);
    
                    setState({ stream: response.data.user_name, loading: false, ...error });
                }
                
            } 
            catch (err) 
            {
                setState({ ...stream, loading: false, error: err });
            }; 
        }
          
        if(loading) 
        {
            findStream(game, viewers);
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

            {!loading && 
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
                <div id="error">
                    <h1>Error: No stream found</h1>
                </div>
            }

            {!loading &&
                <div id="streamButtons">
                    <Link to={{pathname: `/stream`, state: { game: game, viewers: viewers, channel: null }}} onClick={() => window.location.reload()}>
                        <Button type="button" halfWidth variant="contained" color="primary" className={classes.submit}>Find Another Stream</Button>
                    </Link>
                    <Link to='/'>
                        <Button type="button" halfWidth variant="contained" color="primary" className={classes.submit}>Home</Button>
                    </Link>
                </div>
            }
            
        </Container>
    )
}

export default Stream;