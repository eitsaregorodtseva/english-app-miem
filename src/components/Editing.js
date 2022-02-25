import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Col, Button, Form, FormGroup, Input, Label, List, Badge } from "reactstrap";
import CustomNavbar from './Navbar';
import Videos from './Videos';
import Vocabulary from './Vocabulary';
import Phrases from './Phrases';
import Rules from './Rules';
import Dialogs from './Dialogs';
import Statuses from './Statuses';
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
                    video: [],
                    leks: [],
                    phr: [],
                    dialog: [],
                    rules: []
                },
            ],
            id_lb: null,
            id_les: null,
            lesson: [],
            blocks: [],
            description: "",
            statuses: {},
            selectState: true,
            lessonState: true,
            buttonsState: true,
        }
    };

    componentDidMount() {
        fetch('http://172.18.130.45:5052/api/lessonblocks/')
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({ blocks: data });
            });
        if (this.props.location.state) {
            //console.log(this.props.location.state);
            let lesson= [];
            for (var i = 0; i < this.props.location.state.blocks.length; i++) {
                if (this.props.location.state.blocks[i].id_lb === this.props.location.state.id_lb) {
                    lesson = this.props.location.state.blocks[i].lesson;
                }
            }
            this.setState({
                id_lb: this.props.location.state.id_lb,
                id_les: this.props.location.state.id_les,
                lesson: lesson,
                buttonsState: false,
                selectState: false,
                lessonState: false,
                buttonsState: false
            });
        };
        //console.log(this.props.location.state.lesson);  
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

    openLessonSelect = () => {
        this.setState({
            selectState: false
        })
    }

    /*openLesson = () => {
        this.setState({
            lessonState: false
        })
    }*/

    openEmptyLesson = () => {
        this.setState({
            lessonState: false,
            selectState: true
        })
    }

    /*openLessonButtons = () => {
        this.setState({
            buttonsState: false
        })
    }*/

    deleteLesson = () => {

    }

    blockChange = (id_lb) => {
        console.log(id_lb);
        id_lb = parseInt(id_lb);
        let lesson = [];
        let buttonsState = true;
        if (id_lb !== 0) {
            for (var i = 0; i < this.state.blocks.length; i++) {
                if (this.state.blocks[i].id_lb === parseInt(id_lb)) {
                    lesson = this.state.blocks[i].lesson;
                }
            }
            buttonsState = false;
        }
        this.setState({
            id_lb: id_lb,
            lesson: lesson,
            buttonsState: buttonsState,
            lessonState: true,
            selectState: true
        });
    }

    lessonChange = (id_les) => {
        id_les = parseInt(id_les);
        let lessonState = true;
        if (id_les !== 0) {
            lessonState = false;
        }
        this.setState({
            id_les: id_les,
            lessonState: lessonState,
        });
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
                            <Col sm={4}>
                                <Input type="select" value={this.state.id_lb ? this.state.id_lb : "0"} onChange={(e) => this.blockChange(e.target.value)}>
                                    <option value={0} key={0}>Выберите блок</option>
                                    {this.state.blocks.map((obj, i) => (
                                        <option value={obj.id_lb} key={obj.id_lb}>{obj.id_lb}</option>
                                    ))}
                                </Input></Col>
                            {/*<Col><button type="button" class="GreyButton" onClick={this.openLessonButtons}>Выбрать</button></Col>*/}
                        </FormGroup>
                    </Form>
                    <div row hidden={this.state.buttonsState}>
                        <Button color={this.state.selectState === true ? "primary" : "secondary"} type="button" onClick={this.openEmptyLesson}>Новый урок</Button>
                        <Button color={this.state.selectState === false ? "primary" : "secondary"} type="button" onClick={this.openLessonSelect}>Выбрать урок</Button>
                    </div>
                    <Form row hidden={this.state.selectState}>
                        <FormGroup row>
                            <Label sm={3}>Выберите номер урока:</Label>
                            <Col sm={4}>
                                <Input type="select" value={this.state.id_les ? this.state.id_les : "0"} onChange={(e) => this.lessonChange(e.target.value)}>
                                    <option value={0} key={0}>Выберите урок</option>
                                    {this.state.lesson.map((obj, j) => (
                                        <option value={obj.id_les} key={obj.id_les}>{obj.id_les}</option>
                                    ))}
                                </Input></Col>
                            {/*<Col><button type="button" class="GreyButton" onClick={this.openLesson}>Выбрать</button></Col>*/}
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
                        {/*<div style={{ marginTop: "5%", marginLeft: "3%" }}>
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
        </div>*/}
                        <div style={{ marginTop: "5%", marginLeft: "3%", width: "90%" }} >
                            <nav>
                                <div class="nav nav-pills" id="myTab" role="tablist">
                                    <button class="nav-link active" id="video-tab" data-bs-toggle="tab" data-bs-target="#video" type="button" role="tab" aria-controls="video" aria-selected="true">Видео</button>
                                    <button class="nav-link" id="letter-tab" data-bs-toggle="tab" data-bs-target="#letter" type="button" role="tab" aria-controls="letter" aria-selected="false">Буквы-слова</button>
                                    <button class="nav-link" id="rule-tab" data-bs-toggle="tab" data-bs-target="#rule" type="button" role="tab" aria-controls="rule" aria-selected="false">Правила</button>
                                    <button class="nav-link" id="phrase-tab" data-bs-toggle="tab" data-bs-target="#phrase" type="button" role="tab" aria-controls="phrase" aria-selected="false">Фразы</button>
                                    <button class="nav-link" id="dialog-tab" data-bs-toggle="tab" data-bs-target="#dialog" type="button" role="tab" aria-controls="dialog" aria-selected="false">Диалоги</button>
                                </div>
                            </nav>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                                    <Videos video={Object.assign(this.state.lessons[0].video)} parentCallback={this.handleCallbackVideo} />
                                </div>
                                <div class="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                    <Vocabulary leks={Object.assign(this.state.lessons[0].leks)} parentCallback={this.handleCallbackVoc} />
                                </div>
                                <div class="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                    <Rules rule={Object.assign(this.state.lessons[0].rules)} parentCallback={this.handleCallbackRule} />
                                </div>
                                <div class="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                    <Phrases phr={Object.assign(this.state.lessons[0].phr)} parentCallback={this.handleCallbackPhr} />
                                </div>
                                <div class="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                    <Dialogs dialog={Object.assign(this.state.lessons[0].dialog)} parentCallback={this.handleCallbackDialog} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button disabled class="GreyBox">Статусы</button>
                        <div style={{ marginTop: "5%", marginLeft: "25%" }}>
                            <Statuses statuses={this.state.statuses} />
                        </div>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button type="button" class="ViewLesson" disabled>Предпросмотр</button>
                        <button type="button" class="DeleteLesson" onClick={this.deleteLesson} disabled>Удалить урок</button>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button disabled class="GreyBox">Описание</button>
                        <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="4"></Input>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button type="button" class="Cancel" disabled>Отменить</button>
                        <button type="button" class="Save" disabled>Сохранить изменения</button>
                    </div>
                </div>
            </div>
        )
    }
}