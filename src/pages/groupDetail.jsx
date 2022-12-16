import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarComponent } from "../components/navbar.component";
import { exitGroup, groupDetailRoute } from "../services/axios";
import { AdminGroupPanelControl } from "../components/adminGroupPanelControl.component";
import { format } from "date-fns";
import { ModalWindow } from "../components/modal.window.component";

export function GroupDetail() {
  const [group, setGroup] = useState();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("user");
  console.log(id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isUserInGroup = useCallback(() => {
    return group.users.some(
      (user) => user._id.toString() === userId.toString()
    );
  }, [group]);

  const isAdminGroup = useCallback(() => {
    return Boolean(group.ownerId._id.toString() === userId.toString());
  }, [group]);

  const isGroupComplete = useCallback(() => {
    return group.users.length === group.numOfUsers;
  }, [group]);

  const usersInGroup = useCallback(() => {
    return (
      group.numOfUsers -
      group.users.length +
      "/" +
      group.numOfUsers +
      " sitios disponibles"
    );
  }, [group]);

  const platformColors = useCallback(() => {
    switch (group.category) {
      case "Disney+":
        return {
          width: "100%",
          height: "5rem",
          background:
            "linear-gradient(90deg, rgba(0,57,255,1) 0%, rgba(9,13,121,1) 100%)",
        };
        break;

      case "Netflix Premium":
        return {
          width: "100%",
          height: "5rem",
          background:
            "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(121,9,9,1) 100%)",
        };
        break;

      default:
        return {
          width: "100%",
          height: "5rem",
          background:
            "linear-gradient(90deg, rgba(112,9,121,1) 0%, rgba(41,0,135,1) 100%)",
        };
        break;
    }
  }, [group]);

  const platformName = useCallback(() => {
    switch (group.category) {
      case "Disney+":
        return "Disney+";
        break;

      case "Netflix Premium":
        return "Netflix Premium";
        break;

      default:
        return "HBOmax";
        break;
    }
  }, [group]);

  const onFetchGroup = useCallback(async () => {
    try {
      const response = await groupDetailRoute(id);
      setGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickJoinGroup = useCallback(() => {
    navigate(`/join/${group._id}`);
  }, [group]);

  const onClickExitGroup = useCallback(async () => {
    try {
      await exitGroup(id, userId);
      navigate("/my-groups");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
    onFetchGroup();
  }, []);
  console.log(group);

  return (
    <>
      <NavbarComponent />
      {group ? (
        <Card
          key={group.category}
          className="text-center rounded-0"
          style={platformColors()}
        >
          <Card.Body>
            <Card.Text className="mt-1" style={{ color: "white" }}>
              <h3>{platformName()}</h3>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <span></span>
      )}

      {group ? (
        <Container
          key={[
            group.category,
            group.ownerId.name,
            group.serviceUser,
            group.servicePassword,
            group.numOfUsers,
            group.price,
          ]}
        >
          <Row className="mt-5 mb-2 justify-content-center">
            <Col md="5">
              <h2>{group.category}</h2>
              <p>Grupo compartido de:</p>
              <h4>{group.ownerId.name}</h4>
            </Col>
            <Col md="5">
              <p>
                {isUserInGroup()
                  ? "Utiliza estas credenciales para acceder a la plataforma"
                  : "Accede al grupo para poder ver las credenciales"}
              </p>
              <h3>Credenciales:</h3>
              <p>
                Email: {isUserInGroup() || isAdminGroup() ? <b>{group.serviceUser}</b>: <b>***************</b>}
              </p>
              <p>
                Contraseña: {isUserInGroup() || isAdminGroup() ? <b>{group.servicePassword}</b> : <b>***************</b>}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="5">
              <p>
                Estado: {isGroupComplete() ? <b className="text-danger">CERRADO</b> : <b className="text-success">ACTIVO</b>}
              </p>
              <p>
                Fecha de creación:{" "}
                {format(new Date(group.createdAt), "dd-MM-yyyy")}
              </p>
              <h3>{isGroupComplete() ? "Grupo Completo" : usersInGroup()}</h3>
            </Col>
            <Col md="5" className="text-center">
              <Card className="shadow">
                {isAdminGroup() ? (
                  <AdminGroupPanelControl />
                ) : (
                  <Card.Body>
                    <Card.Text>
                      <p>{isUserInGroup() ? "Pagando:" : "En grupo:"}</p>
                      <h3>{group.price}€</h3>
                    </Card.Text>
                    {isGroupComplete() && !isUserInGroup() ? (
                      <Button disabled>Unirse al grupo</Button>
                    ) : (
                      <Button
                        variant={isUserInGroup() ? "danger" : "primary"}
                        type="text"
                        onClick={
                          isUserInGroup() ? handleShow : onClickJoinGroup
                        }
                      >
                        {isUserInGroup()
                          ? "Abandonar grupo"
                          : "Unirse al grupo"}
                      </Button>
                    )}
                  </Card.Body>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Row className="d-flex justify-content-center">
          <Spinner animation="grow" variant="primary" />
        </Row>
      )}

      <ModalWindow
        show={show}
        handleClose={handleClose}
        modalTitle={"Salir del grupo"}
        modalText={"¿Estas seguro de querer salir del grupo?"}
        modalConfirmation={"Abandonar grupo"}
        onClickModalWindow={onClickExitGroup}
      />
    </>
  );
}
