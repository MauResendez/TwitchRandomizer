import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import ReactPaginate from 'react-paginate';

import '../styles/Results.css';

const useStyles = makeStyles((theme) => 
({
    submit: 
    {
        background: '#9146ff !important',
        margin: '3px !important',
    },
}));

function Results(props) 
{
    const classes = useStyles();

    const [game, setGame] = useState(props.location.state.game);
    const [viewers, setViewers] = useState(props.location.state.viewers);
    const [language, setLanguage] = useState(props.location.state.language);

    const [{ results, loading, error }, setState] = useState({ results: [], loading: true, error: null });
    const [currentPageResults, setCurrentPageResults] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    const channelsPerPage = 50;
    const channelsVisited = (pageNumber - 1) * channelsPerPage;

    const pageCount = Math.ceil(results.length / channelsPerPage);

    const displayResults = results.slice(channelsVisited, channelsVisited + channelsPerPage).map((result) => 
    {
        return (
            <GridListTile component={Link} to={{pathname: `/stream`, state: { game: game, viewers: viewers, language: language, channel: result.user_name }}}>
                <img src={result.thumbnail_url} alt="Thumbnail"/>
                <GridListTileBar
                    title={result.title}
                    subtitle={<span>{result.user_name} ({result.viewer_count} viewers)</span>}
                />
            </GridListTile>
        );
    });

    useEffect(() => 
    {
        const findResults = async (game, viewers) =>
        {
            try 
            {
                const response = await axios.get(`/api/results/game=${game}&viewers=${viewers}&language=${language}`);

                console.log(response.data);

                setState({ results: response.data, loading: false, ...error });
                setCurrentPageResults(response.data.slice(channelsVisited, channelsVisited + channelsPerPage));
                // setPageCount(Math.ceil(response.data.length / channelsPerPage));
            } 
            catch (err) 
            {
                setState({ ...results, loading: false, error: err });
            }; 
        }
          
        if(loading) 
        {
            findResults(game, viewers);
        }

    }, [])

    return (
            <div>
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

                {results.length == 0 && !loading &&
                    <div id="resultsError">
                        <h1>Error: No results found</h1>
                    </div>
                }

                {results.length != 0 && !loading &&
                    <Container style={{paddingTop: "50px", paddingBottom: "50px"}}>
                        <GridList container cols={5}>
                            {displayResults}
                        </GridList>
                        <div className="pagination">
                            <Pagination count={pageCount} page={pageNumber} onChange={(event, value) => { setPageNumber(value); }}/>
                        </div>
                    </Container>
                }

            </div>
    )
}

export default Results;
