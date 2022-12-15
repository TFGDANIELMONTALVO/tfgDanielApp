import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { NavbarComponent } from "../components/navbar.component";
import { getPayments } from "../services/axios";
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";

export function Wallet() {
  const navigate = useNavigate()
  const [payments, setPayments] = useState();
  const id = localStorage.getItem("user");

  const onFetchPayments = useCallback(async () => {
    const response = await getPayments(id);
    setPayments(response.data);
    Object.values(response.data.completedPayments).map((completedPayment) => {
      completedPayment.map((payment) => {
        console.log(payment);
      });
    });
  }, []);

  const isNoMoney = useCallback (() => {
    return Boolean(payments.totalAmountCompleted === 0)
  }, [payments])

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    onFetchPayments();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Card
        className="text-center rounded-0"
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
            <h3>Wallet</h3>
          </Card.Text>
        </Card.Body>
      </Card>

      <Container>
        <Row className="mt-3 justify-content-center">
          <Col md="3" className="text-center">
            {payments && (
              <Card className="shadow" key={payments.totalAmountCompleted}>
                <Card.Body>
                  <Card.Title>
                    <p>Dinero disponible:</p>
                  </Card.Title>
                  <Card.Text>
                    <h1>{payments.totalAmountCompleted}€</h1>
                  </Card.Text>
                  {isNoMoney() ? <Button disabled>Retirar</Button> : <Button >Retirar</Button>}
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md="6">
            <Card className="shadow">
              <Card.Body>
                  {payments &&
                    payments.completedPayments &&
                    Object.values(payments.completedPayments).map((item) =>
                      item.map((payment) => (
                        <Card.Text key={[payment.groupId.category, payment.emiterUserId.name, payment.status]}>
                            <Stack direction="horizontal" gap={2}>
                                <p className="me-auto">Cuota <b>{payment.emiterUserId.name}</b> del grupo <b>{payment.groupId.category}</b></p>
                                <p><b>+{payment.quantity}€</b></p>
                            </Stack>
                            <i>{payment.status}</i>
                            <p>{format(new Date(payment.createdAt), "dd-MM-yyyy")}</p>
                            <hr className="hr"/>
                        </Card.Text>
                      ))
                    )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
