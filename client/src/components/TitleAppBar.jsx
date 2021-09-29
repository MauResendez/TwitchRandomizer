import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import '../styles/TitleAppBar.css';
import { Link } from 'react-router-dom';

function TitleAppBar() 
{
    return (
        <div>
            <AppBar position="static" className="appBar">
                <Toolbar>
                    <Link to={{pathname: '/'}}>
                        <Typography variant="h6">
                            Twitch Random
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TitleAppBar;
