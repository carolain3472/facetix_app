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
import { useParams } from 'react-router-dom';


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
  const { searchTerm } = useParams();
  const [searchTerm2, setSearchTerm2] = useState('');

  const headers = {
    "Content-Type": "application/json",
  };

  useEffect(() => {
    handleEvents();
  }, []);

  console.log(`/events/?search=${searchTerm}`)

  const handleEvents = () => {
    let url = '';
    if (searchTerm !== undefined) {
      url = `/events/?search=${searchTerm}`;
    }else{
      url = `/events/`;
    }

    api
      .get(url, { headers })
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
          title: "Something went wrong",
          text: "Please, try again",
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
    canvas.toBlob((blob) => {
      const imageFile = new File([blob], 'photo.png', { type: 'image/png' });
      setVerificationPhoto(imageFile); // Almacenar la foto capturada como un objeto de archivo
      setPhotoTaken(true);
      openCamera();
    }, 'image/png');
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

  const openVerificationModal = (eventData) => {
    setVerificationModalOpen(true);
    setPhotoTaken(false);
    console.log(eventData.id)
    setSelectedEventId(eventData.id); // Actualizar el estado con el ID del evento seleccionado
  };

  const closeVerificationModal = () => {
    setVerificationModalOpen(false);
    setVerificationPhoto(null); // Limpiar la foto de verificación
    setPhotoTaken(false);
  };


  const handleInputChange = (event) => {
    setSearchTerm2(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    window.location.href = `/eventos/${searchTerm2}`;
  };

  const handlePerformVerification = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    console.log(selectedEventId)
    const user_photo = verificationPhoto
    const event= selectedEventId;

    
    axios;
    api
      .post(
        "/events/validate_user_entry/",
        { event, user_photo },
        { headers }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.id);
        // Cuando la solicitud es exitosa
        if (response.status === 200) {
          setSelectedEvent(null);
  
          Swal.fire({
            icon: "success",
            title: `Identity confirmed`,
            text: `We have successfully verified your identity with our records, enjoy the event!`,
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
          title: "Identity denied",
          text: "Oops, it seems that your photo does not match with our records",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 1800,
        });
      });
  };
  

  return (
    <>
      <Navbar_inicio />
      <Container fluid>


      <Row
          className="justify-content-center align-items-center text-center"
          style={{
            marginTop: "calc(10px + 0.09rem)", // Margen superior dinámico (altura del navbar + 1rem)
            height: "10vh",
            backgroundImage:
              "linear-gradient(to bottom right, #FFD100, #9C5D0B)",
            color: "#ffffff",
          }}
        >
          <Col xs={12}>
           
            <Form style={{ marginTop: "5rem" }} onSubmit={handleSearch}>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search for events"
                    value={searchTerm2}
                    onChange={handleInputChange}
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
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>



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
            ): (

              <Row className="justify-content-center align-items-center text-center">
                {eventsData && eventsData.length === 0 ? (
                  <h3>Sin resultados</h3>
                ) : (
                  <h2>Loading...</h2>
                )}
              
              </Row>
            )}
            
           
        </Row>
      </Container>
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
                              onClick={() => openVerificationModal(event)}
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
                  src={URL.createObjectURL(verificationPhoto)}
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
