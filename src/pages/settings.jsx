import React from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbar.component";

export function Settings() {
  return (
    <>
      <NavbarComponent />
      <Container>
        <Form>
          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel controlId="floatingName" label="Nombre">
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  //onChange={(e) => setUser({ ...user, name: e.target.value })}
                  disabled
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel controlId="floatingUser" label="Usuario">
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  //onChange={(e) => setUser({ ...user, userName: e.target.value })}
                  disabled
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel controlId="floatingMobilePhone" label="Móvil">
                <Form.Control
                  type="text"
                  placeholder="Móvil"
                  //onChange={(e) => setUser({ ...user, tlfNumber: e.target.value })}
                  disabled
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel controlId="floatingInput" label="Email">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  //onChange={(e) => setUser({ ...user, email: e.target.value })}
                  disabled
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col md="5">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  //onChange={(e) => setUser({ ...user, password: e.target.value })}
                  disabled
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="text-center mt-4">
            <Col>
              <Button variant="primary" type="text" //onClick={onSubmitRegister}
              >
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
