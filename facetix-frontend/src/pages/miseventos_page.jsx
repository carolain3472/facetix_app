import axios from "axios";
import { React, useState, useEffect } from "react";
import { Navbar_inicio } from "../components/NavbarInicio";
import { Container, Row, Form, Button, Col, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import { api } from "../api/api_base";

export function MisEventos_page() {
  const [eventsData, setEventsData] = useState(null); // Estado para los datos de eventos
  const userId = sessionStorage.getItem("usuario_id");

  // Verifica si se ha obtenido el ID de usuario
  if (!userId) {
    console.error("User ID not found in sessionStorage");
    return;
  }

  // Construye la URL con el ID de usuario
  const url = `/events/assistant_user_events/?user=${userId}`;

  const headers = {
    'Content-Type': 'application/json'
  };

  
  useEffect(() => {
    handleEvents();
  }, []);

  const handleEvents = () => {
    api
      .get(url, { headers })
      .then((response) => {
        console.log(response.data)
        const eventData = response.data.map(event => ({
          id: event.id,
          name: event.name,
          date: event.date,
          price:event.capacity,
          image: event.file_cover,
        }));
        setEventsData(eventData); // Establece los datos de eventos en el estado
      })
      .catch((error) => {
        console.error(error);
      });
  };


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
  
          {/* Renderizar solo si eventsData tiene información */}
          {eventsData && eventsData.length > 0 ? (
            eventsData.map((event, index) => (
              <Col key={index} md={4}>
                <Card
                  className="hover-effect mx-auto"
                  style={{
                    width: "30rem",
                    margin: "0 0 2rem 0",
                    boxShadow: "10px 10px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={event.image}
                    style={{ height: "230px", objectFit: "contain" }}
                  />
                  <Card.Body>
                    <Row>
                      <Col>
                        <Card.Title>
                          <b>{event.name}</b>
                        </Card.Title>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "2rem" }}>
                      <Col>
                        <Card.Text>{event.date}</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Card.Text>
                          <h2>
                            <b>${event.price}</b>
                          </h2>
                        </Card.Text>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <div className="d-flex align-content-center me-2">
                          <Button
                            variant="warning"
                            className="btn-sm"
                          >
                            Details
                          </Button>
                        </div>

                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div>No events found</div>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
  }