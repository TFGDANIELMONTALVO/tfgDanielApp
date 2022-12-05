import { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CardGroups } from "../components/card.group.component";
import { NavbarComponent } from "../components/navbar.component";
import { getGroupsRoute } from "../services/axios";

export function GroupListMenu() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState();

  const onFetchGroups = useCallback(async () => {
    const responseGroups = await getGroupsRoute();
    setGroups(responseGroups.data);
  }, []);

  useEffect(() => {
    if(!localStorage.getItem("user")){
      navigate("/login")
    }
    onFetchGroups();

  }, []);
  return (
    <>
      <NavbarComponent/>

      <Card className="text-center" style={{ width: '100%', height: '5rem', background: 'linear-gradient(to right, rgba(0, 236, 255, 0.5), rgba(0, 50, 255, 0.5))' }} bg="primary">
        <Card.Body>
            <Card.Text className="mt-1" style={{color:"white"}}>
                <h3>Elige tu grupo y empieza a ahorrar</h3>
            </Card.Text>
        </Card.Body>
      </Card>

      {groups && groups.list? (
        groups.list.map((group, index) => (
          <Row className="mt-5 offset-1" key={[group.category, group.ownerId.name, group.numOfUsers, group.price]}>
            <Col md="4">
              <CardGroups 
              categoryGroup={group.category}
              nameUser={group.ownerId.name}
              maxNumUser={group.numOfUsers}
              priceGroup={group.price}
              groupId={group._id}/>
            </Col>
          </Row>
        ))
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
