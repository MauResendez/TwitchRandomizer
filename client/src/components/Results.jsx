import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ResultCard from '../components/ResultCard.jsx';
import { Container } from '@material-ui/core';

function Results() 
{
    return (
        <div>
            <h1>Results</h1>
            <Container>
                <ResultCard />
            </Container>
        </div>
    )
}

export default Results;
