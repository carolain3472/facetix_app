import React from "react";
import { Navbar_menu } from "../components/NavbarMenu";
import { Container, Row, Form, Button, Col } from "react-bootstrap";

export function Main_page() {
  return (
    <>
      <Container fluid>
        <Navbar_menu />
        <Row
          className="justify-content-center align-items-center text-center"
          style={{
            marginTop: "calc(55px + 0.09rem)", // Margen superior dinámico (altura del navbar + 1rem)
            position: "fixed",
            top: 0,
            height: "50vh",
            width: "100vw",
            backgroundImage:
              "linear-gradient(to bottom right, #FFD100, #9C5D0B)",
            color: "#ffffff",
          }}
        >
          <Col xs={12}> {/* Ocupa todo el ancho en dispositivos pequeños */}
            <h1>Discover and Buy Tickets to the Best Events</h1>
            <p>
              FaceTix is your one-stop destination for finding and purchasing
              tickets to the most exciting events in your area.
            </p>
            <Form
              style={{ marginTop: "1rem" }}
            >
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search for events"
                    className="mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit" variant="dark">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
