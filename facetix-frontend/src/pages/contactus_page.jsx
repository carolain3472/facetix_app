import React from "react";
import { Navbar_menu } from "../components/NavbarMenu";
import { Container, Row, Form, Button, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";

export function ContactUs_page() {
  return (
    <>
      <Navbar_menu />
      <Container fluid>
        <Row
          className="justify-content-center align-items-center"
          style={{
            height: "100vh",
            width: "100vw"
          }}
        >
          Contacto
          <Footer />
        </Row>
      </Container>

    </>
  );
}
