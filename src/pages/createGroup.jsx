import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { createGroupRoute } from "../services/axios";
import { ToastContainer, toast } from "react-toastify";

export function CreateGroup() {
  const navigate = useNavigate();
  const [group, setGroup] = useState({ ownerId: localStorage.getItem("user") });
  const [isGroupSuccessfullyCreated, setIsGroupSuccessfullyCreated] =
    useState(false);
  const [isGroupCreatedError, setIsGroupCreatedError] = useState(false);

  const onSubmitCreateGroup = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const response = await createGroupRoute(group);
        console.log(response);
        setIsGroupSuccessfullyCreated(true);
        toast.success("Grupo creado correctamente", {
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
          navigate("/my-groups");
        }, 3000);
      } catch (error) {
        console.log(error);
        setIsGroupCreatedError(true);
        toast.error("Introduce los datos nuevamente", {
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
    },
    [group]
  );
  console.log(group);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <NavbarComponent />

      <Container>
        <Row className="text-center mt-4 mb-4">
          <h3>Crea un grupo</h3>
        </Row>

        <Form>
          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel
                controlId="floatingSelect"
                label="Plataforma de streaming a compartir"
              >
                <Form.Select
                  onChange={(e) =>
                    setGroup({ ...group, category: e.target.value })
                  }
                >
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
              <FloatingLabel
                controlId="floatingUser"
                label="Email usado en la plataforma de streaming"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setGroup({ ...group, serviceUser: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel
                controlId="floatingUser"
                label="Contraseña usada en la plataforma de streaming"
              >
                <Form.Control
                  type="text"
                  placeholder="Contraseña"
                  onChange={(e) =>
                    setGroup({ ...group, servicePassword: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel label="Nº max de usuarios">
                <Form.Select
                  onChange={(e) =>
                    setGroup({ ...group, numOfUsers: e.target.value })
                  }
                >
                  <option>
                    Selecciona el número máximo de personas en tu grupo
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Select>
              </FloatingLabel>
              <Form.Text className="text-muted">
                Legalmente solo puedes compartir hasta un número máximo indicado arriba, por lo que si ya tienes gente usando el servicio no se puede exceder el límite.
              </Form.Text>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel controlId="floatingMobilePhone" label="Precio">
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  onChange={(e) =>
                    setGroup({ ...group, price: e.target.value })
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="text-center mt-4 mb-5">
            <Col>
              <Button
                variant="primary"
                type="text"
                onClick={onSubmitCreateGroup}
              >
                Crear Grupo
              </Button>
            </Col>
          </Row>
        </Form>
        {isGroupCreatedError && <ToastContainer />}
        {isGroupSuccessfullyCreated && <ToastContainer />}
      </Container>
    </>
  );
}
