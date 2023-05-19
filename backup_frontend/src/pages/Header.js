import React, { useState, useEffect } from 'react'
import './Header.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Form, FormControl, Image, Dropdown, DropdownButton } from 'react-bootstrap';
import Influencer from '../assets/user.png'
import { toast } from "react-toastify";

// auth imports
import jwt_decode from "jwt-decode";
import { serverUrl } from "../ServerUrl";

function Header() {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('authTokens') !== null;
  const handleLogout = () => {
    // Clear the tokens from local storage and redirect to the login page
    localStorage.removeItem("authTokens");
    toast.success('Successfull logged out !')
    navigate("/login");

  }

  // get the user details the username
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("")

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
        setImage(res.data.image);
        setRole(res.data.role);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className='header'>
      <div className='navigation'>
        {isAuthenticated ?
          <>
            <Link className='fw-bold text-uppercase' to="/">{fullName} Blog</Link>
            <div className='authenticator'>
              <Image src={Influencer}></Image>
              <DropdownButton id="dropdown-basic-button" title={fullName}>
                {role === "Admin" ?
                  <Dropdown.Item href="/dashboard">Admin Dashboard</Dropdown.Item>

                  :
                  <></>
                }
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
              </DropdownButton>
            </div>
          </>

          :
          <>
            <Link className='fw-bold text-uppercase' to="/">News Blog</Link>
            <div className='authenticator'>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </>

        }


      </div>
      <div className='searchBarFilter'>
        <Form className="d-flex">
          <FormControl type="text" placeholder="Search" className="me-2" />
        </Form>
        <div className='filterSelects'>
          <Form.Select>
            <option value="">Latest Blog</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Form.Select>
          <Form.Select>
            <option value="">Top Rated</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Form.Select>
          <Form.Select>
            <option value="">By Tag</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Form.Select>
        </div>

      </div>
    </div>
  )
}

export default Header