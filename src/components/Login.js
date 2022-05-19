import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Fragment, React, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import CustomNavbar from './Fragments/Navbar';
import '../style.css';

const loginUrl = 'https://api.unolingua.flareon.ru/auth/users/login/';

export default function LoginForm() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        toast.error("Неверный логин или пароль!");
      })
  }

  return (
    <div>
      <CustomNavbar login={true} />
      <div className="LoginContainer">
        <Toaster position="top-center" />
        <Form inline onSubmit={handleSubmit} style={{ boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", backgroundColor: "#ffffff", width: "400px", padding: "45px"}}>
          <h4>Вход</h4>
          <FormGroup style={{ marginTop: "10%" }} className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup style={{ marginTop: "10%" }} className="mb-2 me-sm-2 mb-sm-0">
            <Label className="me-sm-2" for="password">
              Пароль
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button color="primary" type="submit" block style={{ marginTop: "10%" }}>
            Войти
          </Button>
        </Form>
        </div>
    </div>
  )
}
