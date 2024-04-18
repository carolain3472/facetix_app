import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../scss/registro_style.css";
import Swal from "sweetalert2";

/**
 * Componente de formulario de registro.
 */

export function Register_form() {
    const selectedImage = true
  return (
    <div className="padre-registro text-center">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center fw-bold mb-0">FaceTIX</h1>
            <h2 className="text-center fw-bold mb-0">Eventos y más</h2>
            <div className="card my-5 text-center">
              <form
                className="card-body cardbody-color p-lg-5"
              >
                <div>
                  {selectedImage ? (
                    <img
                     src="../images/logo-bolero.png"
                      className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width="200px"
                    />
                  ) : (
                    <img
                      src="../images/logo-bolero.png"
                      className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width="200px"
                    />
                  )}
                </div>

                <div>
                  <button
                    className="btn"
                    type="button"
                  >
                    Escoge tu avatar
                  </button>
                </div>

                <div className="mb-3 my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresa username"
                    /* {...register("username", { required: true })} */
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa Email"
                    /* {...register("email", { required: true })} */
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa contraseña"
                    /* {...register("password", { required: true })} */
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    className="btn btn-danger form-control mt-2"
                    /* disabled={!isFormComplete} */
                  >
                    Enviar
                  </Button>

                  <Modal
                    centered
                    backdrop="static"
                  >
                    <Modal.Header>
                      <Modal.Title>Confirmación de registro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      ¿Estos son los datos que deseas usar?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        type="submit"
                        variant="secondary"
                      >
                        Confirmar
                      </Button>
                      <Button variant="secondary">
                        Cancelar
                      </Button>
                    </Modal.Footer>
                  </Modal>


                </div>
                <div className="form-text text-dark">
                  Ya tienes cuenta?
                  <a className="registrarse" >
                    {" "}
                    {/* navigate */}
                    Inicia sesión
                  </a>
                </div>
                <div className="form-text text-dark">
                  Vuelta al menú?
                  <a className="registrarse">
                    {" "}
                    {/* navigate */}
                    Click aquí
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    /*     <form  >
      <div>

      </div>
      <div>

      </div>
      <div>

      </div>

    </form> */
  );
}