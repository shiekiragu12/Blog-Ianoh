import React,{useState,useEffect} from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import './Profile.scss'
import { Link } from 'react-router-dom'

import jwt_decode from "jwt-decode";
import { serverUrl } from "../ServerUrl";
import User from '../assets/user.png'


function Profile() {
    // get the user details the username
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [since, setCreated] = useState(new Date().toLocaleDateString())
    const [image, setImage] = useState("")


    // from the localstorage get the logged in user
    useEffect(() => {
        const accessToken = localStorage.getItem("authTokens");

        // get the access token
        const parsedTokens = JSON.parse(accessToken);
        const access = parsedTokens.access;


        // headers access token
        const config = {
            headers: { Authorization: `Bearer ${access}` }
        }
        // decoding the token so that i can get the user id
        const decodedToken = jwt_decode(accessToken);
        const userId = decodedToken.userId;
        // hitting the endpoint of getting the user's details
        serverUrl.get(`/user/${userId}/`)
            .then((res) => {
                // get the fullname of the user
                setFullName(res.data.full_name);
                setRole(res.data.role);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setCreated(res.data.createdAt);
                setImage(res.data.image);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <Link to='/' className='profile'>{fullName} Blogs</Link>
            <Container>

                <Row>


                    <Col lg={12} md={4} sm={5}>
                        <Card className='card-style1 border-0'>
                            <Card.Body className=' p-1-9 p-sm-2-3 p-md-6 p-lg-7'>
                                <Row className='align-items-center'>

                                    <Col lg={6} md={4} sm={4}>
                                        <Image src={User} alt="..."></Image>
                                    </Col>

                                    <Col lg={6} className='px-xl-10'>
                                        <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded p-2">
                                            <h3 className="h2 text-white mb-0">{fullName}</h3>
                                            <span className="text-primary">{role}</span>
                                        </div>
                                        <ul className="list-unstyled mb-1-9">
                                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Role</span> {role}</li>
                                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Joined Since:</span> {new Date(since).toLocaleDateString()}</li>
                                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {email}</li>
                                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Website:</span> www.example.com</li>
                                            <li className="display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone:</span> {phone}</li>
                                        </ul>
                                        <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                                            <li><a href="#!"><i className="ti-twitter-alt"></i></a></li>
                                            <li><a href="#!"><i className="ti-facebook"></i></a></li>
                                            <li><a href="#!"><i className="ti-pinterest"></i></a></li>
                                            <li><a href="#!"><i className="ti-instagram"></i></a></li>
                                        </ul>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col lg={12} md={4} sm={4}>
                        <div>
                            <span className="section-title text-primary mb-3 mb-sm-4">About Me</span>
                            <p>Edith is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Profile