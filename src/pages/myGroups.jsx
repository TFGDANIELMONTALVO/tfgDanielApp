import React, { useCallback, useEffect, useState } from "react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import { CardGroups } from "../components/card.group.component";
import { NavbarComponent } from "../components/navbar.component";
import { userDetailRoute } from "../services/axios";

export function MyGroups(){
    const [user, setGroups] = useState();
    const id = localStorage.getItem("user");

    const onFetchGroups = useCallback(async () => {
        try {
            const response = await userDetailRoute(id);
            setGroups(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [])

    //const onClickDeleteUser = 

    useEffect(()=>{
        onFetchGroups();
    }, [])

    console.log(user)

    return(
        <>
            <NavbarComponent/>

            <Card className="text-center" style={{ width: '100%', height: '5rem', background: 'linear-gradient(to right, rgba(0, 236, 255, 0.5), rgba(0, 50, 255, 0.5))' }} bg="primary">
                <Card.Body>
                    <Card.Text className="mt-1" style={{color:"white"}}>
                        <h3>Mis grupos y pagos</h3>
                    </Card.Text>
                </Card.Body>
            </Card>

            
            <Row className="offset-1 mt-5">
                <h4>Grupos en los que eres el Administrador:</h4>
            </Row>   

            {
                user && user.ownerGroups ? (
                    user.ownerGroups.map((group, index) => (
                        <Row className="mt-2 mb-5" key={[group.category, user.name, group.users.length, group.numOfUsers, group.price]}>
                            <Col md="4">
                                <CardGroups 
                                    categoryGroup={group.category}
                                    nameUser={user.name}
                                    maxNumUser={group.numOfUsers}
                                    usersInGroup={group.users.length}
                                    priceGroup={group.price}
                                    groupId={group._id}
                                />
                            </Col>
                        </Row>
                    ))
                ) : (
                    <span>Cargando cards...</span>
                )
            }  

            <Row className="offset-1 mt-5">
                <h4>Grupos en los que eres un Miembro:</h4>
            </Row>

            {
                user && user.suscribedGroups ? (
                    user.suscribedGroups.map((group, index) => (
                        <Row className="mt-2 mb-5" key={[group.category, group.users.length, group.ownerId.name, group.numOfUsers, group.price]}>
                            <Col md="4">
                            <CardGroups 
                                categoryGroup={group.category}
                                nameUser={group.ownerId.name}
                                maxNumUser={group.numOfUsers}
                                usersInGroup={group.users.length}
                                priceGroup={group.price}
                                groupId={group._id}/>
                            </Col>
                        </Row>
                    ))
                ) : (
                    <span>Cargando cards...</span>
                )
            } 
        </>
    )
}