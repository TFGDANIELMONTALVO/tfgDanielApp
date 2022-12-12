import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CardGroups } from "../components/card.group.component";
import { NavbarComponent } from "../components/navbar.component";
import { getGroupsRoute } from "../services/axios";

export function GroupListMenu() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState();
  const [filter, setFilter] = useState();
  const id = localStorage.getItem("user");

  const onFetchGroups = useCallback(async () => {
    const responseGroups = await getGroupsRoute(id, filter);
    setGroups(responseGroups.data);
  }, [filter]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    onFetchGroups();
  }, [filter]);
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
            <h3>Elige tu grupo y empieza a ahorrar</h3>
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="justify-content-center text-center mt-5">
        <Col xs="3" md="1">
          <Button onClick={() => setFilter(undefined)}>Todos</Button>
        </Col>
        <Col xs="3" md="1">
          <Button onClick={() => setFilter("Disney+")}>Disney+</Button>
        </Col>
        <Col xs="3" md="1">
          <Button onClick={() => setFilter("Netflix Premium")}>Netflix</Button>
        </Col>
        <Col xs="3" md="1">
          <Button onClick={() => setFilter("HBOmax")}>HBOmax</Button>
        </Col>
      </Row>

      {groups && groups.list ? (
        groups.list.map((group, index) => (
          <Row
            className="mt-5"
            key={[
              group.category,
              group.users.length,
              group.ownerId.name,
              group.numOfUsers,
              group.price,
            ]}
          >
            <Col md="4">
              <CardGroups
                categoryGroup={group.category}
                nameUser={group.ownerId.name}
                maxNumUser={group.numOfUsers}
                usersInGroup={group.users.length}
                priceGroup={group.price}
                groupId={group._id}
              />
            </Col>
          </Row>
        ))
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
