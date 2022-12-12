import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteGroupRoute, groupDetailRoute, updateGroupRoute } from "../services/axios";

export function AdminGroupPanelControl() {
  const [group, setGroup] = useState();
  const [updatedGroup, setUpdatedGroup] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

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
  })

  const onClickDeleteGroupAdmin = useCallback(async () => {
    try {
      await deleteGroupRoute(id);
      navigate("/my-groups");
    } catch (error) {
      console.log(error);
    }
  });

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
              <Button variant="secondary" type="text" onClick={onSubmitGroupUpdate}>
                Editar credenciales
              </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <span />
        )}
        <Row className="mt-4 mb-1">
          <Col>
          <Button variant="danger" type="text" onClick={onClickDeleteGroupAdmin}>
            Borrar Grupo
          </Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}