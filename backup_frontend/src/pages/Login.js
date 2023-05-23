import React, { useState } from 'react'
import './Login.scss'
import { Form, FormControl, Button, Card, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Editor from '../assets/editor.png'

import { serverUrl } from "../ServerUrl";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode"

function Login() {
  const navigate = useNavigate()

  // user details needed so that they can be automatically logged in 
  let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

  // the data related with the form
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  //   handling the change of the data in the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };


  //   now submit the data of the user to the backend
  function handleSubmit(e) {
    // prevent form from redirecting to another page
    e.preventDefault();
    // data to be sent to the backend

    const dataUser = [{
      email: formData.email,
      full_name: formData.full_name,
      password: formData.password,
    }]

    try {
          // login in the user 
          serverUrl
            .post("/login", {
              email: formData.email,
              password: formData.password,
            })
            .then((res) => {
              // get the user acces tokens and store them
              const data = res.data
              setAuthTokens(data.accessToken)
              setUser(jwt_decode(data.accessToken))
              localStorage.setItem('authTokens', JSON.stringify(data.accessToken))
              // Redirect to the page where they can add the landlord details
              navigate('/')
              toast.success("Welcome Back")
            })
            .catch((error) => {
              console.log("Login failed: " + error);
            });


    } catch (error) {
      console.log(error);
    }


  }
  return (
    <div className='login'>
      <Image src={Editor}></Image>
      <Card>
        <Card.Body>
          <h2>Welcome to the bla bla Blogs</h2>
          <span>Login to get access to your blogs</span>
          <Form onSubmit={handleSubmit}>
            <FormControl name='full_name' type='text' placeholder='Full Name' onChange={handleChange}/>
            <FormControl name='email' type='email' placeholder='Email Address' onChange={handleChange} required />
            <FormControl name='password' type='password' placeholder='Password' onChange={handleChange} required />
            <Button type='submit' className='btn  mt-2'>Login</Button>
          </Form>
          <p>Do not Have an account? <Link to='/register'>Register</Link></p>

        </Card.Body>

      </Card>
    </div>
  )
}

export default Login