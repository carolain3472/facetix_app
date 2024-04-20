import React, { useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../scss/registro_style.css";
import Swal from "sweetalert2";

export function Register_form() {
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

  const handleLoginSubmit = (event) => {
    event.preventDefault();
  
    // Validar el formulario de inicio de sesión
    if (!loginFormData.email || !loginFormData.password) {
      Swal.fire({
        icon: "error",
        title: "Missing Credentials!",
        text: "Please enter your email and password.",
      });
      return; // Detener la ejecución de la función
    }
  
    // Simular una petición de inicio de sesión
    // Aquí puedes hacer la petición HTTP real a tu backend
    // Por ahora, solo simulamos una respuesta exitosa (código 200)
    const loginResponse = { status: 200 };
  
    // Verificar la respuesta del servidor
    if (loginResponse.status === 200) {
      // Si la respuesta es exitosa, muestra un mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in.",
      });
    } else {
      // Si hay un error en la respuesta, muestra un mensaje de error
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password.",
      });
    }
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
  
    // Si el correo electrónico es válido y las contraseñas coinciden, se muestra una alerta de éxito
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "You have successfully registered.",
    });
  
    // Aquí puedes hacer lo que necesites con los datos del formulario de registro, incluida la imagen de perfil
    console.log("Register form data:", registerFormData);
  };

  const handleMenu = () => {
    navigate("/")
  }


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
          style={{ width: "5em", marginLeft: "1rem"}}
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
              <Form.Group controlId="formBasicProfileImage">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                />
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
