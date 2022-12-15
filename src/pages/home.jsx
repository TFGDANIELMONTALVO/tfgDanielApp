//import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardGroup, Carousel, Col, Container, Row } from "react-bootstrap";
import { NavbarComponent } from "../components/navbar.component";
import disneyLogo from "../images/Disney+_logo.svg.png";
import netflixLogo from "../images/Logo-Netflix.png";
import hboLogo from "../images/HBO_Max-Logo.wine.png";
import netflixContent from "../images/neflix-content.jpg";
import netflixHome from "../images/Netflix_content_home.png";
import disneyHome from "../images/disney+_home.png"
import home from "../images/home.png"
import group from "../images/group.png"
import { useNavigate } from "react-router-dom";
//import { getUsersRoute, healthRoute } from "../services/axios";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, []);


  return (
    <div style={{background: "rgb(0,3,48)"}}>
      <NavbarComponent
        linkText={"/login"}
        text={"Registrarse o iniciar sesión"}
      />

      <Container>
      <Row className="justify-content-center align-items-center text-light mt-5 p-5">
        <Col className="" md="5">
          <h1>Comparte tu cuenta</h1>
          <h1>y ahorra</h1>
          <Button className="mt-5 border-0" style={{background: "rgb(2,0,36)", background: "linear-gradient(90deg, rgba(14,9,121,1) 0%, rgba(0,53,255,1) 100%)"}} href="/login">Regístrate ahora</Button>
        </Col>

        <Col md="7">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src={netflixHome} alt="Netflix" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={disneyHome} alt="Disney" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={netflixHome} alt="Netflix" />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center text-center text-white m-5 p-5">
        <Col md="12">
          <h3>ShareIT es la plataforma que te permite ahorrar mes a mes en tus suscripciones a las plataformas de streaming compartiendo tus cuentas con otras personas ahorrando hasta un 80% en tu suscripción mensual</h3>
        </Col>
      </Row>
      <Row className="align-items-center mt-5 text-light">
        <Col md="5">
          <p>Accede a un amplio catálogo de grupos desponibles, creados por gente como tú, que busca disfrutar de todas las ventajas de una plataforma de streaming sin pagar demás</p>
        </Col>
        <Col className="mb-5" md="5">
          <img src={home} style={{width:"130%"}}/>
        </Col>
      </Row>
      <Row className="align-items-center mt-5 text-light">
        <Col className="" md="5">
          <p>Accede a un grupo junto a otros usuarios y descubrid cuando dinero podreis ahorrar juntos al pagar hasta un 80% menos cada mes</p>
        </Col>
        <Col className="mb-5" md="5">
          <img src={group} style={{width:"130%"}}/>
        </Col>
        
      </Row>
      </Container>
    </div>
  );
}
