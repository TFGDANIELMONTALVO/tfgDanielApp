import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbar.component";

export function NotFound(){
    return (
        <>
            <NavbarComponent/>
            <Row className="justify-content-center text-center m-5">
                <Col className="align-items-center p-5">
                    <h1 className="text-primary">404</h1>
                    <h4 className="text-primary">¡Ups!, parece que te has perdido. Prueba de nuevo</h4>
                    <Button className="mt-5" href="/">Ir a home</Button>
                </Col>
            </Row>
        </>
    )
}