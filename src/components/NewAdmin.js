import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Input } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

export default class NewAdmin extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            last_name: "",
            email: "",
            password: "",
            //verify_password: "",
            //match: false,
            //errorPasswords: ""
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
        const new_admin = {
            name: this.state.name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }
        console.log(new_admin);

    }

    /*validatePasswords() {
        if (this.state.password !== this.state.verify_password) {
            this.setState({
                match: false,
                errorPasswords: "Пароли не совпадают!",
            });
        }
        else {
            this.setState({
                match: true,
                errorPasswords: "",
            });
        }
        return this.state.match;
    }*/

    render() {
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
                    <Form onSubmit={this.handleSubmit} style={{ border: "1px solid black", borderRadius: "30px", padding: '4% 5% 4% 5%' }}>
                        <h4>Регистрация нового</h4>
                        <h4>администратора в системе</h4>
                        <FormGroup row style={{ marginTop: "50px" }}>
                            <Col sm={14}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Имя"
                                    onChange={this.handleChange}
                                    value={this.state.name}
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
                                    onChange={this.handleChange}
                                    value={this.state.last_name}
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
                                    onChange={this.handleChange}
                                    value={this.state.email}
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
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    required />
                            </Col>
                        </FormGroup>
                        {/*<p>{this.state.errorPasswords}</p>
                        <FormGroup row style={{ marginTop: "30px" }}>
                            <Col sm={14}>
                                <Input style={{ borderRadius: "10px" }}
                                    id="verify_password"
                                    name="verify_password"
                                    type="password"
                                    placeholder="Подтверждение пароля"
                                    onChange={this.handleChange}
                                    value={this.state.verify_password}
                                    required />
                            </Col>
        </FormGroup>*/}
                        <button type="submit" class="AdminButtonStyle">Зарегистрировать</button>
                    </Form>
                </div>
            </div>
        )
    }
}