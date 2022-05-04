import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Col, Form, FormGroup, Input } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import CustomNavbar from './Navbar';
import axios from 'axios';
import '../style.css';

const newAdminUrl = 'https://api.unolingua.flareon.ru/people/';

export default function NewAdmin() {
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verify_password, setVerifyPassword] = useState("");
    const [match, setMatch] = useState("");

    useEffect(() => {
        if (password !== verify_password) {
            setMatch("Пароли не совпадают!")
        }
        else {
            setMatch("");
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (match === "") {
            let new_admin = {
                name: name,
                surname: last_name,
                email: email,
                password_admin: password,
                group_user: "Администратор"
            }
            console.log(new_admin);
            axios.post(newAdminUrl, JSON.stringify(new_admin), {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
        }
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        else {
            setVerifyPassword(e.target.value)
        }
    }

    return (
        <div class="Container">
            <header><CustomNavbar /></header>
            <div style={{ marginTop: "100px" }}>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Новый администратор</li>
                    </ol>
                </nav>
            </div>
            <div class="FormContainer">
                <Form onSubmit={handleSubmit} style={{ border: "1px solid black", borderRadius: "30px", padding: '4% 5% 4% 5%' }}>
                    <h4>Регистрация нового</h4>
                    <h4>администратора в системе</h4>
                    <FormGroup row style={{ marginTop: "50px" }}>
                        <Col sm={14}>
                            <Input style={{ borderRadius: "10px" }}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Имя"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: "30px" }}>
                        <Col sm={14}>
                            <Input style={{ borderRadius: "10px" }}
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Фамилия"
                                onChange={(e) => setLastName(e.target.value)}
                                value={last_name}
                                required />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: "30px" }}>
                        <Col sm={14}>
                            <Input style={{ borderRadius: "10px" }}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: "30px" }}>
                        <Col sm={14}>
                            <Input style={{ borderRadius: "10px" }}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                onChange={(e) => handleChange(e)}
                                value={password}
                                required />
                        </Col>
                    </FormGroup>
                    <p style={{color: "red"}}>{match}</p>
                    <FormGroup row style={{ marginTop: "30px" }}>
                        <Col sm={14}>
                            <Input style={{ borderRadius: "10px" }}
                                id="verify_password"
                                name="verify_password"
                                type="password"
                                placeholder="Подтверждение пароля"
                                onChange={(e) => handleChange(e)}
                                value={verify_password}
                                required />
                        </Col>
                    </FormGroup>
                    <button type="submit" class="AdminButtonStyle">Зарегистрировать</button>
                </Form>
            </div>
            <Toaster position="bottom-right" />
        </div>
    )
}
