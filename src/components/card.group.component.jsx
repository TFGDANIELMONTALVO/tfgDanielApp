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

  const isGroupComplete = useCallback(() => {
    return usersInGroup === maxNumUser;
  }, []);

  return (
    <>
      <Container>
        <Card className="shadow p-4 flex-row">
          <Col xs="2" md="4" lg="4" className="d-flex flex-column">
            <Card.Img src={serviceImages()} />
            <Card.Text className="mt-3">
              <a>En grupo:</a>
              <h3>{priceGroup}€</h3>
            </Card.Text>
          </Col>
          <Col xs="8" md="8" lg="8" className=" ps-5 d-flex flex-column">
            <Card.Text className="p-0 m-0">
              <h5>
                <b>{categoryGroup}</b>
              </h5>
              <p>
                Grupo compartido de: <b>{nameUser}</b>
              </p>
              <p>
                <b>
                  {isGroupComplete() ? "Grupo completo" : usersInGroupCounter()}
                </b>
              </p>
            </Card.Text>
            <Button type="text" onClick={onNavigateGroupDetail}>
              Ver grupo
            </Button>
          </Col>
        </Card>
      </Container>
    </>
  );
}
