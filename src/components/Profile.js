import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Form, FormGroup, Input, Label, Table } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const Container = {
    marginLeft: '20%',
    marginRight: '15%',
    justifyContent: 'left',
    alignItems: 'left',
    display: 'block'
}


export default class Profile extends Component {
    render() {
        return (
            <div style={Container}>
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
                            Личные данные
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <Form>
                        <FormGroup row style={{ marginTop: "80px" }}>
                            <Label 
                                for="name"
                                sm={2}
                            >
                                Имя
                            </Label>
                            <Col sm={10}>
                                <Input  style={{ width: "40%", borderRadius: "10px" }}
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