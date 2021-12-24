import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormGroup, Input } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const Container = {
    marginLeft: '20%',
    marginRight: '15%',
    justifyContent: 'left',
    alignItems: 'left',
    display: 'block'
}

const FormContainer = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',
    textAlign: 'center'
  }

const ButtonStyle = {
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#84C7AE",
    marginTop: "30px",
    color: "#ffffff",
    padding: "3% 7% 3% 7%"
}

export default class NewAdmin extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            last_name: "",
            email: "",
            password: "",
            verifyPassword: "",
            errorPasswords: "",
            match: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validatePasswords();
    }

    validatePasswords() {
        if (this.state.password !== this.state.verifyPassword) {
            this.setState({
                match: false
            });
            console.log("no match");
        }
        else {
            this.setState({
                match: true
            });
            console.log("match");
        }
    }

    render() {
        return (
            <div style={Container}>
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "10%" }}>
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
                <div style={FormContainer}>  
                <Form onSubmit={this.handleSubmit} style={{
          border: "1px solid black", borderRadius: "30px", padding: '4% 5% 4% 5%'
        }}>
                <h4>Регистрация нового</h4>
                <h4>администратора в системе</h4>
                        <FormGroup row style={{ marginTop: "50px"}}>
                            <Col sm={14}>
                                <Input  style={{borderRadius: "10px" }}
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px"}}>
                            <Col sm={14}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Фамилия"
                                    onChange={this.handleChange}
                                    value={this.state.last_name}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px"}}>
                            <Col sm={14}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "30px"}}>
                            <Col sm={14}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <p>{this.state.errorPasswords}</p>
                        <FormGroup row style={{ marginTop: "30px"}}>
                            <Col sm={14}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="verifyPassword"
                                    name="verifyPassword"
                                    type="password"
                                    placeholder="Подтверждение пароля"
                                    onChange={this.handleChange}
                                    value={this.state.verifyPassword}
                                    required
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