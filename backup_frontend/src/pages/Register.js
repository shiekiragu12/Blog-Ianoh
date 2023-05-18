import React from 'react'
import './Register.scss'
import { Form, FormControl, Button, Card, FormSelect, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Editor from '../assets/register.png'


function Register() {
    return (
        <div className='register'>
                  <Image src={Editor}></Image>

            <Card>
                <Card.Body>
                    <h2>Welcome to the bla bla Blogs</h2>
                    <span>Register so that you can have an account with us</span>
                    <Form>
                        <FormControl type='text' placeholder='Full Name' />
                        <FormControl type='email' placeholder='Email Address' />
                        <FormControl type='number' placeholder='Phone Number' />
                        <Form.Select>
                            <option value="">Select Role</option>
                            <option value="option1">Admin</option>
                            <option value="option2">Blogger</option>
                            <option value="option3">Viewer</option>
                        </Form.Select>
                        <Button className='btn  mt-2'>Create your account</Button>
                    </Form>
                    <p>Already Have an account? <Link to='/login'>Login</Link></p>
                </Card.Body>

            </Card>
        </div>
    )
}

export default Register