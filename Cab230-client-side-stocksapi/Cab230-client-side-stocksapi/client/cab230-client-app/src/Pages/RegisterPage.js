import React from 'react';

import RegisterForm from '../Components/RegisterForm';
import Styles from '../Components/Styles';

// Register component which holds the register page.
function RegisterPage() {
    return (
        <Styles>
            <div style={{textAlign: "center"}}>
                <h1>User Registration</h1>
                <img style={{marginTop: "20px"}} src={require("../Images/registration.png")} alt="login" height="180" width="150"/>
            </div>
            <RegisterForm/>
        </Styles>
    );
};

export default RegisterPage;
