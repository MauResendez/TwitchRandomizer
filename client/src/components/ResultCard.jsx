import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles
({
  root: 
  {
    Width: 325,
    Height: 350,
    minWidth: 325,
    minHeight: 350,
    maxWidth: 325,
    maxHeight: 350,
    padding: '5px',
  },
});

function ResultCard(props) 
{
  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.root}>
        <CardHeader
          title={props.channel}
          subheader={props.game}
        />
        <CardMedia
          className={classes.media}
          image={props.thumbnail}
          style={{width: 325, height: 180, maxWidth: 325, maxHeight: 180, minWidth: 325, minHeight: 180}}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.viewers}
          </Typography>
        </CardContent>
      </Card>
    </Container>
    
  );
}

export default ResultCard;