import React, { useCallback } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import disney from "../images/disney.png";
import netflix from "../images/netflix.png";
import hbo from "../images/hbo.png";
import { useNavigate } from "react-router-dom";

export function CardGroups({
  categoryGroup,
  nameUser,
  usersInGroup,
  maxNumUser,
  priceGroup,
  groupId,
}) {
  const navigate = useNavigate();

  const onNavigateGroupDetail = useCallback(() => {
    navigate(`/group/${groupId}`);
  }, [groupId]);

  const serviceImages = useCallback(() => {
    switch (categoryGroup) {
      case "Disney+":
        return disney;
        break;

      case "Netflix Premium":
        return netflix;
        break;

      default:
        return hbo;
        break;
    }
  }, [categoryGroup]);

  const usersInGroupCounter = useCallback(() => {
    return maxNumUser - usersInGroup + "/" + maxNumUser + " sitios disponibles";
  }, []);

  const isGroupComplete = useCallback (() => {
    return usersInGroup === maxNumUser;
  }, [])

  return (
    <>
      <Container>
        <Card bg="light" className="offset-1">
          <Row>
            <Col xs="3" md="4" className="offset-1 mt-4">
              <Card.Img src={serviceImages()} />
            </Col>
            <Col xs="4" md="6" className="offset-1 mt-3">
              <Card.Text>
                <h5>
                  <b>{categoryGroup}</b>
                </h5>
                <p>
                  Grupo compartido de: <b>{nameUser}</b>
                </p>
                <p>
                  <b>{isGroupComplete() ? "Grupo completo" : usersInGroupCounter()}</b>
                </p>
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs="3" md="4" className="offset-1 mb-2">
              <Card.Text>
                <a>En grupo:</a>
                <h3>{priceGroup}€</h3>
              </Card.Text>
            </Col>
            <Col xs="4" md="6" className="text-center mt-2">
              <Button type="text" onClick={onNavigateGroupDetail}>
                Ver grupo
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
