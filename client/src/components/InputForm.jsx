import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    const [language, setLanguage] = useState('Select...');
    const [randomSubmitted, setRandomSubmitted] = useState(false);
    const [resultsSubmitted, setResultsSubmitted] = useState(false);

    const findRandomStream = (event) => 
    {
      event.preventDefault();

      if(game && viewers == '')
      {
        setViewers(9999999);
      }

      if(language == 'Select...')
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

      if(game && viewers == '')
      {
        setViewers(9999999);
      }

      if(language == 'Select...')
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
      if(event.target.value < 10 && event.target.value != "")
      {
        setViewers(10);
      }
      else if(event.target.value > 9999999 && event.target.value != "")
      {
        setViewers(9999999);
      }
      else if(event.target.value >= 10 && event.target.value != "")
      {
        setViewers(event.target.value);
      }
      else
      {
        event.target.value = '';
        setViewers('');
      }
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '85vh' }}>  
            { randomSubmitted && <Redirect push to={{pathname: `/stream`, state: { game: game, viewers: viewers, language: language }}}/> }
            { resultsSubmitted && <Redirect push to={{pathname: `/results`, state: { game: game, viewers: viewers, language: language }}}/> }

            <Container component="main" maxWidth="xs" center>
              <CssBaseline />
              <div className={classes.paper}>
                  <Typography component="h1" variant="h5">Twitch Randomizer</Typography>
                  <form className={classes.form} onSubmit={findRandomStream}>
                      <TextField variant="outlined" type="text" margin="normal" required fullWidth id="game" label="Game" name="game" onChange={e => setGame(e.target.value)} autoFocus/>
                      <TextField variant="outlined" type="number" margin="normal" InputProps={{ inputProps: { min: "10", max: "9999999" } }} fullWidth id="viewers" label="Max Number of Viewers (Minimum: 10)" name="viewers" value={viewers} onChange={e => setViewers(e.target.value)} onBlur={checkViewersInput}/>
                      <div id="select">
                        <Select native variant="outlined" margin="normal" fullWidth id="language" label="Language" name="language" onChange={e => setLanguage(e.target.value)}>
                          <option value={"Select..."}>Select...</option>
                          <option value={"en"}>English</option>
                          <option value={"es"}>Español (Spanish)</option>
                          <option value={"fr"}>Français (French)</option>
                          <option value={"de"}>Deutsch (German)</option>
                          <option value={"ja"}>日本語 (Japanese)</option>
                          <option value={"it"}>Italiano (Italian)</option>
                          <option value={"pt"}>Português (Portuguese)</option>
                          <option value={"ru"}>русский (Russian)</option>
                          <option value={"nl"}>Nederlands (Dutch)</option>
                          <option value={"tr"}>Türkçe (Turkish)</option>
                        </Select>
                      </div>
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