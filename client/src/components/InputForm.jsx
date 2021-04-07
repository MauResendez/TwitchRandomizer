import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Redirect } from 'react-router-dom';

import '../styles/InputForm.css';

function Copyright() 
{
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Twitch Randomizer
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => 
  ({
    paper: 
    {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: 
    {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: 
    {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: 
    {
      background: '#9146ff !important',
      margin: '3px !important',
    },
  }));

function InputForm() 
{
    const classes = useStyles();

    const [game, setGame] = useState('');
    const [viewers, setViewers] = useState('');
    const [randomSubmitted, setRandomSubmitted] = useState(false);
    const [resultsSubmitted, setResultsSubmitted] = useState(false);

    const findRandomStream = (event) => 
    {
      event.preventDefault();

      if(viewers == '')
      {
        // viewers = 9999999;
        setViewers(null);
      }
      
      if(game)
      {
        setRandomSubmitted(true);
      }
    }

    const findResults = (event) => 
    {
      event.preventDefault();
      
      if(game)
      {
        setResultsSubmitted(true);
      }
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '80vh' }}>  
            {/* { randomSubmitted && <Redirect to={`/stream/game=${game}&viewers=${viewers}`}/> }
            { resultsSubmitted && <Redirect to={`/results/game=${game}&viewers=${viewers}`}/> } */}

            { randomSubmitted && <Redirect to={{pathname: `/stream`, state: { game: game, viewers: viewers }}}/> }
            { resultsSubmitted && <Redirect to={{pathname: `/results`, state: { game: game, viewers: viewers }}}/> }

            <Container component="main" maxWidth="xs" center>
              <CssBaseline />
              <div className={classes.paper}>
                  <Typography component="h1" variant="h5">Twitch Randomizer</Typography>
                  <form className={classes.form} onSubmit={findRandomStream}>
                      <TextField variant="outlined" type="text" margin="normal" required fullWidth id="game" label="Game" name="game" onChange={e => setGame(e.target.value)} autoFocus/>
                      <TextField variant="outlined" type="number" InputProps={{ inputProps: { min: "10", max: "9999999" } }} margin="normal" fullWidth id="viewers" label="Max Number of Viewers (Minimum: 10)" name="viewers" value={viewers} onChange={e => setViewers(e.target.value)} onBlur={e => e.target.value < 10 && e.target.value != '' ? setViewers(10) : setViewers(e.target.value)}/>
                      <div id="inputButtons">
                        <Button type="submit" onClick={findRandomStream} halfWidth variant="contained" color="primary" className={classes.submit}>Find A Random Stream</Button>
                        <Button onClick={findResults} halfWidth variant="contained" color="primary" className={classes.submit}>View Results</Button>
                      </div>
                  </form>
              </div>
              <Box mt={8}>
                  <Copyright />
              </Box>
            </Container>
        </Grid>
    );
}

export default InputForm;