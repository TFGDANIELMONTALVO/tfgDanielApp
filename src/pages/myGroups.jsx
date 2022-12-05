import React from "react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import { CardGroups } from "../components/card.group.component";
import { NavbarComponent } from "../components/navbar.component";

export function MyGroups(){
    return(
        <>
            <NavbarComponent/>

            <Card className="text-center" style={{ width: '100%', height: '5rem', background: 'linear-gradient(to right, rgba(0, 236, 255, 0.5), rgba(0, 50, 255, 0.5))' }} bg="primary">
                <Card.Body>
                    <Card.Text className="mt-1" style={{color:"white"}}>
                        <h3>Mis grupos y pagos</h3>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Container>
            <Row>
                <Col className="mt-5 mb-5">
                    <h4>Grupos en los que eres el Administrador:</h4>
                </Col>
            </Row>   

            <Row>
                <Col>
                    <CardGroups/>
                </Col>
                <Col md="4">
                    <Card>
                        <Card.Text>
                            <h3>Grupo</h3>
                        </Card.Text>
                    </Card>
                </Col>
                <Col className="text-center" md="4">
                    <Card>
                        <Card.Text>
                            <h3>+</h3>
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="mt-5">
                    <h4>Grupos en los que eres un Miembro:</h4>
                </Col>
            </Row>
            </Container>
        </>
    )
}