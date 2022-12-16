import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { createUserRoute } from "../services/axios";
import { ToastContainer, toast } from 'react-toastify';


export function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({});
  const [isUserSuccessfullyCreated, setIsUserSuccessfullyCreated] = useState(false);
  const [isUserCreatedError, setIsUserCreatedError] = useState(false);

  const onSubmitRegister = useCallback( async (e) => {
    try {
      e.preventDefault();
      const response = await createUserRoute(user)
      console.log(response)
      setIsUserSuccessfullyCreated(true);
      toast.success('Usuario creado correctamente', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    } catch (error) {
      setIsUserCreatedError(true);
      toast.error('Introduce los datos nuevamente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [user])
  console.log(user)

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/dashboard")
    }
  }, [])

  return (
    <>
      <NavbarComponent
        linkText={"/login"}
        text={"¿Tienes ya una cuenta? Inicia sesión"}
      />
      <Container>
        <Row className="text-center mt-4 mb-4">
          <h3>Regístrate y empieza a ahorrar</h3>
        </Row>

        <Form>
          <Row className="justify-content-center mb-3">
            <Col xs="10" md="5">
              <FloatingLabel controlId="floatingName" label="Nombre">
                <Form.Control type="text" placeholder="Nombre" onChange={(e) => setUser({...user, name: e.target.value})} 
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col xs="10" md="5">
              <FloatingLabel controlId="floatingUser" label="Usuario">
                <Form.Control type="text" placeholder="Usuario" onChange={(e) => setUser({...user, userName: e.target.value})}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col xs="10" md="5">
              <FloatingLabel controlId="floatingMobilePhone" label="Móvil">
                <Form.Control type="text" placeholder="Móvil" onChange={(e) => setUser({...user, tlfNumber: e.target.value})}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col xs="10" md="5">
              <FloatingLabel controlId="floatingInput" label="Email">
                <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setUser({...user, email: e.target.value})}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col xs="10" md="5">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(e) => setUser({...user, password: e.target.value})}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="text-center mt-4">
            <Col>
              <Button variant="primary" type="text" onClick={onSubmitRegister}>
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>
        {
          isUserCreatedError && (
            <ToastContainer/>
          )
          }
        {
          isUserSuccessfullyCreated && (
            <ToastContainer/>
          )
        }
      </Container>
    </>
  )
}

  
    

