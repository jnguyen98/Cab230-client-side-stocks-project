import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthorization } from '../AuthorizationContext/Authorization';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import "../CSS/Styles.css"

// RegisterForm component which contains the forms for user registration
function RegisterForm() {
    const { isAuthenticated, Register } = useAuthorization();
    const { handleSubmit, register, reset } = useForm();
    const [ signup, setSignup ] = useState(false);

    const onSubmit = ({ email, password }) => {
            Register(email, password)
                .then(() => {
                    alert('You successfully registered!');
                    setSignup(true);
                    reset();
                })
                .catch((err) => alert(err+". This account already exists. Try a different account"));
                setSignup(false);

    };
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px"}}>
            <Form onSubmit={handleSubmit(onSubmit)} style={{width: "350px"}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="input" name="email" ref={register({ required: true })} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="input" name="password" ref={register({ required: true })} type="password" placeholder="Password"/>
                </Form.Group>
                <Button className="button" type="submit">
                    Register
                </Button>
                {signup && <Redirect to="/login" />}
                {isAuthenticated && <Redirect to="/" />}
                <div style={{marginLeft: "12px", fontSize: "15px"}}>
                    <Link to="/login">Already a member? Login now!</Link>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;
