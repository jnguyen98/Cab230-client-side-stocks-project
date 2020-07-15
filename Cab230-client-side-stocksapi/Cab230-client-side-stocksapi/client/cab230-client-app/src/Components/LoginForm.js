import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useAuthorization } from '../AuthorizationContext/Authorization';
import { useForm } from 'react-hook-form';

import "../CSS/Styles.css"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// LoginForm component contains relevant forms to authenticate a user
function LoginForm() {
    const { isAuthenticated, Login } = useAuthorization();
    const { handleSubmit, register } = useForm();

    const onSubmit = ({ email, password }) => {
        Login(email, password)
            .then(() => {
                alert('You successfully login');
            })
            .catch((err) =>
                alert(err + " Invalid Account. Try again")
            );

    };
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px"}}>
            <Form onSubmit={handleSubmit(onSubmit)} style={{width: "350px"}}>
                <Form.Group controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className="input" name="email" ref={register({ required: true })} type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" className="input" ref={register({ required: true })} type="password" placeholder="Password"/>
                </Form.Group>
                    <Button className="button"  type="submit">
                        Login
                    </Button>
                    {isAuthenticated && <Redirect to="/" />}
                    <div style={{marginLeft: "12px", fontSize: "15px"}}>
                        <Link to="/register">Not a member? Register now!</Link>
                    </div>

            </Form>
        </div>
    );
};

export default LoginForm;
