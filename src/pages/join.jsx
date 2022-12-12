import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { groupDetailRoute, joinGroup } from "../services/axios";
import { ToastContainer, toast } from 'react-toastify';

export function Join(){
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = localStorage.getItem("user");
    const [group, setGroup] = useState();
    const [isPaymentSuccessfullyCreated, setIsPaymentSuccessfullyCreated] = useState(false);



    const onFetchGroup = useCallback(async () => {
        try {
          const response = await groupDetailRoute(id);
          setGroup(response.data);
        } catch (error) {
          console.log(error);
        }
    }, []);

    const onClickJoinGroup = useCallback(async () => {
        try {
            await joinGroup(id, userId);
            setIsPaymentSuccessfullyCreated(true);
            toast.success('Pago realizado correctamente', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                navigate("/my-groups");
            }, 4000);

        } catch (error) {
           console.log(error) 
        }
    }, [])

    useEffect(()=>{
        onFetchGroup()
    }, [])

    return(
        <>
           <NavbarComponent/>
           <Container>
           <Row className="mt-5 mb-5">
                <h2>Acceso al grupo</h2>
            </Row>
            {
                group ? (
                    <Row key={[group.category, group.price]}>
                        <Col md="6">
                            <Row className="mb-2">
                                <h5>Añadir tarjeta</h5>
                            </Row>
                            <Form>
                                <FloatingLabel label="Número de la tarjeta">
                                    <Form.Control type="text" placeholder="Número de la tarjeta" />
                                </FloatingLabel>
                                <Row className="mt-3">
                                    <Col md="8">
                                        <FloatingLabel label="Fecha de expiración">
                                            <Form.Control type="date" placeholder="Fecha de expiración" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md="4">
                                        <FloatingLabel label="CVV">
                                            <Form.Control type="text" placeholder="CVV" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col md="6">
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Text className="mb-4">
                                        <h3>{group.category}</h3>
                                    </Card.Text>
                                    <Card.Text>
                                        <a>Producto:</a>
                                        <p><b>{group.category} (1 mes - pago recurrente)</b></p>
                                        <hr className="hr"/>
                                        <Stack direction="horizontal" gap={2}>
                                            <p className="me-auto"><b>Total</b></p>
                                            <p><b>{group.price}€</b></p>
                                        </Stack>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <span/>
                )}

            <Row className="text-center mt-5">
                <Col>
                    <Button onClick={onClickJoinGroup}>Acceder al grupo</Button>
                </Col>
            </Row>

            {
                isPaymentSuccessfullyCreated && (
                    <ToastContainer/>
                )
            }

           </Container>
        </>
    )
}