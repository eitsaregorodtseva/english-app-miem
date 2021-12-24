import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const Container = {
    marginLeft: '20%',
    marginRight: '15%',
    justifyContent: 'left',
    alignItems: 'left',
    display: 'block'
}

export default class Statisctics extends Component {
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
                            Статистика
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div style={{ marginTop: "5%", textAlign: "center"}}>
                    <Table hover responsive bordered>
                        <thead>
                            <tr>
                                <th>
                                    Имя
                                </th>
                                <th>
                                    Фамилия
                                </th>
                                <th>
                                    Страна
                                </th>
                                <th>
                                    Прогресс
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