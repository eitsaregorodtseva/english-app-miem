import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Input, Label, List, Badge } from "reactstrap";
import CustomNavbar from './Navbar';
import Videos from './Videos';
import Vocabulary from './Vocabulary';
import Phrases from './Phrases';
import Rules from './Rules';
import Dialogs from './Dialogs';
import '../style.css';

const BadgePills = {
    padding: "1% 5% 1% 5%"
}

export default class Editing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: [
                {
                    id: 1,
                    lessons_info: [{ video_st: 'Готов', leks_st: 'Готов', phr_st: 'Готов', dialog_st: 'Пусто', rules_st: 'Пусто' }],
                    video: [],
                    leks: [],
                    phr: [],
                    dialog: [],
                    rules: []
                },
            ],
            selectState: true,
            lessonState: true,
            description: "",
        }
        this.openLessonSelect = this.openLessonSelect.bind(this);
        this.openLesson = this.openLesson.bind(this);
        this.addNewLesson = this.addNewLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
    };

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({selectState: false,
            lessonState: false});
        }
    }

    handleCallbackVideo = (propsVideos) => {
        let newLessons = this.state.lessons;
        newLessons[0].video = propsVideos;
        this.setState({ lessons: newLessons });
    }

    handleCallbackVoc = (propsVocabulary) => {
        let newLessons = this.state.lessons;
        newLessons[0].leks = propsVocabulary;
        this.setState({ lessons: newLessons });
    }

    handleCallbackPhr = (propsPhrases) => {
        let newLessons = this.state.lessons;
        newLessons[0].phr = propsPhrases;
        this.setState({ lessons: newLessons });
    }

    handleCallbackDialog = (propsDialogs) => {
        let newLessons = this.state.lessons;
        newLessons[0].dialog = propsDialogs;
        this.setState({ lessons: newLessons });
    }

    handleCallbackRule = (propsRules) => {
        let newLessons = this.state.lessons;
        newLessons[0].rules = propsRules;
        this.setState({ lessons: newLessons });
    }

    addNewLesson() {
        this.setState({
            lessons: [...this.state.lessons, { id: this.state.lessons.length + 1 }],
        })

        console.log(this.state.lessons);
    }

    deleteLesson(buttonKey) {
        console.log(buttonKey);
        let lessons = this.state.lessons.filter(item => item.id !== buttonKey);
        for (var i = 0; i < lessons.length; i++) {
            lessons[i].id = i + 1;
            console.log(lessons[i].id);
        }
        this.setState({ lessons: lessons });
    }

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
            <div class="Container">
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Редактирование</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Form row>
                        <FormGroup row>
                            <Label sm={3}>Выберите блок:</Label>
                            <Col sm={4}><Input type="select" value={this.props.location.state ? this.props.location.state.block_id : ""}>
                                <option>1</option></Input></Col>
                            <Col><button type="button" class="GreyButton" onClick={this.openLessonSelect}>Выбрать</button></Col>
                        </FormGroup>
                    </Form>
                    <Form row hidden={this.state.selectState}>
                        <FormGroup row>
                            <Label sm={3}>Выберите номер урока:</Label>
                            <Col sm={4}><Input type="select"  value={this.props.location.state ? this.props.location.state.lesson_id : ""}></Input></Col>
                            <Col><button type="button" class="GreyButton" onClick={this.openLesson}>Выбрать</button></Col>
                        </FormGroup>
                    </Form>
                </div>
                <div hidden={this.state.lessonState}>
                    <div style={{ marginTop: "7%", marginBottom: "5%" }}>
                        <Form row>
                            <FormGroup row>
                                <Label sm={2}>Название блока:</Label>
                                <Col sm={3}><Input type="text" value={this.props.location.state ? this.props.location.state.block_id : ""}></Input></Col>
                                <Col><button type="button" class="GreyButton">Изменить</button></Col>
                            </FormGroup>
                        </Form>
                    </div>
                    <div style={{ marginTop: "7%" }}>
                        <button disabled class="GreyBox">Урок 1</button>
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
                        <div style={{ marginTop: "5%", marginLeft: "3%", width: "90%" }} >
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
                                <div class="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                                    <Videos video={Object.assign(this.state.lessons[0].video)} parentCallback={this.handleCallbackVideo} />
                                </div>
                                <div class="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                    <Vocabulary leks={Object.assign(this.state.lessons[0].leks)} parentCallback={this.handleCallbackVoc} />
                                </div>
                                <div class="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                    <Phrases phr={Object.assign(this.state.lessons[0].phr)} parentCallback={this.handleCallbackPhr} />
                                </div>
                                <div class="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                    <Dialogs dialog={Object.assign(this.state.lessons[0].dialog)} parentCallback={this.handleCallbackDialog} />
                                </div>
                                <div class="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                    <Rules rule={Object.assign(this.state.lessons[0].rules)} parentCallback={this.handleCallbackRule} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button disabled class="GreyBox">Статусы</button>
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
                        <button type="button" class="ViewLesson">Предпросмотр</button>
                        <button type="button" class="DeleteLesson" onClick={this.deleteLesson}>Удалить урок</button>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button disabled class="GreyBox">Описание</button>
                        <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="7"></Input>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button type="button" class="Cancel">Отменить</button>
                        <button type="button" class="Save">Сохранить изменения</button>
                    </div>
                </div>
            </div>
        )
    }
}