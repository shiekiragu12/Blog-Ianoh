import React, { useState } from 'react';
import './Payment.scss';
import { Card, Form, FormControl, Alert, Button } from 'react-bootstrap';

// auth imports
import { serverUrl } from "../ServerUrl";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode"
import { Link } from 'react-router-dom';

function Payment() {
// transaction

const [transactionId, setTransactionId] = useState('')

    const [formData, setFormData] = useState({
        phone: "",
        phoneWarning: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "phone") {
            const digitOnly = value.replace(/[^0-9]/g, "");
            const startsWithValidCode = digitOnly.startsWith("01") || digitOnly.startsWith("07");
            const warningMessage = startsWithValidCode ? "" : "Number should start with 01 or 07";

            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: startsWithValidCode ? digitOnly.substring(0, 10) : digitOnly.substring(0, 2),
                phoneWarning: warningMessage,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const digitCount = formData.phone ? formData.phone.replace(/[^0-9]/g, "").length : 0;

    //   now submit the data of the user to the backend
    function handleSubmit(e) {
        // prevent form from redirecting to another page
        e.preventDefault();

        //check if password and confirm password match
        if (formData.phone.length !== 10) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                phoneWarning: "Phone number should be 10 digits",
            }));
            return; // Stop execution if the phone number length is not 10
        }
        // Reset the phoneWarning if the phone number length is valid
        setFormData((prevFormData) => ({
            ...prevFormData,
            phoneWarning: "",
        }));
        const accessToken = localStorage.getItem("authTokens");

        if (accessToken) {

            // get the access token
            const parsedTokens = JSON.parse(accessToken)

            if (parsedTokens) {

                // decoding the token so that I can get the user id
                const decodedToken = jwt_decode(accessToken);
                const userId = decodedToken.userId;

                // hitting the endpoint of getting the user's status of payment
                serverUrl.get(`/payments?id=${userId}`)
                    .then((res) => {
                      setTransactionId(res.data._id)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
        // Data to be sent to the backend
        const data = [{
            phone_number: formData.phone,
            amount: 50,
            innvoice:transactionId,
        }];
        serverUrl.post(`/raise-stk`,data)
        .then((res) => {
          console.log(res.data._id)
        })
        .catch((error) => {
            console.log(error);
        });




    }
    return (
        <div className='Payment'>
            <h1>KINDLY MAKE PAYMENTS SO THAT YOU CAN VIEW THE BLOGS</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <FormControl
                            name='phone'
                            placeholder='Enter Your Mobile Number Kindly'
                            type='number'
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <span>{digitCount}/10</span>
                        {formData.phoneWarning && <p className='text-danger'>{formData.phoneWarning}</p>}
                        <Button type='submit' className='btn btn-sm  bgBtn'>Done</Button>
                        <Link to='/' className='btn btn-sm  btn-warning text-white'>Skip</Link>
                    </Form>

                </Card.Body>
            </Card>
        </div>
    );
}

export default Payment;
