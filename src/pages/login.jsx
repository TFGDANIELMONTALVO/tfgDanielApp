import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { userLogin } from "../services/axios";

export function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const login = useCallback(async (e) => {
    try {
      console.log(email, password)
      e.preventDefault();
      const response = await userLogin(email, password);
      localStorage.setItem("user", response.data._id);
      navigate("/dashboard")
    } catch (error) {
      
    }
  }, [email, password])

  const onClickRegister = () => {
    navigate("/register")
  };

  //cerrar sesión:
  //localStorage.removeItem("user")

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/dashboard")
    }
  }, [])

  return (
    <>
      <NavbarComponent/>
      <Container>
        <Row className="text-center mt-4">
          <h3>Regístrate</h3>
        </Row>

        <Row className="text-center mt-4">
          <Col>
            <Button variant="primary" onClick={onClickRegister}>Ir a registrarse</Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="7"><Card className="mt-5" bg="black"></Card></Col>
        </Row>
        

        <Row className="text-center mt-5">
          <h3>O inicia sesión</h3>
        </Row>

        <Form>
        <Row className="justify-content-center mt-4 mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingInput" label="Email">
                  <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
  
            <Row className="justify-content-center mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
            </Row>
        </Form>

        <Row className="text-center mt-5">
            <Col>
              <Button variant="primary" type="text" onClick={login}>
                Iniciar sesión
              </Button>
            </Col>
          </Row>
      </Container>
    </>
  );
}
