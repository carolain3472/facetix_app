import axios from "axios";
import { React, useState, useEffect } from "react";
import { Navbar_inicio } from "../components/NavbarInicio";
import {
  Container,
  Row,
  Button,
  Col,
  Card,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { api } from "../api/api_base";

export function Eventos_page() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [verificationPhoto, setVerificationPhoto] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [stream, setStream] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [eventsData, setEventsData] = useState(null); // Estado para los datos de eventos

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    handleEvents();
  }, []);

  const handleEvents = () => {
    api
      .get("/events/", { headers })
      .then((response) => {
        console.log(response.data);
        const eventData = response.data.map((event) => ({
          id: event.id,
          name: event.name,
          date: event.date,
          price: event.capacity,
          image: event.file_cover,
        }));
        setEventsData(eventData); // Establece los datos de eventos en el estado
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBuyTicketsClick = (eventData) => {
    console.log("Event ID:", eventData.id); // Imprimir el ID del evento
    setSelectedEventId(eventData.id); // Actualizar el estado con el ID del evento seleccionado
    setSelectedEvent(eventData);
  };

  const handleConfirmPurchase = () => {
    const number = parseInt(document.getElementById("formQuantity").value);
    const cost = selectedEvent.price;
    const event = selectedEvent.id;
    const assistant = sessionStorage.getItem("usuario_id");

    const name = document.getElementById("formName").value;
    const documentNumber = document.getElementById("formDocument").value;
    const totalPrice = selectedEvent.price * number;
    const selfieURL = verificationPhoto || capturedPhoto;

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    console.log(usuario);
    console.log(number);
    console.log(selectedEvent.price);
    console.log(assistant.id);

    if (
      number <= 0 ||
      isNaN(totalPrice) ||
      name.trim() === "" ||
      documentNumber.trim() === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields and select at least one ticket.",
      });
      return;
    }

    const formData = {
      quantity: number,
      name: name,
      documentNumber: documentNumber,
      totalPrice: totalPrice,
      selfieURL: selfieURL, // URL de la foto tomada
      // Otros datos que desees enviar al servidor
    };

    axios;
    api
      .post(
        "/buy-ticket-event/",
        { number, cost, event, assistant },
        { headers }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.id);
        console.log(response.data.valid);
        // Cuando la solicitud es exitosa
        if (response.status == 201) {
          setSelectedEvent(null);

          Swal.fire({
            icon: "success",
            title: `Thank you, ${name}!`,
            text: `Your purchase has been confirmed. Total: $${totalPrice}`,
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página actual
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "No hay más boletas",
            text: "Escoge otro evento",
            showConfirmButton: false,
            allowOutsideClick: false,
            showCancelButton: false,
            timer: 1800,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Opps, hubo un error",
          text: "¡Notificalo!",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 1800,
        });
      });
  };

  const handleQuantityChange = () => {
    const quantity = parseInt(document.getElementById("formQuantity").value);
    const totalPrice = selectedEvent.price * quantity;
    document.getElementById("totalPrice").innerText = totalPrice;
  };

  const openCamera = async () => {
    try {
      if (!cameraPermissionGranted) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        setCameraPermissionGranted(true);
      }
      setCameraActive(!cameraActive);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = () => {
    const video = document.getElementById("camera-preview");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoURL = canvas.toDataURL("image/png");

    setVerificationPhoto(photoURL); // Almacenar la foto tomada para la verificación
    setPhotoTaken(true);
    openCamera();
  };

  useEffect(() => {
    if (stream && cameraActive) {
      const video = document.getElementById("camera-preview");
      video.srcObject = stream;
    }
  }, [stream, cameraActive]);

  const handleCloseModal = () => {
    setPhotoTaken(false);
    setVerificationModalOpen(false);
    setCapturedPhoto(null);
    setCameraActive(false);
    setSelectedEvent(null);
  };

  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  const openVerificationModal = () => {
    setVerificationModalOpen(true);
    setPhotoTaken(false);
  };

  const closeVerificationModal = () => {
    setVerificationModalOpen(false);
    setVerificationPhoto(null); // Limpiar la foto de verificación
    setPhotoTaken(false);
  };

  const handlePerformVerification = () => {
    setVerificationPhoto(verificationPhoto); // Almacenar la foto capturada para la verificación
    // Lógica de verificación de identidad aquí
  };

  return (
    <>
      <Navbar_inicio />
      <div style={{ paddingBottom: "100px" }}>
        <Container fluid>
          <Row
            className="justify-content-center align-items-center"
            style={{
              marginTop: "calc(55px + 0.09rem)",
              minHeight: "100vh", // Altura mínima para ocupar el espacio restante
            }}
          >
            <Row className="justify-content-center align-items-center text-center">
              <h1>
                <b>Events</b>
              </h1>
              <h5>Check out some of the hottest upcoming events on FaceTix.</h5>
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
                              onClick={() => handleBuyTicketsClick(event)}
                              className="btn-sm"
                            >
                              Buy Tickets
                            </Button>
                          </div>
                          <div className="d-flex align-content-center me-2">
                            <Button
                              variant="secondary"
                              onClick={openVerificationModal}
                              className="btn-sm"
                            >
                              Verify Event
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Row>
        </Container>
      </div>
      <Footer />

      <Modal
        show={selectedEvent !== null}
        backdrop="static"
        keyboard={false}
        onHide={() => setSelectedEvent(null)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{selectedEvent && selectedEvent.name}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <h5>
                <b>Date:</b> {selectedEvent.date}
              </h5>
              <h5>
                <b>Price:</b> ${selectedEvent.price}
              </h5>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.name}
                style={{ width: "100%" }}
              />
            </div>
          )}
          <Form style={{ marginTop: "1rem" }}>
            <Form.Group controlId="formQuantity" className="mb-3">
              <Form.Label className="mb-2">Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                onChange={handleQuantityChange}
              />
            </Form.Group>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label className="mb-2">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formDocument" className="mb-3">
              <Form.Label className="mb-2">Document Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your document number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="warning" onClick={handleConfirmPurchase}>
            Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={verificationModalOpen}
        onHide={closeVerificationModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Verify Identity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formSelfie" className="mb-3">
            <Form.Label>
              Take a Selfie{" "}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-info">
                    Al tomar una selfie, estás contribuyendo a mejorar la
                    seguridad y la experiencia de todos los asistentes al
                    evento. Utilizaremos esta imagen para verificar tu identidad
                    al momento de validar tu entrada. Este proceso nos ayuda a
                    garantizar que solo los compradores originales puedan
                    acceder al evento, lo que reduce significativamente la
                    posibilidad de reventa de entradas y garantiza una
                    experiencia más justa y segura para todos. ¡Gracias por tu
                    cooperación en mantener nuestros eventos seguros y
                    protegidos!
                  </Tooltip>
                }
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ cursor: "help" }}
                />
              </OverlayTrigger>
            </Form.Label>
            <Button
              variant="primary"
              onClick={openCamera}
              className="me-2 ms-2 btn-sm"
            >
              {cameraActive ? "Close Camera" : "Open Camera"}
            </Button>
            {cameraActive && cameraPermissionGranted && (
              <>
                <video
                  id="camera-preview"
                  autoPlay
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "1rem",
                  }}
                  className="mb-2"
                ></video>
                <Button variant="success" onClick={takePhoto} className="me-2">
                  Take Photo
                </Button>
              </>
            )}
            {photoTaken && (
              <>
                <h2 className="mb-2">Photo Taken</h2>
                <img
                  src={verificationPhoto}
                  alt="Captured"
                  style={{
                    maxWidth: "100%", // Asegura que la imagen no supere el ancho del contenedor
                    maxHeight: "100%", // Asegura que la imagen no supere la altura del contenedor
                    width: "auto", // Ajusta el ancho automáticamente
                    height: "auto", // Ajusta la altura automáticamente
                    marginTop: "1rem", // Agrega un margen superior para separar la imagen del resto del contenido
                  }}
                />
              </>
            )}
          </Form.Group>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeVerificationModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePerformVerification}>
            Perform Verification
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
