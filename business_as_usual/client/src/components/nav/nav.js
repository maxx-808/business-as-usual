import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./nav.css";
export default class Navigation extends Component {
  render() {
    return (
      <div>
        <>
          <Navbar className="nav" bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link className="navLink" href="#home">
                <strong>C&K Kitchen</strong>
              </Nav.Link>
              <Nav.Link className="navLink" href="#home">
                Home
              </Nav.Link>
              <Nav.Link className="navLink" href="#features">
                Shop
              </Nav.Link>
              <Nav.Link className="navLink" href="#about">
                About the Company
              </Nav.Link>
              <Nav.Link className="navLink" href="#contact">
                Contact
              </Nav.Link>
            </Nav>
            <Form inline className="nav">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
            <Nav className="mr-atuo nav">
              <Nav.Link className="navLink" href="/account">
                Account
              </Nav.Link>
              <Nav.Link className="navLink" id="logInOut" href="">
                Login
              </Nav.Link>
            </Nav>
          </Navbar>
        </>
      </div>
    );
  }
}
