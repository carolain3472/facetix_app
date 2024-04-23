import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { api } from "../api/api_base";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../scss/registro_style.css";
import Swal from "sweetalert2";

export function Register_form() {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    profileImage: null, // Aquí almacenaremos la imagen seleccionada
    previewImage: null, // Aquí almacenaremos la vista previa de la imagen seleccionada
  });
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]; // Obtenemos el archivo de imagen seleccionado
    const imageURL = URL.createObjectURL(imageFile); // Creamos una URL para la vista previa de la imagen
    setRegisterFormData({
      ...registerFormData,
      profileImage: imageFile,
      previewImage: imageURL,
    }); // Almacenamos la imagen y su vista previa en el estado local
  };

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Realiza una solicitud POST al servidor para el inicio de sesión
    const email = loginFormData.email;
    const password = loginFormData.password;
    console.log(loginFormData.email);
    console.log(loginFormData.password);
    axios;
    api
      .post("/users/login/", { email, password }, { headers })
      .then((response) => {
        console.log(response);
        // Cuando la solicitud es exitosa
        if (response.status == 200) {
          sessionStorage.setItem("email", loginFormData.email);
          sessionStorage.setItem("usuario", JSON.stringify(response.data));
          sessionStorage.setItem("usuario_id", response.data.user.id);
          navigate("/miseventos")

          Swal.fire({
            icon: "success",
            title: "Operación exitosa",
            text: "Se ha iniciado sesión correctamente",
            showConfirmButton: false,
            allowOutsideClick: false,
            showCancelButton: false,
            timer: 1800,
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página actual
              
            }
          });
        } else {
          setLoginError("Usuario o contraseña incorrectos");
          console.log("No pudo validar el inicio de sesión");

          Swal.fire({
            icon: "warning",
            title: "Datos incorrectos",
            text: "Verifica tus credenciales",
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
          title: "Opps, parece que no existes",
          text: "¡Unete!",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 1800,
        });
      });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    // Validar el correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerFormData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email!",
        text: "Please enter a valid email address.",
      });
      return; // Detener la ejecución de la función
    }

    // Validar la coincidencia de contraseñas
    if (registerFormData.password !== registerFormData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please make sure your passwords match.",
      });
      return; // Detener la ejecución de la función
    }

    // Realiza una solicitud POST al servidor para el inicio de sesión
    const first_name = registerFormData.name;
    const username = registerFormData.username;
    const email = registerFormData.email;
    const password = registerFormData.password;
    const photo = capturedPhoto;

    console.log(first_name);
    console.log(username);
    console.log(email);
    console.log(password);

    axios;
    api
      .post(
        "/users/",
        { first_name, email, username, password, photo },
        { headers }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.valid);
        // Cuando la solicitud es exitosa
        if (response.status == 200 || response.status == 201) {
          sessionStorage.setItem("usuario", JSON.stringify(response.data));
          navigate("/miseventos");

          Swal.fire({
            icon: "success",
            title: "Operación exitosa",
            text: "Se ha iniciado sesión correctamente",
            showConfirmButton: false,
            allowOutsideClick: false,
            showCancelButton: false,
            timer: 1800,
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir a la página actual
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Datos incorrectos",
            text: "Verifica tus credenciales",
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
          title: "Opps, parece que no existes",
          text: "¡Unete!",
          showConfirmButton: false,
          allowOutsideClick: false,
          showCancelButton: false,
          timer: 1800,
        });
      });
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

    setCapturedPhoto(photoURL); // Almacenar la foto tomada para comprar ticket
    setPhotoTaken(true);
    openCamera();
  };

  useEffect(() => {
    if (stream && cameraActive) {
      const video = document.getElementById("camera-preview");
      video.srcObject = stream;
    }
  }, [stream, cameraActive]);

  const handleMenu = () => {
    navigate("/");
  };

  return (
    <Container
      fluid
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7d7c7d",
      }}
    >
      <Row
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 999,
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
          backgroundColor: "#333233",
        }}
        className="justify-content-center" // Centra los elementos horizontalmente
      >
        <Button
          style={{ width: "5em", marginRight: "1rem" }}
          onClick={() => handleTabChange("login")}
          variant={activeTab === "login" ? "warning" : "outline-warning"}
        >
          Login
        </Button>
        <Button
          style={{ width: "5em", marginLeft: "1rem", marginRight: "1rem" }}
          onClick={() => handleTabChange("register")}
          variant={activeTab === "register" ? "warning" : "outline-warning"}
        >
          Register
        </Button>
        <Button
          style={{ width: "5em", marginLeft: "1rem" }}
          variant="outline-secondary"
          onClick={() => handleMenu()}
        >
          Menú
        </Button>
      </Row>
      <Container
        style={{
          maxWidth: "500px",
          width: "100%",
          marginTop: "3rem",
          borderRadius: "10px",
          boxShadow: "0 0 30px rgba(0,0,0,0.6)", // Añadir sombra al contenedor
          padding: "2rem", // Añadir relleno al contenedor
        }}
      >
        <Form
          style={{
            width: "100%",
            opacity: activeTab === "login" ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
          onSubmit={handleLoginSubmit}
        >
          {activeTab === "login" && (
            <>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="warning" type="submit">
                  Login
                </Button>
              </div>
            </>
          )}
        </Form>
        <Form
          style={{
            width: "100%",
            opacity: activeTab === "register" ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
          onSubmit={handleRegisterSubmit}
        >
          {activeTab === "register" && (
            <>
              {/* Vista previa de la imagen de perfil */}
              {registerFormData.previewImage && (
                <div className="profile-image-preview-container text-center mb-3">
                  <div
                    className="profile-image-preview"
                    style={{
                      backgroundImage: `url(${registerFormData.previewImage})`,
                    }}
                  />
                </div>
              )}
              <Form.Group controlId="formSelfie" className="mb-3">
                <Form.Label>
                  Take a Selfie{" "}
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-info">
                        Al tomar una selfie, estás contribuyendo a mejorar la
                        seguridad y la experiencia de todos los asistentes al
                        evento. Utilizaremos esta imagen para verificar tu
                        identidad al momento de validar tu entrada. Este proceso
                        nos ayuda a garantizar que solo los compradores
                        originales puedan acceder al evento, lo que reduce
                        significativamente la posibilidad de reventa de entradas
                        y garantiza una experiencia más justa y segura para
                        todos. ¡Gracias por tu cooperación en mantener nuestros
                        eventos seguros y protegidos!
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
                    <Button
                      variant="success"
                      onClick={takePhoto}
                      className="me-2"
                    >
                      Take Photo
                    </Button>
                  </>
                )}
                {photoTaken && (
                  <>
                    <h2 className="mb-2">Photo Taken</h2>
                    <img
                      src={capturedPhoto}
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
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={registerFormData.name}
                  onChange={handleRegisterChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={registerFormData.username}
                  onChange={handleRegisterChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={registerFormData.email}
                  onChange={handleRegisterChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registerFormData.password}
                  onChange={handleRegisterChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={registerFormData.confirmPassword}
                  onChange={handleRegisterChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="warning" type="submit">
                  Register
                </Button>
              </div>
            </>
          )}
        </Form>
      </Container>
    </Container>
  );
}
