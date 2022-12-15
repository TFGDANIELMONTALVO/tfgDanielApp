import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
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
            <h3>Elige tu grupo y empieza a ahorrar</h3>
          </Card.Text>
        </Card.Body>
      </Card>

      <Col className="text-center m-4">
        <Button className="m-2" onClick={() => setFilter(undefined)}>
          Todos
        </Button>
        <Button className="m-2 border-0" style={{background: "rgb(2,0,36)", background: "linear-gradient(90deg, rgba(14,9,121,1) 0%, rgba(0,53,255,1) 100%)"}} onClick={() => setFilter("Disney+")}>
          Disney+
        </Button>
        <Button className="m-2 border-0" style={{background: "rgb(2,0,36)", background: "linear-gradient(90deg, rgba(121,9,9,1) 0%, rgba(255,0,0,1) 100%)"}} onClick={() => setFilter("Netflix Premium")}>
          Netflix
        </Button>
        <Button className="m-2 border-0" style={{background: "rgb(95,9,121)", background: "linear-gradient(90deg, rgba(95,9,121,1) 0%, rgba(123,0,255,1) 100%)"}} onClick={() => setFilter("HBOmax")}>
          HBOmax
        </Button>
      </Col>

      <Row className="p-2">
        {groups && groups.list ? (
          groups.list.map((group, index) => (
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
          <Row className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </Row>
        )}
      </Row>
    </>
  );
}
