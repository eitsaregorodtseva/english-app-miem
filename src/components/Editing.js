import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Form, FormGroup, Input, Label, List, Badge } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const Container = {
    marginLeft: '20%',
    marginRight: '15%',
    marginBottom: "10%",
    justifyContent: 'left',
    alignItems: 'left',
    display: 'block'
}
const BadgePills = {
    padding: "1% 5% 1% 5%"
}
const neutralButton = {
    padding: "1% 5% 1% 5%",
    backgroundColor: "rgba(132, 199, 174, 0.5)",
    color: "#000000",
    border: "none"
}
const GreyButton = {
    padding: "1% 4% 1% 4%",
    backgroundColor: "#C4C4C4",
    color: "#000000",
    border: "none"
}
const GreyBox = {
    width: "94%",
    padding: "1% 7% 1% 7%",
    backgroundColor: "#C4C4C4",
    color: "#000000",
    border: "none"
}
const ViewLesson = {
    marginLeft: "20%",
    backgroundColor: "rgba(45, 156, 219, 0.48)",
    color: "#000000",
    border: "none",
    padding: "1% 5% 1% 5%"
}
const DeleteLesson = {
    marginLeft: "10%",
    backgroundColor: "#E02929",
    color: "#000000",
    border: "none",
    padding: "1% 5% 1% 5%"
}
const Cancel = {
    marginLeft: "20%",
    backgroundColor: "rgba(235, 87, 87, 0.5)",
    color: "#000000",
    border: "none",
    padding: "1% 5% 1% 5%"
}
const Save = {
    marginLeft: "10%",
    backgroundColor: "rgba(132, 199, 174, 0.5)",
    color: "#000000",
    border: "none",
    padding: "1% 5% 1% 5%"
}


export default class Editing extends Component {
    constructor() {
        super();
        this.state = {
            selectState: true,
            lessonState: true
        }
        this.openLessonSelect = this.openLessonSelect.bind(this);
        this.openLesson = this.openLesson.bind(this);
    };

    openLessonSelect() {
        this.setState({
            selectState: false
        })
    }

    openLesson() {
        this.setState({
            lessonState: false
        })
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
                            Редактирование
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Form row>
                        <FormGroup row>
                            <Label sm={3}>Выберите блок:</Label>
                            <Col sm={4}><Input type="select"></Input></Col>
                            <Col><Button style={GreyButton} onClick={this.openLessonSelect}>Выбрать</Button></Col>
                        </FormGroup>
                    </Form>
                    <Form row hidden={this.state.selectState}>
                        <FormGroup row>
                            <Label sm={3}>Выберите номер урока:</Label>
                            <Col sm={4}><Input type="select"></Input></Col>
                            <Col><Button style={GreyButton} onClick={this.openLesson}>Выбрать</Button></Col>
                        </FormGroup>
                    </Form>
                </div>
                <div hidden={this.state.lessonState}>
                    <div style={{ marginTop: "7%", marginBottom: "5%" }}>
                        <Form row>
                            <FormGroup row>
                                <Label sm={2}>Название блока:</Label>
                                <Col sm={3}><Input type="text"></Input></Col>
                                <Col><Button style={GreyButton}>Изменить</Button></Col>
                            </FormGroup>
                        </Form>
                    </div>
                
                <div style={{ marginTop: "7%" }}>
                    <Button disabled style={GreyBox}>Урок 1</Button>
                    <div style={{ marginTop: "5%", marginLeft: "3%" }}>
                        <List>
                            <FormGroup row>
                                <Label sm={3}>Видео</Label>
                                <Col sm={9}>
                                    <Badge pill color="warning" style={BadgePills}>В процессе</Badge>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Буквы-слова</Label>
                                <Col sm={9}>
                                    <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Фразы</Label>
                                <Col sm={9}>
                                    <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Диалог</Label>
                                <Col sm={9}>
                                    <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Правила</Label>
                                <Col sm={9}>
                                    <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                                </Col>
                            </FormGroup>
                        </List>
                    </div>
                    <div style={{marginTop: "5%", marginLeft: "3%", width: "60%"}} >
                        <nav>
                        <div class="nav nav-pills" id="myTab" role="tablist">
                            <button class="nav-link active" id="video-tab" data-bs-toggle="tab" data-bs-target="#video" type="button" role="tab" aria-controls="video" aria-selected="true">Видео</button>
                            <button class="nav-link" id="letter-tab" data-bs-toggle="tab" data-bs-target="#letter" type="button" role="tab" aria-controls="letter" aria-selected="false">Буквы-слова</button>
                            <button class="nav-link" id="phrase-tab" data-bs-toggle="tab" data-bs-target="#phrase" type="button" role="tab" aria-controls="phrase" aria-selected="false">Фразы</button>
                            <button class="nav-link" id="dialog-tab" data-bs-toggle="tab" data-bs-target="#dialog" type="button" role="tab" aria-controls="dialog" aria-selected="false">Диалоги</button>
                            <button class="nav-link" id="rule-tab" data-bs-toggle="tab" data-bs-target="#rule" type="button" role="tab" aria-controls="rule" aria-selected="false">Правила</button>
                        </div>
                        </nav>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">1</div>
                            <div class="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">2</div>
                            <div class="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">3</div>
                            <div class="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">4</div>
                            <div class="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">5</div>
                        </div>
                    </div>
                    {/* <div style={{ marginLeft: "6%", marginTop: "5%" }}>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новое видео</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новые буквы-слова</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новая фраза</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новый диалог</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новое правило</Button></div>
                    </div> */}
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Button disabled style={GreyBox}>Статусы</Button>
                    <div style={{ marginTop: "5%", marginLeft: "25%" }}>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>Видео</Label>
                                <Col sm={3}>
                                    <Input type="select"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Буквы-слова</Label>
                                <Col sm={3}>
                                    <Input type="select"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Фразы</Label>
                                <Col sm={3}>
                                    <Input type="select"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Диалог</Label>
                                <Col sm={3}>
                                    <Input type="select"></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Правила</Label>
                                <Col sm={3}>
                                    <Input type="select"></Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Button style={ViewLesson}>Предпросмотр</Button>
                    <Button style={DeleteLesson}>Удалить урок</Button>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Button disabled style={GreyBox}>Описание</Button>
                    <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="7"></Input>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Button style={Cancel}>Отменить</Button>
                    <Button style={Save}>Сохранить изменения</Button>
                </div>
            </div>
            </div>
        )
    }
}