import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormGroup, Input } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const Container = {
    minWidth: "400px",
    textAlign: "center",
    marginTop: '5%',
    marginLeft: '25%',
    marginRight: '33%',
    border: '1px solid #000000',
    borderRadius: '20px',
    paddingTop: '3%',
    paddingBottom: '3%'
}

const LeftContainer = {
    marginLeft: '20%',
    marginRight: '15%',
    justifyContent: 'left',
    alignItems: 'left',
    display: 'block'
}

const ButtonStyle = {
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#84C7AE",
    marginTop: "30px",
    color: "#ffffff",
    padding: "3% 7% 3% 7%"
}

export default class Profile extends Component {
    render() {
        return (
            <div style={ LeftContainer }>
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <Breadcrumb listTag="div">
                        <BreadcrumbItem
                            href="/menu"
                            tag="a"
                        >
                            Меню
                        </BreadcrumbItem>
                        <BreadcrumbItem
                            active
                            tag="span"
                        >
                            Новый администратор
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                
                <Form  style={ Container }>
                <h4 style={{ textAlign: "center"}}>Регистрация нового администратора в системе</h4>
                        <FormGroup row style={{ marginTop: "50px", paddingLeft: '13%', }}>
                            <Col sm={10}>
                                <Input  style={{borderRadius: "10px" }}
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px", paddingLeft: '13%', }}>
                            <Col sm={10}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Фамилия"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px", paddingLeft: '13%', }}>
                            <Col sm={10}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px", paddingLeft: '13%', }}>
                            <Col sm={10}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px", paddingLeft: '13%', }}>
                            <Col sm={10}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="verifyPassword"
                                    name="verifyPassword"
                                    type="password"
                                    placeholder="Подтверждение пароля"
                                />
                            </Col>
                        </FormGroup>
                        <Button style={ ButtonStyle }>
                            Зарегистрировать
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}