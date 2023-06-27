import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Login() {

    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit= (e) =>{
        e.preventDefault();
        const loginConfig = {
            method: 'POST',
            url: 'http://localhost:8080/login',
            data: {
                email,
                password
            }
        }

        axios(loginConfig)
            .then((result) => {
                cookies.set("TOKEN", result.data.token, { path: '/' })
                window.location.href = '/auth'
                setLogin(true)
                console.log('result', result)

            }).then()
            .catch((error) => {
            error = new Error()
        })
    }
    return (
        <>
            <div>
                <h2>Login</h2>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    {/* email */}
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control value={email} type='email' name='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    {/* password */}
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} type='password' name='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Login</Button>

                    {
                        login ? (
                            <p className='text-success'>You are Logged in successfully</p>
                        ) : (
                            <p className='text-danger'>You are not logged in </p>
                        )
                    }
                </Form>
            </div>


            <div>

            </div>
        </>
    )
}

export default Login
