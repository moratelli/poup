import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./styles.css";
import logo from "../../img/poup-logo-no-shadow.png";
import api from "../../services/api";

const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return setValidated(true);
    }

    if ((password || confirmPassword) && password !== confirmPassword) {
      setShowError(true);
      return setErrorMessage("As duas senhas devem ser iguais!");
    }

    try {
      const response = await api.post("/api/auth/register", {
        name,
        username: email,
        email,
        password,
        role: ["user"],
      });

      const { message } = response.data;

      setValidated(true);
      return history.push({ pathname: "/", state: { successMessage: message } });
    } catch (err) {
      setValidated(false);
      setShowError(true);
      return setErrorMessage("O e-mail informado já está em uso!");
    }
  };

  return (
    <Container fluid id="register-container">
      <Row
        noGutters
        className="h-100 align-items-center justify-content-center"
      >
        <Col md="7" />
        <Col md="5">
          <section id="login-box" className="text-center col-md-6 mx-auto">
            <header className="mb-5">
              <img src={logo} alt="Logo" />
            </header>
            <Form
              id="register-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Collapse in={showError} timeout={100}>
                <div>
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setShowError(false)}
                  >
                    {errorMessage}
                  </Alert>
                </div>
              </Collapse>
              <Form.Group>
                <Form.Control
                  type="name"
                  id="nome"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe um nome.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe um e-mail válido.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  id="senha"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Informe uma senha.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  id="confirmar-senha"
                  placeholder="Confirmar senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Repita a senha informada.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-5">
                <Button
                  variant="info"
                  block
                  className="font-weight-bold"
                  id="register-button"
                  type="submit"
                >
                  REGISTRAR
                </Button>
              </Form.Group>
            </Form>
            <footer className="text-center">
              <Link to="/">Já possui uma conta?</Link>
            </footer>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
