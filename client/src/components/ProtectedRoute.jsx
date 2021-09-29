import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) 
{
    let game = localStorage.getItem('game');

    return (
        <Route {...rest} render={ props => 
            (
                game !== '' 
                ? 
                (
                    <Component  {...props} />
                ) 
                : 
                (
                    <Redirect to={{pathname: '/', state: { from: props.location }}}/>
                )
            )} 
        />
    )
}

export default ProtectedRoute;