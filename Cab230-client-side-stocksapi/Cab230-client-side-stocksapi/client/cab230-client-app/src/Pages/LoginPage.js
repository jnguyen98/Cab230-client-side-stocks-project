import React from 'react';

import LoginForm from '../Components/LoginForm';
import Styles from '../Components/Styles';


// Login component which holds the login page.
function LoginPage() {
    return (
        <Styles>
            <div style={{textAlign: "center"}}>
                <h1>User Login</h1>
                <img style={{marginTop: "20px"}}src={require("../Images/login.png")} alt="login" height="180" width="280"/>
            </div>
            <LoginForm />
        </Styles>
    );
};

export default LoginPage;
