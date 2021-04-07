import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import '../styles/TitleAppBar.css';

function TitleAppBar() 
{
    return (
        <div>
            <AppBar position="static" className="appBar">
                <Toolbar>
                    <a href="/">
                        <Typography variant="h6">
                            Twitch Randomizer
                        </Typography>
                    </a>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TitleAppBar;
