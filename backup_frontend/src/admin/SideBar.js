import React from 'react'
import './SiderBar.scss'
import {  NavLink, Navbar, Nav } from 'react-bootstrap'

function SideBar() {
  return (
    <div className='sideBar'>
      <Navbar className="Logo">
        <button className="btn sidebar-toggle navbar-toggler-icon me-3 ms-3"

        ></button>
        <Navbar.Brand href="#home">BLOG NAME</Navbar.Brand>
      </Navbar>
      <div >
        <Nav className="flex-column">
          <Nav.Link as={NavLink} to="/dashboard" href="/dashboard">
            <i className="bi bi-house"></i>
            Dashboard
          </Nav.Link>

          <Nav.Link as={NavLink} to="/report" href="/reports">
            <i className="bi bi-arrow-repeat"></i>
            Reports
          </Nav.Link>

          <Nav.Link as={NavLink} to="/" href="/users">
            <i className="bi bi-person-lines-fill"></i>
             Users
          </Nav.Link>

          <Nav.Link as={NavLink} to="/" href="/blogs">
            <i className="bi bi-book"></i>
            Blogs
          </Nav.Link>
        </Nav>
      </div>
    </div>
  )
}

export default SideBar