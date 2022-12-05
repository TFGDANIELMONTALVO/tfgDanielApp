import React, { useCallback, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { createGroupRoute } from "../services/axios";
import { ToastContainer, toast } from 'react-toastify';

export function CreateGroup(){
  const navigate = useNavigate()
  const [group, setGroup] = useState({ownerId: localStorage.getItem("user")});
  const [isGroupSuccessfullyCreated, setIsGroupSuccessfullyCreated] = useState(false);
  const [isGroupCreatedError, setIsGroupCreatedError] = useState(false);

  const onSubmitCreateGroup = useCallback( async (e) => {
    try {
      e.preventDefault();
      const response = await createGroupRoute(group)
      console.log(response)
      setIsGroupSuccessfullyCreated(true)
      toast.success('Grupo creado correctamente', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(()=>{
        navigate("/my-groups")
      },3000)
    } catch (error) {
      console.log(error)
      setIsGroupCreatedError(true)
      toast.error('Ha habido un problema', {
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
  },[group])
  console.log(group)

  return(
    <>
      <NavbarComponent/>

        <Container>
          <Row className="text-center mt-4 mb-4">
            <h3>Crea un grupo</h3>
          </Row>
  
          <Form>
            <Row className="justify-content-center mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingSelect" label="Plataforma de streaming a compartir">
                  <Form.Select onChange={(e) => setGroup({...group, category: e.target.value})}>
                    <option>Selecciona la plataforma</option>
                    <option value="Disney+">Disney+</option>
                    <option value="Netflix Premium">Netflix Premium</option>
                    <option value="HBOmax">HBOmax</option>
                  </Form.Select> 
                </FloatingLabel> 
              </Col>
            </Row>
  
            <Row className="justify-content-center mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingUser" label="Usuario del servicio">
                  <Form.Control type="text" placeholder="Usuario" onChange={(e) => setGroup({...group, serviceUser: e.target.value})}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="justify-content-center mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingUser" label="Contraseña del servicio">
                  <Form.Control type="text" placeholder="Contraseña" onChange={(e) => setGroup({...group, servicePassword: e.target.value})}
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="justify-content-center mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingMobilePhone" label="Precio">
                  <Form.Control type="number" placeholder="Precio" onChange={(e) => setGroup({...group, price: e.target.value})} 
                  />
                </FloatingLabel>
              </Col>
            </Row>
  
            <Row className="justify-content-center mb-3">
              <Col md="5">
                <FloatingLabel controlId="floatingInput" label="Nº max de usuarios">
                  <Form.Control type="number" placeholder="MAX" onChange={(e) => setGroup({...group, numOfUsers: e.target.value})}/>
                </FloatingLabel>
              </Col>
            </Row>
  
            <Row className="text-center mt-4">
              <Col>
                <Button variant="primary" type="text" onClick={onSubmitCreateGroup}>
                    Crear Grupo
                </Button>
              </Col>
            </Row>
          </Form>
          {
          isGroupCreatedError && (
            <ToastContainer/>
          )
          }
        {
          isGroupSuccessfullyCreated && (
            <ToastContainer/>
          )
        }
        </Container>
    </>
  )
}