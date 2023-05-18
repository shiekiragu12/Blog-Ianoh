import React, { useState } from 'react'
import './Register.scss'
import { Form, FormControl, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Editor from '../assets/register.png'

// auth
import { serverUrl } from "../ServerUrl";
import { toast } from "react-toastify";


function Register() {
    // the data related with the form
    const [formData, setFormData] = useState({
        full_name: "",
        fullnameError: "",
        email: "",
        phone: "",
        password: "",
        passwordError: "",
        confirmPassword: "",
        confirmPasswordError: "",
        role: "",
    });
    const digitCount = formData.phone.replace(/[^0-9]/g, "").length; // Count only digits

    //   handling the change of the data in the form
    const handleChange = (event) => {
        const { name, value } = event.target;

        // limit phone number input to 10 digits
        if (name === "phone") {
            const digitOnly = value.replace(/[^0-9]/g, "");
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: digitOnly.substring(0, 10),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    //   now submit the data of the user to the backend
    function handleSubmit(e) {
        // prevent form from redirecting to another page
        e.preventDefault();

        //check if password and confirm password match
        if (formData.password !== formData.confirmPassword)
            return setFormData((prevFormData) => ({
                ...prevFormData,
                confirmPasswordError: "Passwords do not match",
            }));
        else
            setFormData((prevFormData) => ({
                ...prevFormData,
                confirmPasswordError: "",
            }));

        // Password characters to be more than or equals to 8 
        if (formData.password.length < 7)
            return setFormData((prevFormData) => ({
                ...prevFormData,
                passwordError: "Password should have 8 or more characters",
            }));
        else
            setFormData((prevFormData) => ({
                ...prevFormData,
                passwordError: "",
            }));

        // check if the user has entered the 5 characters
        if (formData.fullname.length < 5)
            return setFormData((prevFormData) => ({
                ...prevFormData,
                fullnameError: "Full Name must be at least 5 characters",
            }));
        else
            setFormData((prevFormData) => ({
                ...prevFormData,
                fullnameError: "",
            }));

        // data to be sent to the backend
        const dataUser = [{
            email: formData.email,
            full_name: formData.full_name,
            phone: formData.phone,
            password: formData.password,
            role: formData.role,
        }]

        try {
            //registering the user by hitting the endpoints
            serverUrl.post("/register", dataUser)
                .then((res) => {
                    toast.success(`Welcome, You are successfully registered.`)
                })

                // displaying the messages of why the error occoyred
                .catch((error) => {
                    if (error.response && error.response.status === 409) {
                        toast.error('Registration failed user with similar credentials is already registered')

                    } else {
                        console.log('Unexpected error: ' + error.message);
                    }
                });
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div className='register'>
            <Image src={Editor}></Image>

            <Card>
                <Card.Body>
                    <h2>Welcome to the bla bla Blogs</h2>
                    <span>Register so that you can have an account with us</span>

                    <Form onSubmit={handleSubmit}>
                        <FormControl type='text' placeholder='Full Name' value={formData.full_name} onChange={handleChange} required />
                        {formData.fullnameError && (
                            <div className="fullnameerror">
                                {formData.fullnameError}
                            </div>
                        )}
                        <FormControl type='email' placeholder='Email Address' value={formData.email} onChange={handleChange} required />
                        <Form.Select>
                            <option value="">Select Role</option>
                            <option value={formData.role} onChange={handleChange} required>Admin</option>
                            <option value={formData.role} onChange={handleChange} required>Blogger</option>
                            <option value={formData.role} onChange={handleChange} required>Viewer</option>
                        </Form.Select>
                        <FormControl type='number' placeholder='Phone Number' value={formData.phone} onChange={handleChange} required />
                        <p
                            style={{
                                fontSize: "12px",
                                paddingRight: "20px",
                                float: "right",
                            }}
                        >
                            {digitCount}/10
                        </p>
                        
                        <FormControl type='text' placeholder='Password' value={formData.password} onChange={handleChange} required />
                        {formData.passwordError && (
                            <div className="fullnameerror">
                                {formData.passwordError}
                            </div>
                        )}
                        <FormControl type='text' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />
                        {formData.confirmPasswordError && (
                            <div className="fullnameerror">
                                {formData.confirmPasswordError}
                            </div>
                        )}

                        <button type="submit" className='btn  mt-2'>Create your account</button>
                    </Form>
                    <p>Already Have an account? <Link to='/login'>Login</Link></p>
                </Card.Body>

            </Card>
        </div>
    )
}

export default Register