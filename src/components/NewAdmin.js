import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Button, Col, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Badge } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import CustomNavbar from './Fragments/Navbar';
import axios from 'axios';
import '../style.css';

const newAdminUrl = 'https://api.unolingua.flareon.ru/auth/users/regist';

export default function NewAdmin() {
    const [username, setUserName] = useState("");
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
            let user = {
                username: username,
                email: email,
                password: password
            }
            console.log(JSON.stringify(user));
            axios.post(newAdminUrl, JSON.stringify({ user }), {
                headers: {
                    Authorization: `Token ${localStorage.token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        toast.success("Администратор успешно добавлен.");
                    }
                }, (error) => {
                    console.log(error);
                    toast.error("Не удалось добавить нового администратора.");
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
            <header><CustomNavbar login={false} /></header>
            <div style={{ marginTop: "100px" }}>
                <Breadcrumb listTag="div">
                    <BreadcrumbItem
                        href="/menu"
                        tag="a">
                        Меню
                    </BreadcrumbItem>
                    <BreadcrumbItem
                        active
                        tag="span">
                        Новый администратор
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="FormContainer">
                <Form onSubmit={handleSubmit} style={{ border: "1px solid black", borderRadius: "30px", padding: '4% 5% 4% 5%' }}>
                    <h4>Регистрация</h4>
                    <h4>нового администратора</h4>
                    <FormGroup row style={{ marginTop: "50px" }}>
                        <Col sm={14}>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setUserName(e.target.value)}
                                value={username}
                                required />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{ marginTop: "30px" }}>
                        <Col sm={14}>
                            <Input
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
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                onChange={(e) => handleChange(e)}
                                value={password}
                                required />
                        </Col>
                    </FormGroup>
                    {match !== "" ?
                        <p style={{ backgroundColor: "#f7b3b3", marginTop: "30px", padding: "10px 0px 10px 0px" }}>{match}</p> :
                        <div></div>}
                    <FormGroup row style={{ marginTop: "30px" }}>
                        <Col sm={14}>
                            <Input
                                id="verify_password"
                                name="verify_password"
                                type="password"
                                placeholder="Подтверждение пароля"
                                onChange={(e) => handleChange(e)}
                                value={verify_password}
                                required />
                        </Col>
                    </FormGroup>
                    <Button type="submit" block color='primary' style={{ marginTop: "10%" }}>Зарегистрировать</Button>
                </Form>
            </div>
            <Toaster position="bottom-right" />
        </div>
    )
}
