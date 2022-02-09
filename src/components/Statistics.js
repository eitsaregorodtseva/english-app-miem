import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Table } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

export default class Statisctics extends Component {
    render() {
        return (
            <div class="Container">
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Статистика</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ marginTop: "5%", textAlign: "center" }}>
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
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}