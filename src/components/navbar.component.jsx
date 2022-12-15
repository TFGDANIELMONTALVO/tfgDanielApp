import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userDetailRoute } from "../services/axios";
import share from "../images/Share.png";

export function NavbarComponent({text, linkText}) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const id = localStorage.getItem("user")

  const onFetchUser = useCallback(async() => {
    const response = await userDetailRoute(id)
    setUser(response.data)
  })

  const onClickLogout = () => {
    localStorage.removeItem("user")
    navigate("/");
  }

  const onClickCreateGroup = () => {
    navigate("/create-group")
  }

  useEffect(()=>{
    onFetchUser()
  })

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={share}
              width="140"
              height="30"
              className="d-inline-block align-top"
            />{" "} 
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {
                localStorage.getItem("user") && (
                  <Button className="rounded-pill" variant="primary" onClick={onClickCreateGroup}><b >+</b> Crear un grupo</Button>
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
                localStorage.getItem("user") && user &&(
                  <NavDropdown key={user.userName} title={user.userName}>
                    <NavDropdown.Item href="settings">Ajustes</NavDropdown.Item>
                    <NavDropdown.Item href="wallet">Wallet</NavDropdown.Item>
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
