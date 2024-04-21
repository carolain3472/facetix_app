import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import "../scss/navbarmenu_style.css";

export function Navbar_inicio() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("MisEventos");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <>
      <Container fluid>
        <Navbar
          fixed="top"
          bg="light"
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          <Container>
            <FontAwesomeIcon
              icon={faTicket}
              bounce
              style={{ color: "#000000", marginRight:"0.5em" }}
              size="xl"

            />
            <Navbar.Brand className="me-auto">FaceTix</Navbar.Brand>
            <Nav>
              <Nav.Link
                as={NavLink}
                to="/miseventos"
                onClick={() => handleItemClick("MisEventos")}
                className={location.pathname === "/miseventos" ? "active" : ""}
              >
                Mis Eventos
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/eventos"
                onClick={() => handleItemClick("Eventos")}
                className={location.pathname === "/eventos" ? "active" : ""}
              >
                Eventos
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container>
    </>
  );
}
