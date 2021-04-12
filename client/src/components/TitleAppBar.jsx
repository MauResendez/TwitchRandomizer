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
                    {/* <a href="/">
                        <Typography variant="h6">
                            Twitch Randomizer
                        </Typography>
                    </a> */}
                    <Link to={{pathname: '/'}}>
                        <Typography variant="h6">
                            Twitch Randomizer
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TitleAppBar;
