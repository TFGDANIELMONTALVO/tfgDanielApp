import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { groupDetailRoute } from "../services/axios";
import netflix from "../images/netflix.png";
import netflixContent from "../images/neflix-content.jpg"

export function GroupDetail() {
  const [group, setGroup] = useState();
  const { id } = useParams();
  console.log(id);

  const onFetchGroup = useCallback(async () => {
    try {
      const response = await groupDetailRoute(id);
      setGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    onFetchGroup();
  }, []);
  console.log(group);

  return (
    <>
      <NavbarComponent />
      <Card className="bg-dark text-white" >
        <Card.Img style={{height: '5rem'}} src={netflixContent} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="text-center">Card title</Card.Title>
        </Card.ImgOverlay>
      </Card>

      {
        group && group.list?(
            group.list.map((g, index)=>{
                <div key={g.category}>
                    <h1>{g.category}</h1>
                </div>
            })
        ) : (
            <span>Cargando card...</span>
        )}
      {/* <Container>
        <Row>
          <Col md="2"></Col>
          <Row>
            <Col md="4">
              <h2>{group.category}</h2>
              <p>Grupo compartido de:</p>
              <h3>{group.ownerId.name}</h3>
            </Col>
            <Col md="4">
              <p>Accede al grupo para poder ver las credenciales</p>
              <br></br>
              <h3>Credenciales:</h3>
              <p>
                <u>Usuario: {group.serviceUser}</u>
              </p>
              <p>
                <u>Contraseña: {group.servicePassword}</u>
              </p>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <p>Fecha de creación: </p>
              <h3>{group.numOfUsers} usuarios máximos</h3>
            </Col>
            <Col md="4">
              <Card bg="light">
                <Card.Body>
                  <Card.Text>
                    <p>En grupo:</p>
                    <br></br>
                    <h3>{group.price}</h3>
                  </Card.Text>
                  <Button variant="primary" type="text">
                    Unirse al grupo
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container> */}
    
      
    </>
  );
}
