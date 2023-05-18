import React from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { Form, FormControl } from 'react-bootstrap';


function Header() {
  return (
    <div className='header'>
      <div className='navigation'>
        <Link className='fw-bold text-uppercase' to="/">User Blog</Link>
        <div className='authenticator'>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
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