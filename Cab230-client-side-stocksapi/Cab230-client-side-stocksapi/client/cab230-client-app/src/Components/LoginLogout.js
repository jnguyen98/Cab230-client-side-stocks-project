import React from 'react';
import { useAuthorization } from '../AuthorizationContext/Authorization';
import { Button } from 'react-bootstrap';

// Logout component which holds the logout button.
function DisplayLoginLogout(){
    // Redirect to login page for login button on click
    const Redirect = () => {
        // Get window location
        const url = window.location.href;
        window.location = url + "login";
    }

    const { isAuthenticated, Logout } = useAuthorization();

    return (isAuthenticated === true ?
        <Button variant="danger" className="logButton" onClick={Logout} style={{color: "crimson"}}>
            Logout <img style={{marginBottom: "10px"}} width="30" height="30" src={require("../Images/logout-image.png")} alt="logout"/>
        </Button> :
        <Button className="logButton" style={{color: "rgb(75,192,192,1)"}} onClick={Redirect}>
            Login <img style={{marginBottom: "15px"}} width="30" height="30" src={require("../Images/login-lock.png")} alt="login"/>
        </Button>

    );
};


export default DisplayLoginLogout


