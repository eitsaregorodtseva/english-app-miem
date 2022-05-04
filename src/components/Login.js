import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { React, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Col, Form, FormGroup, Input } from "reactstrap";
import NavbarLogin from './NavbarLogin';
import '../style.css';

const loginUrl = 'https://api.unolingua.flareon.ru/auth/users/login/';

export default function LoginForm() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: email,
      password: password
    };

    console.log(email);
    console.log(password);
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    axios.post(loginUrl, JSON.stringify({ user }), {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const token = res.data.token;
        const email = res.data.email;
        const username = res.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        history.push("/menu");

      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.errors.error[0]);
        setErrorMessage("Такого пользователя не существует!");
      })
  }

  return (
    <div>
      <header><NavbarLogin /></header>
      <div class="LoginContainer">
        <Form onSubmit={handleSubmit} style={{
          border: "none", borderRadius: "49px",
          backgroundColor: "rgba(193, 227, 214, 0.4)", fontSize: "20px", padding: '44px'
        }}>
          <h4>Панель администратора</h4>
          <FormGroup row style={{ marginTop: "10%" }}>
            <Col sm={14}>
              <Input style={{ borderRadius: "10px" }}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row style={{ marginTop: "10%" }}>
            <Col sm={14}>
              <Input style={{ borderRadius: "10px" }}
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Col>
          </FormGroup>
          <p style={{marginTop: "7%", marginBottom: "-2%", color: "red"}}>{errorMessage}</p>
          <button class="LoginButtonStyle" type="submit">
            Войти
          </button>
        </Form>
      </div>
    </div>
  )
}
