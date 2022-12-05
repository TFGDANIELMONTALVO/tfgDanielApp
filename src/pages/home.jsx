//import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbar.component";
import disneyLogo from "../images/Disney+_logo.svg.png";
import netflixLogo from "../images/Logo-Netflix.png";
import hboLogo from "../images/HBO_Max-Logo.wine.png";
import netflixContent from "../images/neflix-content.jpg"
import { useNavigate } from "react-router-dom";
//import { getUsersRoute, healthRoute } from "../services/axios";

export function Home() {
  const navigate = useNavigate(); 

  useEffect(() => {
    if(localStorage.getItem("user")){
      navigate("/dashboard")
    }
  }, [])
  
  return (
    <div>
      <NavbarComponent
        linkText={"/login"}
        text={"Registrarse o iniciar sesión"}
      />

      <Card style={{ width: "100%", height: "10rem", background: 'linear-gradient(to right, rgba(0, 236, 255, 0.5), rgba(0, 50, 255, 0.5))'}} bg="primary">
        <Card.Body className="offset-1" style={{color:"white"}}>
            <h1>Comparte tu <br/>
            cuenta y ahorra</h1>
        </Card.Body>
        {/* <Card.Img src={netflixContent}/> */}
      </Card>
      <Row className="text-center mt-4">
        <h3>Empieza a ahorrar hoy mismo</h3>
      </Row>
      <Row className="mt-5 justify-content-center">
        <Col md="2">
          <Card bg="light">
            <Card.Img variant="center" src={disneyLogo} />
          </Card>
        </Col>
        <Col md="2">
          <Card bg="light">
            <Card.Img variant="center" src={netflixLogo}/>
          </Card>
        </Col>
        <Col md="2">
          <Card bg="light"> 
            <Card.Img variant="center" src={hboLogo}/>
          </Card>
        </Col>
      </Row>
      {/* <ButtonComponent label={"Click me"} onClick={onClickHome} /> */}
    </div>
  );
}
