import { React, useState, useEffect } from "react";
import { Navbar_inicio } from "../components/NavbarInicio";
import { Container, Row, Button, Col, Card, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


export function Eventos_page() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [verificationPhoto, setVerificationPhoto] = useState(null); // Nuevo estado para la foto de verificación
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [stream, setStream] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  // Definir información de los eventos en un array de objetos
  const eventsData = [
    {
      name: "Interpol",
      date: "May 26, 2024",
      price: 170,
      image: "interpol.jpg",
    },
    {
      name: "Ashnikko",
      date: "May 17, 2024",
      price: 210,
      image: "ashnikko.jpg",
    },
    {
      name: "Black Pumas",
      date: "May 20, 2024",
      price: 150,
      image: "pumas.jpg",
    },
    {
      name: "Anita",
      date: "Jun 7, 2024",
      price: 140,
      image: "anita.jpg",
    },
    {
      name: "Brutalismus",
      date: "Abr 26, 2024",
      price: 200,
      image: "brutalismus.jpg",
    },
    {
      name: "Diamantes Electricos",
      date: "Ago 31, 2024",
      price: 165,
      image: "diamante.jpg",
    },
    {
      name: "Ferxxocalipsis",
      date: "Dic 8, 2024",
      price: 300,
      image: "ferxxo.jpg",
    },
    {
      name: "Juanes",
      date: "May 17, 2024",
      price: 120,
      image: "juanes.jpg",
    },
    {
      name: "WOS",
      date: "Oct 25, 2024",
      price: 190,
      image: "wos.jpg",
    },
    {
      name: "Rawayana",
      date: "Jul 5, 2024",
      price: 105,
      image: "rawayana.jpg",
    },
    {
      name: "Travis Birds",
      date: "May 1, 2024",
      price: 90,
      image: "travis.jpg",
    },
    {
      name: "Milky Chance",
      date: "May 8, 2024",
      price: 120,
      image: "milky.png",
    },
  ];

  const handleBuyTicketsClick = (eventData) => {
    setSelectedEvent(eventData);
  };

  const handleConfirmPurchase = () => {
    const quantity = parseInt(document.getElementById('formQuantity').value);
    const name = document.getElementById('formName').value;
    const documentNumber = document.getElementById('formDocument').value;
    const totalPrice = selectedEvent.price * quantity;
    const selfieURL = verificationPhoto || capturedPhoto; // Usar la foto de verificación si está disponible

    if (quantity <= 0 || isNaN(totalPrice) || name.trim() === '' || documentNumber.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields and select at least one ticket.',
      });
      return;
    }

    const formData = {
      quantity: quantity,
      name: name,
      documentNumber: documentNumber,
      totalPrice: totalPrice,
      selfieURL: selfieURL, // URL de la foto tomada
      // Otros datos que desees enviar al servidor
    };

    Swal.fire({
      icon: 'success',
      title: `Thank you, ${name}!`,
      text: `Your purchase has been confirmed. Total: $${totalPrice}`,
    });

    setSelectedEvent(null);
  };

  const handleQuantityChange = () => {
    const quantity = parseInt(document.getElementById('formQuantity').value);
    const totalPrice = selectedEvent.price * quantity;
    document.getElementById('totalPrice').innerText = totalPrice;
  };

  const openCamera = async () => {
    try {
      if (!cameraPermissionGranted) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        setCameraPermissionGranted(true);
      }
      setCameraActive(!cameraActive);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const takePhoto = () => {
    const video = document.getElementById('camera-preview');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoURL = canvas.toDataURL('image/png');

    if (verificationModalOpen) {
      setVerificationPhoto(photoURL); // Almacenar la foto tomada para la verificación
    } else {
      setCapturedPhoto(photoURL); // Almacenar la foto tomada para comprar ticket
    }

    setPhotoTaken(true);
    openCamera();
  };

  useEffect(() => {
    if (stream && cameraActive) {
      const video = document.getElementById('camera-preview');
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
    setVerificationPhoto(capturedPhoto); // Almacenar la foto capturada para la verificación
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
            {eventsData.map((event, index) => (
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
            ))}
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
          <Modal.Title><b>{selectedEvent && selectedEvent.name}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <h5><b>Date:</b> {selectedEvent.date}</h5>
              <h5><b>Price:</b> ${selectedEvent.price}</h5>
              <img src={selectedEvent.image} alt={selectedEvent.name} style={{ width: "100%" }} />
            </div>
          )}
          <Form style={{ marginTop: "1rem" }}>
            <Form.Group controlId="formQuantity" className="mb-3">
              <Form.Label className="mb-2">Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter quantity" onChange={handleQuantityChange} />
            </Form.Group>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label className="mb-2">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formDocument" className="mb-3">
              <Form.Label className="mb-2">Document Number</Form.Label>
              <Form.Control type="text" placeholder="Enter your document number" />
            </Form.Group>
            <Form.Group controlId="formSelfie" className="mb-3">
              <Form.Label>
                Take a Selfie{' '}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-info">
                      Al tomar una selfie, estás contribuyendo a mejorar la seguridad y la experiencia de todos los asistentes al evento. Utilizaremos esta imagen para verificar tu identidad al momento de validar tu entrada. Este proceso nos ayuda a garantizar que solo los compradores originales puedan acceder al evento, lo que reduce significativamente la posibilidad de reventa de entradas y garantiza una experiencia más justa y segura para todos.
                      ¡Gracias por tu cooperación en mantener nuestros eventos seguros y protegidos!
                    </Tooltip>
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} style={{ cursor: 'help' }} />
                </OverlayTrigger>
              </Form.Label>
              <Button variant="primary" onClick={openCamera} className="me-2 ms-2 btn-sm">
                {cameraActive ? 'Close Camera' : 'Open Camera'}
              </Button>
              {cameraActive && cameraPermissionGranted && (
                <>
                  <video
                    id="camera-preview"
                    autoPlay
                    style={{ width: '100%', maxWidth: '100%', height: 'auto', marginTop: "1rem" }}
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
                  <img src={capturedPhoto} alt="Captured" style={{ marginTop: "1rem" }} />
                </>
              )}
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
          {cameraPermissionGranted && (
            <>
              <p>Take a selfie for identity verification.</p>
              <Button variant="primary" onClick={openCamera} className="me-2">
                {cameraActive ? 'Close Camera' : 'Open Camera'}
              </Button>
              {cameraActive && cameraPermissionGranted && (
                <>
                  <video
                    id="camera-preview"
                    autoPlay
                    style={{ width: '100%', maxWidth: '100%', height: 'auto', marginTop: "1rem" }}
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
                  <div style={{ maxHeight: '50vh', overflow: 'auto' }}> {/* Estilos para ajustar la imagen */}
                    <img src={verificationPhoto} alt="Captured" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
                  </div>
                </>
              )}
            </>
          )}
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