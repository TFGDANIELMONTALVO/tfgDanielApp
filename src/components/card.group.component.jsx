import React, { useCallback } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import disney from "../images/disney.png"
import netflix from "../images/netflix.png"
import hbo from "../images/hbo.png"
import { useNavigate } from "react-router-dom";

export function CardGroups({categoryGroup, nameUser, maxNumUser, priceGroup, groupId}){
    const navigate = useNavigate()

    const onNavigateGroupDetail = useCallback(() => {
        navigate(`/group/${groupId}`)
    }, [groupId])

    const serviceImages = useCallback(() => {
        switch (categoryGroup) {
            case "Disney+":
                return disney
                break;

            case "Netflix Premium":
                return netflix
                break;

            default:
                return hbo
                break;
        }
    },[categoryGroup])

    return(
        <>
            <Card bg="light">
                <Row>
                    <Col md="4" className="offset-1 mt-3">
                        <Card.Img src={serviceImages()}/>
                    </Col>
                    <Col md="6" className="offset-1 mt-2">
                        <Card.Text>
                            <h4><b>{categoryGroup}</b></h4>
                            <a>Grupo compartido de:</a>
                            <h5>{nameUser}</h5>
                            <h5>{maxNumUser} usuarios maximos</h5>
                        </Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Col md="4" className="offset-1 mt-1 mb-2">
                        <Card.Text>
                            <a>En grupo:</a>
                            <br />
                            <h3>{priceGroup}€</h3>
                        </Card.Text>
                    </Col>
                    <Col md="6" className="offset-1 mt-3">
                        <Button type="text" onClick={onNavigateGroupDetail}>Ver grupo</Button>
                    </Col>
                </Row>
            </Card>
        </>
    );
};