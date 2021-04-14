import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) 
{
    // return (
    //     <Route {...rest} render={ props => 
    //             {
    //                 if(game) 
    //                 {
    //                     console.log(game);
    //                     console.log(...props);
    //                     return <Component {...rest} {...props}/>
    //                 } 
    //                 else 
    //                 {
    //                     console.log(game);
    //                     return <Redirect to={{ pathname: '/', state: { from: props.location }}}/>
    //                 }
    //             }
    //         } 
    //     />
    // )

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