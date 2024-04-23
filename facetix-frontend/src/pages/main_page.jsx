import React from "react";
import { Navbar_menu } from "../components/NavbarMenu";
import { Container, Row, Form, Button, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faWallet,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "../scss/card_style.css";
import Footer from "../components/Footer";

export function Main_page() {
  return (
    <>
      <Navbar_menu />
      <Container fluid style={{ width: "99.1vw" }}>
        <Row
          className="justify-content-center align-items-center text-center"
          style={{
            marginTop: "calc(55px + 0.09rem)", // Margen superior dinámico (altura del navbar + 1rem)
            height: "50vh",
            backgroundImage:
              "linear-gradient(to bottom right, #FFD100, #9C5D0B)",
            color: "#ffffff",
          }}
        >
          <Col xs={12}>
            {" "}
            {/* Ocupa todo el ancho en dispositivos pequeños */}
            <h1>
              <b>Discover and Buy Tickets to the Best Events</b>
            </h1>
            <p>
              FaceTix is your one-stop destination for finding and purchasing
              tickets to the most exciting events in your area.
            </p>
            <Form style={{ marginTop: "5rem" }}>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search for events"
                    className="mr-sm-2"
                    style={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    type="submit"
                    variant="dark"
                    style={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <Row
          className="justify-content-center align-items-center"
          style={{
            marginTop: "calc(55px + 0.09rem)", // Margen superior dinámico (altura del navbar + 1rem)
            height: "50vh",
            color: "#ffffff",
          }}
        >
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
              src="boonaro.jpeg"
              style={{ height: "230px", objectFit: "cover" }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>Bonnaroo Music & Arts Festival</b>
                  </Card.Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <Col>
                  <Card.Text>June 15-18, 2023</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <h2>
                      <b>$250</b>
                    </h2>
                  </Card.Text>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="warning">V.I.P</Button>
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
              src="coachella.jpg"
              style={{ height: "230px", objectFit: "cover" }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>Coachella Music Festival</b>
                  </Card.Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <Col>
                  <Card.Text>April 14-16, 2023</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <h2>
                      <b>$300</b>
                    </h2>
                  </Card.Text>
                </Col>
                <Col Col className="d-flex justify-content-end">
                  <Button variant="warning">General</Button>
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
              src="lollapalooza.jpg"
              style={{ height: "230px", objectFit: "cover" }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    <b>Lollapalooza Music Festival</b>
                  </Card.Title>
                </Col>
              </Row>
              <Row style={{ marginBottom: "2rem" }}>
                <Col>
                  <Card.Text>July 28-31, 2023</Card.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    <h2>
                      <b>$200</b>
                    </h2>
                  </Card.Text>
                </Col>
                <Col Col className="d-flex justify-content-end">
                  <Button variant="warning">General</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        <Row
          className="justify-content-center align-items-center text-center"
          style={{
            marginTop: "calc(55px + 0.09rem)", // Margen superior dinámico (altura del navbar + 1rem)
            height: "50vh",
            backgroundColor: "#f3f4f6",
          }}
        >
          <Col xs={12}>
            {/* Ocupa todo el ancho en dispositivos pequeños */}
            <h1>
              <b>Why Choose FaceTix?</b>
            </h1>
            <h5>
              FaceTix offers a seamless and reliable platform for finding and
              purchasing tickets to the best events in your area.
            </h5>
          </Col>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Row>
                <Card
                  className="hover-effect2"
                  style={{
                    width: "30rem",
                    padding: "0.5rem",
                    boxShadow: "10px 10px 15px rgba(0,0,0,0.5)",
                    marginRight: "5rem",
                  }}
                >
                  <Card.Body>
                    <Col
                      Col
                      className="d-flex justify-content-start"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        icon={faTicket}
                        style={{ color: "#ffc107" }}
                        size="2xl"
                      />
                    </Col>
                    <Card.Title>
                      <b>Wide Event Selection</b>
                    </Card.Title>
                    <Card.Text>
                      Browse through a vast selection of events, from music
                      festivals to sports games and more.
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card
                  className="hover-effect2"
                  style={{
                    width: "30rem",
                    padding: "0.5rem",
                    boxShadow: "10px 10px 15px rgba(0,0,0,0.5)",
                    marginRight: "5rem",
                  }}
                >
                  <Card.Body>
                    <Col
                      Col
                      className="d-flex justify-content-start"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        icon={faWallet}
                        style={{ color: "#ffc107" }}
                        size="2xl"
                      />
                    </Col>
                    <Card.Title>
                      <b>Secure Payments</b>
                    </Card.Title>
                    <Card.Text>
                      Enjoy a safe and secure checkout process with multiple
                      payment options.
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card
                  className="hover-effect2"
                  style={{
                    width: "30rem",
                    padding: "0.5rem",
                    boxShadow: "10px 10px 15px rgba(0,0,0,0.5)",
                  }}
                >
                  <Card.Body>
                    <Col
                      Col
                      className="d-flex justify-content-start"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        style={{ color: "#ffc107" }}
                        size="2xl"
                      />
                    </Col>
                    <Card.Title>
                      <b>Easy Booking</b>
                    </Card.Title>
                    <Card.Text>
                      Find and book tickets to your favorite events with just a
                      few clicks.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          </Row>
        </Row>

        <Row
          className="justify-content-center align-items-center"
          style={{
            marginTop: "calc(55px + 0.09rem)", // Margen superior dinámico (altura del navbar + 1rem)
            height: "70vh",
          }}
        >
          <Row className="justify-content-center align-items-center text-center">
            <h1>
              <b>Upcoming Events</b>
            </h1>
            <h5>Check out some of the hottest upcoming events on FaceTix.</h5>
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
                  <Button variant="warning">General</Button>
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
                  <Button variant="warning">VIP</Button>
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
                  <Button variant="warning">VIP</Button>
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
