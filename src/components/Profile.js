import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

export default class Profile extends Component {
    render() {
        return (
            <div class="Container">
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Личные данные</li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <Form>
                        <FormGroup row style={{ marginTop: "7%" }}>
                            <Label
                                for="name"
                                sm={2}
                            >
                                Имя
                            </Label>
                            <Col sm={10}>
                                <Input style={{ width: "40%", borderRadius: "10px" }}
                                    id="name"
                                    name="name"
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "20px" }}>
                            <Label
                                for="last_name"
                                sm={2}
                            >
                                Фамилия
                            </Label>
                            <Col sm={10}>
                                <Input style={{ width: "40%", borderRadius: "10px" }}
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    disabled
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{ marginTop: "20px" }}>
                            <Label
                                for="email"
                                sm={2}
                            >
                                Email
                            </Label>
                            <Col sm={10}>
                                <Input style={{ width: "40%", borderRadius: "10px" }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={localStorage.email}
                                    disabled
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div style={{ marginTop: "10%" }}>
                    <h4>История изменений</h4>
                    <Table hover responsive bordered style={{ textAlign: "center", marginTop: "2%" }}>
                        <thead>
                            <tr>
                                <th>
                                    Дата изменения
                                </th>
                                <th>
                                    Описание
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Table cell
                                </td>
                                <td>
                                    Table cell
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Table cell
                                </td>
                                <td>
                                    Table cell
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Table cell
                                </td>
                                <td>
                                    Table cell
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}