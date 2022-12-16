import React, { useCallback, useEffect, useState } from "react";
import { Alert, Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CardGroups } from "../components/card.group.component";
import { NavbarComponent } from "../components/navbar.component";
import { userDetailRoute } from "../services/axios";
import _ from "lodash";

export function MyGroups() {
  const navigate = useNavigate();
  const [user, setGroups] = useState();
  const id = localStorage.getItem("user");

  const onFetchGroups = useCallback(async () => {
    try {
      const response = await userDetailRoute(id);
      setGroups(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    onFetchGroups();
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
            <h3>Mis grupos y pagos</h3>
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="offset-1 mt-5">
        <h4>Grupos en los que eres el Administrador:</h4>
      </Row>

      <Row className="p-2">
        {user && user.ownerGroups && (_.isEmpty(user.ownerGroups) ? <Alert variant="secondary">Aquí aparecerán los grupos que hayas creado</Alert> : null)}
        {user && user.ownerGroups ? (
          user.ownerGroups.map((group, index) => (
            <Col
              md="4"
              className="my-3"
              key={[
                group.category,
                user.name,
                group.users.length,
                group.numOfUsers,
                group.price,
              ]}
            >
              <CardGroups
                categoryGroup={group.category}
                nameUser={user.name}
                maxNumUser={group.numOfUsers}
                usersInGroup={group.users.length}
                priceGroup={group.price}
                groupId={group._id}
              />
            </Col>
          ))
        ) : (
          <span>Cargando cards...</span>
        )}
      </Row>

      <Row className="offset-1 mt-5">
        <h4>Grupos en los que eres un Miembro:</h4>
      </Row>

      <Row className="p-2">
        {user && user.suscribedGroups && (_.isEmpty(user.suscribedGroups) ? <Alert variant="secondary">Aquí aparecerán los grupos a los que te hayas unido</Alert> : null)}
        {user && user.suscribedGroups ? (
          user.suscribedGroups.map((group, index) => (
            <Col
              md="4"
              className="my-3"
              key={[
                group.category,
                group.users.length,
                group.ownerId.name,
                group.numOfUsers,
                group.price,
              ]}
            >
              <CardGroups
                categoryGroup={group.category}
                nameUser={group.ownerId.name}
                maxNumUser={group.numOfUsers}
                usersInGroup={group.users.length}
                priceGroup={group.price}
                groupId={group._id}
              />
            </Col>
          ))
        ) : (
          <span>Cargando cards...</span>
        )}
      </Row>
    </>
  );
}
