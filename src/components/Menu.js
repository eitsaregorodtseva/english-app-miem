import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { ListGroup, ListGroupItem } from "reactstrap";
import CustomNavbar from './Navbar';
import new_block from '../static/icons/new_block.svg';
import tasks from '../static/icons/tasks.svg';
import profile from '../static/icons/profile.svg';
import analytics from '../static/icons/analytics.svg';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import new_admin from '../static/icons/new_admin.svg';
import '../style.css';

const MenuContainer = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10%'
}

const MenuItems = {
    border: "none",
    lineHeight: "45px"
}
export default class Menu extends Component {
    render() {
        return (
            <div>
                <header><CustomNavbar /></header>
                <div style={MenuContainer}>
                    <ListGroup style={{
                        border: "1px solid rgba(217, 244, 234, 0.4)", borderRadius: "40px",
                        backgroundColor: "rgba(217, 244, 234, 1)", fontSize: "20px"
                    }}>
                        <ListGroupItem
                            style={{
                                lineHeight: "45px", backgroundColor: "rgba(217, 244, 234, 0.4)",
                                border: "1px solid rgba(217, 244, 234, 0.4)", textAlign: "center"
                            }}>
                            Меню</ListGroupItem>
                        <ListGroupItem
                            action
                            href="/new_block"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={new_block} alt="" />Новый блок
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/cabinet"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={tasks} alt="" />Уроки
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/profile"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={profile} alt="" />Личные данные
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/statistics"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={analytics} alt="" />Статистика
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/history"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={history} alt="" />История изменений
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/editing"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={edit} alt="" />Редактирование
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/new_admin"
                            tag="a"
                            style={MenuItems}
                        >
                            <img src={new_admin} alt="" />
                            <span style={{ paddingRight: "20px" }}>Новый администратор</span>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        )
    }
}
