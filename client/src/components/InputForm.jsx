import React, { useState, useEffect } from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { Box, Button, Container, Grid, Link, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { data } from '../data/data.js'

import { Redirect } from 'react-router-dom';

import '../styles/InputForm.css';

function Copyright() 
{
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit'>
          Twitch Random
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    );
}
  
const useStyles = makeStyles((theme) => 
({
  form: 
  {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

function InputForm() 
{
    const classes = useStyles();

    const [game, setGame] = useState('');
    const [inputGame, setInputGame] = useState('');
    const [open, setOpen] = useState(false)
    const [viewers, setViewers] = useState(9999999);
    const [language, setLanguage] = useState('Select...');
    const [randomSubmitted, setRandomSubmitted] = useState(false);
    const [resultsSubmitted, setResultsSubmitted] = useState(false);

    useEffect(() => // When starting/refreshing the page, remove all previous data so the user can fill in the data to their liking
    {
      localStorage.clear();
    }, []);

    useEffect(() => // Everytime one of the three variables has been changed, update the localstorage to their latest value
    {
      localStorage.setItem('game', game);
      localStorage.setItem('viewers', viewers);
      localStorage.setItem('language', language);
    }, [game, viewers, language]);

    const findRandomStream = (event) => 
    {
      event.preventDefault();

      if(language === 'Select...')
      {
        setLanguage(null);
      }
      
      if(game)
      {
        setRandomSubmitted(true);
      }
    }

    const findResults = (event) => 
    {
      event.preventDefault();

      if(language === 'Select...')
      {
        setLanguage(null);
      }
      
      if(game)
      {
        setResultsSubmitted(true);
      }
    }

    const checkViewersInput = (event) => 
    {
      if(event.target.value < 10 && event.target.value !== '') // If the viewer amount is set less than 10, then set it to 10
      {
        setViewers(10);
      }
      else if(event.target.value > 9999999 && event.target.value !== '') // If the viewer amount is set higher than 9999999, then set it to 9999999 (Max Amount)
      {
        setViewers(9999999);
      }
      else if(event.target.value >= 10 && event.target.value !== '') // If the viewer count is equal or more than 10, set the viewers to the number
      {
        setViewers(event.target.value);
      }
      else // If the user left it blank, assume that they want to view any streamer, no matter the viewer count
      {
        setViewers(9999999);
      }
    }

    const games = data

    return (
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '91.5vh' }}>  
            { randomSubmitted && <Redirect push to={{pathname: `/stream`}}/> }
            { resultsSubmitted && <Redirect push to={{pathname: `/results`}}/> }

            <div id="formIntro">
              <Typography variant='h5'><strong>Twitch Random</strong></Typography>
              <Typography>Find new streamers to watch based on your language and favorite games</Typography>
            </div>
            
            <Container component='main' maxWidth='xs' center>  
              <form className={classes.form} onSubmit={findRandomStream}>
                  <Autocomplete
                    open={open}
                    onOpen={() => 
                    {
                      if(inputGame) 
                      {
                        setOpen(true);
                      }
                    }}
                    onClose={() => setOpen(false)}
                    value={game}
                    onChange={(event, game) => 
                    {
                      setGame(game);
                    }}
                    inputValue={inputGame}
                    onInputChange={(event, inputGame) => 
                    {
                      setInputGame(inputGame);

                      if(!inputGame) 
                      {
                        setOpen(false);
                      }
                    }}
                    options={games}
                    freeSolo
                    renderInput={(params) => <TextField {...params} variant='outlined' required id='game' label='Game' name='game' autoFocus/>}
                  />
                  <TextField variant='outlined' type='number' margin='normal' InputProps={{ inputProps: { min: '10', max: '9999999' } }} fullWidth id='viewers' label='Number of Viewers (Minimum: 10)' name='viewers' onChange={e => setViewers(e.target.value)} onBlur={checkViewersInput}/>
                  <div id='select'>
                    <Select native variant='outlined' margin='normal' fullWidth id='language' label='Language' name='language' onChange={e => setLanguage(e.target.value)}>
                      <option value={'Select...'}>Select Language...</option>
                      <option value={'en'}>English</option>
                      <option value={'es'}>Español (Spanish)</option>
                      <option value={'fr'}>Français (French)</option>
                      <option value={'de'}>Deutsch (German)</option>
                      <option value={'ja'}>日本語 (Japanese)</option>
                      <option value={'it'}>Italiano (Italian)</option>
                      <option value={'pt'}>Português (Portuguese)</option>
                      <option value={'ru'}>русский (Russian)</option>
                      <option value={'nl'}>Nederlands (Dutch)</option>
                      <option value={'tr'}>Türkçe (Turkish)</option>
                    </Select>
                  </div>
                  <div id='inputButtons'>
                    <Button type='submit' onClick={findRandomStream} halfWidth variant='contained' color='primary' className='submit'>Find A Random Stream</Button>
                    <Button onClick={findResults} halfWidth variant='contained' color='primary' className='submit'>View Results</Button>
                  </div>
              </form>
              <Box mt={8}>
                  <Copyright />
              </Box>
            </Container>
        </Grid>
    );
}

export default InputForm;