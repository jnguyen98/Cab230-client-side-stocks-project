import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthorization } from '../AuthorizationContext/Authorization';

// Guarded Route component restricts users from entering an authorized route.
// The children of guarded route is the path to a link.
function GuardedRoute ({children, ...all }) {
    const { isAuthenticated } = useAuthorization();

    if (isAuthenticated)
    {
        return <Route {...all}>{children}</Route>;
    }
    else
    {
        alert("You must sign in to view this page")
        return <Redirect to="/login"/>;
    }
};


export default GuardedRoute


