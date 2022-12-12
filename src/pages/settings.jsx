import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { deleteUserRoute, updateUserRoute, userDetailRoute } from "../services/axios";
import { ToastContainer, toast } from 'react-toastify';

export function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userUpdated, setUserUpdated] = useState();
  const [isUserSuccessfullyUpdated, setIsUserSuccessfullyUpdated] = useState(false);
  const [isUserUpdatedError, setIsUserUpdatedError] = useState(false);

  const id = localStorage.getItem("user");

  const onSubmitUserUpdate = useCallback(async (e) => {
    try {
      const response = await updateUserRoute(id, userUpdated)
      console.log(response)
      setIsUserSuccessfullyUpdated(true)
      toast.success('Usuario actualizado correctamente', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
      }, 6000);
    } catch (error) {
      setIsUserUpdatedError(true)
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
      console.log(error);
    }
  }, [userUpdated])
  console.log(userUpdated)

  const onFetchUser = useCallback(async () => {
    try {
      const response = await userDetailRoute(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickDeleteUser = useCallback(async () => {
    try {
      await deleteUserRoute(id);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    onFetchUser();
  }, []);

  console.log(user);
  return (
    <>
      <NavbarComponent />
      <Card
        className="text-center"
        style={{
          width: "100%",
          height: "5rem",
          background:
            "linear-gradient(to right, rgba(0, 236, 255, 0.5), rgba(0, 50, 255, 0.5))",
        }}
        bg="primary"
      >
        <Card.Body>
          <Card.Text className="mt-1" style={{ color: "white" }}>
            <h3>Datos personales</h3>
          </Card.Text>
        </Card.Body>
      </Card>
      <Container>
        <Card bg="light" className="mt-4">
          <Card.Body className="justify-content-center">
            <Form>
            <Card.Text>
              {user ? (
                <Row
                  className=" mt-2 justify-content-center"
                  key={[
                    user.name,
                    user.userName,
                    user.tlfNumber,
                    user.email,
                    user.password,
                  ]}
                > 
                  <Col xs="4" md="4">
                    <Form.Group className="mb-4">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" placeholder={user.name} onChange={(e) => setUserUpdated({...userUpdated, name: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control type="text" placeholder={user.userName}  onChange={(e) => setUserUpdated({...userUpdated, userName: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Móvil</Form.Label>
                      <Form.Control type="number" placeholder={user.tlfNumber}  onChange={(e) => setUserUpdated({...userUpdated, tlfNumber: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder={user.email}  onChange={(e) => setUserUpdated({...userUpdated, email: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder={user.password}  onChange={(e) => setUserUpdated({...userUpdated, password: e.target.value})}/>
                    </Form.Group>
                  </Col>
                </Row>
              ) : (
                <span/>
              )}
            </Card.Text>
            <Button variant="secondary" type="text" onClick={onSubmitUserUpdate}>Actualizar</Button>
            </Form>
          </Card.Body>
        </Card>
        <Row className="mt-5 mb-5 justify-content-center text-center">
          <Col md="2" >
            <Button variant="danger" onClick={onClickDeleteUser}  >
              Borrar cuenta
            </Button>
          </Col>
        </Row>
        {
          isUserUpdatedError && (
            <ToastContainer/>
          )
          }
        {
          isUserSuccessfullyUpdated && (
            <ToastContainer/>
          )
        }
      </Container>
    </>
  );
}
