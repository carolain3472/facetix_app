import React from "react";
import { Navbar_inicio } from "../components/NavbarInicio";
import { Container, Row, Form, Button, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";

export function MisEventos_page() {
  return (
    <>
      <Navbar_inicio />
      <Container fluid>
        <Row
          className="justify-content-center align-items-center"
          style={{
            height: "100vh",
          }}
        >
          <Row className="justify-content-center align-items-center text-center">
            <h1>
              <b>MyEvents</b>
            </h1>
            <h5>Thanks for choosing us, here's the list of events that you have purchased already.</h5>
          </Row>
          <Card
            className="hover-effect"
            style={{
              width: "25rem",
              marginRight: "5rem",
              boxShadow: "10px 10px 10px rgba(0,0,0,0.5)",
            }}
          >
            <Card.Img
              variant="top"
              src="interpol.jpg"
              style={{ height: "230px", objectFit: "contain" }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>Interpol</b>
                  </Card.Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <Col>
                  <Card.Text>May 26, 2024</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <h2>
                      <b>$170</b>
                    </h2>
                  </Card.Text>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="warning">See details</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card
            className="hover-effect"
            style={{
              width: "25rem",
              marginRight: "5rem",
              boxShadow: "10px 10px 10px rgba(0,0,0,0.5)",
            }}
          >
            <Card.Img
              variant="top"
              src="ashnikko.jpg"
              style={{ height: "230px", objectFit: "contain" }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>Ashnikko</b>
                  </Card.Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <Col>
                  <Card.Text>May 17, 2023</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <h2>
                      <b>$210</b>
                    </h2>
                  </Card.Text>
                </Col>
                <Col Col className="d-flex justify-content-end">
                  <Button variant="warning">See details</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card
            className="hover-effect"
            style={{
              width: "25rem",
              boxShadow: "10px 10px 10px rgba(0,0,0,0.5)",
            }}
          >
            <Card.Img
              variant="top"
              src="pumas.jpg"
              style={{ height: "230px", objectFit: "contain" }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>Black Pumas</b>
                  </Card.Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <Col>
                  <Card.Text>May 20, 2024</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <h2>
                      <b>$150</b>
                    </h2>
                  </Card.Text>
                </Col>
                <Col Col className="d-flex justify-content-end">
                  <Button variant="warning">See details</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

      </Container>
      <Footer />
    </>
  );
}
