import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteGroupRoute, groupDetailRoute, updateGroupRoute } from "../services/axios";
import { ModalWindow } from "./modal.window.component";
import _ from "lodash"

export function AdminGroupPanelControl() {
  const [show, setShow] = useState(false);
  const [group, setGroup] = useState();
  const [updatedGroup, setUpdatedGroup] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onFetchGroup = useCallback(async () => {
    try {
      const response = await groupDetailRoute(id);
      setGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmitGroupUpdate = useCallback(async () => {
    try {
        await updateGroupRoute(id, updatedGroup)
    } catch (error) {
        console.log(error);    
    }
  }, [updatedGroup])

  const onClickDeleteGroupAdmin = useCallback(async () => {
    try {
      await deleteGroupRoute(id, group.ownerId);
      navigate("/my-groups");
    } catch (error) {
      console.log(error);
    }
  }, [group, id]);

  useEffect(() => {
    onFetchGroup();
  }, []);

  return (
    <>
      <Card.Body>
        {group ? (
          <Form>
            <Form.Label>
                <b>Editar credenciales:</b>
            </Form.Label>
            <Row key={[group.serviceUser, group.servicePassword]}>
              <Col md="6">
              <Form.Control type="email" placeholder={group.serviceUser} onChange={(e) => setUpdatedGroup({...updatedGroup, serviceUser: e.target.value})}/>
              </Col>
              <Col md="6">
              <Form.Control
                type="password"
                placeholder={group.servicePassword}
                onChange={(e) => setUpdatedGroup({...updatedGroup, servicePassword: e.target.value})}
              />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
              {_.isEmpty(updatedGroup) ? <Button variant="secondary" disabled>Editar credenciales</Button> : <Button variant="secondary" type="text" onClick={onSubmitGroupUpdate}>
                Editar credenciales
              </Button>}
              </Col>
            </Row>
          </Form>
        ) : (
          <span />
        )}
        <Row className="mt-4 mb-1">
          <Col>
          <Button variant="danger" type="text" onClick={handleShow}>
            Borrar grupo
          </Button>
          </Col>
        </Row>
      </Card.Body>
      <ModalWindow show={show} handleClose={handleClose} modalTitle={"Borrar grupo"} modalText={"¿Estas seguro de querer borrar el grupo? Esta acción no se puede deshacer"} modalConfirmation={"Borrar grupo"} onClickModalWindow={onClickDeleteGroupAdmin}/>
    </>
  );
}
