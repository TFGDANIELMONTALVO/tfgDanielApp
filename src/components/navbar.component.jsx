import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userDetailRoute } from "../services/axios";
import share from "../images/Share.png";

export function NavbarComponent({text, linkText}) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const id = localStorage.getItem("user")

  const onFetchUser = useCallback(async() => {
    const response = await userDetailRoute(id)
    setUser(response.data)
  }, [user])

  const onClickLogout = () => {
    localStorage.removeItem("user")
    navigate("/");
  }

  const onClickCreateGroup = () => {
    navigate("/create-group")
  }

  useEffect(()=>{
    !user && onFetchUser()
  }, [user])

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
                user && (
                  <Button className="rounded-pill" variant="primary" onClick={onClickCreateGroup}><b >+</b> Crear un grupo</Button>
                )
              }
              {
                user && (
                  <Nav.Link href="/my-groups">Mis grupos y pagos</Nav.Link>
                )
              }
              {
                !user && (
                  <Nav.Link href={linkText}>{text}</Nav.Link>
                )
              }
              {
                user &&(
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
