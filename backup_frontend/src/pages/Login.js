import React from 'react'
import './Login.scss'
import { Form, FormControl, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Editor from '../assets/editor.png'

function Login() {
  return (
    <div className='login'>
      <Image src={Editor}></Image>
    <Card>
        <Card.Body>
            <h2>Welcome to the bla bla Blogs</h2>
            <span>Login to get access to your blogs</span>
           <Form>
            <FormControl type='text' placeholder='Full Name'/>                  
            <FormControl type='email' placeholder='Email Address'/>   
            <FormControl type='email' placeholder='Password'/>   
            <Button className='btn  mt-2'>Login</Button>  
           </Form>
           <p>Do not Have an account? <Link to='/register'>Register</Link></p>

        </Card.Body>
      
    </Card>
</div>
  )
}

export default Login