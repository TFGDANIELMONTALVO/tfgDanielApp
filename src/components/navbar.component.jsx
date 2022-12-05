import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function NavbarComponent({text, linkText}) {
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("user")
    navigate("/");
  }

  const onClickCreateGroup = () => {
    navigate("/create-group")
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            ShareIT
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {
                localStorage.getItem("user") && (
                  <Button variant="primary" onClick={onClickCreateGroup}>+ Crear un grupo</Button>
                )
              }
              {
                localStorage.getItem("user") && (
                  <Nav.Link href="/my-groups">Mis grupos y pagos</Nav.Link>
                )
              }
              {
                !localStorage.getItem("user") && (
                  <Nav.Link href={linkText}>{text}</Nav.Link>
                )
              }
              {
                localStorage.getItem("user") && (
                  <NavDropdown title="Usuario" id="basic-nav-dropdown">
                    <NavDropdown.Item href="settings">Ajustes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onClickLogout}>Cerrar sesión</NavDropdown.Item>
                  </NavDropdown>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
