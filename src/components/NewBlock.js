import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import CustomNavbar from './Navbar';
import Vocabulary from './Vocabulary';
import Phrases from './Phrases';
import Rules from './Rules';
import Dialogs from './Dialogs';
import '../style.css';
import axios from 'axios';

export default class NewBlock extends Component {
    constructor() {
        super();
        this.state = {
            block_name: "",
            lessons: [
                {
                    id: 1,
                    lessons_info: [{ video_st: 'Готов', leks_st: 'Готов', phr_st: 'Готов', dialog_st: 'Пусто', rules_st: 'Пусто' }],
                    video: [],
                    leks: [{id: 0, leksType: '1', word: '1234'}, {id: 1, leksType: '1', word: 'word'}],
                    phr: [],
                    dialog: [],
                    rules: []
                },
            ],
            description: "",
            current_video_link: { lessonId: null, videoId: null, value: "" },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeVideoTab = this.handleChangeVideoTab.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewVideo = this.addNewVideo.bind(this);
        this.showCurrentVideoLink = this.showCurrentVideoLink.bind(this);
        this.addNewLesson = this.addNewLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.cancellingAllChanges = this.cancellingAllChanges.bind(this);
        this.checkStatuses = this.checkStatuses.bind(this);
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
        newLessons[0].phr = propsDialogs;
        this.setState({ lessons: newLessons });
    }

    handleCallbackRule = (propsRules) => {
        let newLessons = this.state.lessons;
        newLessons[0].phr = propsRules;
        this.setState({ lessons: newLessons });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeVideoTab(event) {
        let newVideoLink = { ...this.state.current_video_link, value: event.target.value };
        let videos = this.state.lessons[newVideoLink.lessonId].video;
        videos[newVideoLink.videoId].link = newVideoLink.value;
        let newLessons = this.state.lessons;
        newLessons[newVideoLink.lessonId].video = videos;
        this.setState({
            current_video_link: newVideoLink,
            lessons: newLessons
        });
    }

    checkStatuses() {
        let mistakes = 0;
        for (var i = 0; i < this.state.lessons.length; i++) {
            if (this.state.lessons[i].video.length + 0 === 0 && this.state.lessons[i].lessons_info[0].video_st !== "Пусто" && this.state.lessons[i].lessons_info[0].video_st !== "Не нужно") {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].video.length + 0 > 0) && (this.state.lessons[i].lessons_info[0].video_st === "Пусто" || this.state.lessons[i].lessons_info[0].video_st === "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].leks.length + 0 === 0) && (this.state.lessons[i].lessons_info[0].leks_st !== "Пусто" && this.state.lessons[i].lessons_info[0].leks_st !== "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].leks.length + 0 > 0) && (this.state.lessons[i].lessons_info[0].leks_st === "Пусто" || this.state.lessons[i].lessons_info[0].leks_st === "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].phr.length + 0 === 0) && (this.state.lessons[i].lessons_info[0].phr_st !== "Пусто" && this.state.lessons[i].lessons_info[0].phr_st !== "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].phr.length + 0 > 0) && (this.state.lessons[i].lessons_info[0].phr_st === "Пусто" || this.state.lessons[i].lessons_info[0].phr_st === "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].dialog.length + 0 === 0) && (this.state.lessons[i].lessons_info[0].dialog_st !== "Пусто" && this.state.lessons[i].lessons_info[0].dialog_st !== "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].dialog.length + 0 > 0) && (this.state.lessons[i].lessons_info[0].dialog_st === "Пусто" || this.state.lessons[i].lessons_info[0].dialog_st === "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].rules.length + 0 === 0) && (this.state.lessons[i].lessons_info[0].rules_st !== "Пусто" && this.state.lessons[i].lessons_info[0].rules_st !== "Не нужно")) {
                mistakes = mistakes + 1;
            }
            if ((this.state.lessons[i].rules.length + 0 > 0) && (this.state.lessons[i].lessons_info[0].rules_st === "Пусто" || this.state.lessons[i].lessons_info[0].rules_st === "Не нужно")) {
                mistakes = mistakes + 1;
            }
        }
        console.log(mistakes);
        this.handleSubmit();
    }

    handleSubmit() {
        let data = {
            block_name: this.state.block_name,
            lessons: this.state.lessons,
            description: this.state.description,
        }
        console.log(data);
        axios.post('', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    addNewVideo(lessonId) {
        let videos = this.state.lessons[lessonId].video;
        videos.push(
            {
                id: this.state.lessons[lessonId].video.length + 1,
                link: "",
            });
        let newLessons = this.state.lessons;
        newLessons[lessonId].video = videos;
        this.setState({ lessons: newLessons });
    }

    showCurrentVideoLink(lessonId, videoId) {
        this.setState({
            current_video_link: { lessonId: lessonId, videoId: videoId, value: this.state.lessons[lessonId].video[videoId].link },
        })
        console.log(this.state.current_video_link);
    }

    addNewLesson() {
        this.setState({
            lessons: [...this.state.lessons, {
                id: this.state.lessons.length + 1,
                lessons_info: [],
                video: [],
                leks: [],
                phr: [],
                dialog: [],
                rules: []
            }],
        })
    }

    deleteLesson(buttonId) {
        console.log(buttonId);
        let lessons = this.state.lessons.filter(item => item.id !== buttonId);
        for (var i = 0; i < lessons.length; i++) {
            lessons[i].id = i + 1;
        }
        this.setState({ lessons: lessons });
    }

    cancellingAllChanges() {
        this.setState({
            block_name: "",
            lessons: [],
            description: "",
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
                            <li class="breadcrumb-item active" aria-current="page">Новый блок</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <Form row>
                        <FormGroup row>
                            <Label sm={2}>Название блока:</Label>
                            <Col sm={4}>
                                <Input type="text" name="block_name" value={this.state.block_name} onChange={this.handleChange}></Input>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div style={{ marginLeft: "35%" }}>
                    <button type="button" class="GreyButton" onClick={this.addNewLesson}>Добавить новый урок</button>
                </div>
                {this.state.lessons.map((obj, i) =>
                    <div key={obj.id}>
                        <div style={{ marginTop: "7%" }}>
                            <button disabled class="GreyBox">Урок {obj.id}</button>
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
                                        <div class="row" style={{ marginBottom: "3%" }}>
                                            <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "300px" }}>
                                                <Col sm={10}>
                                                    <Button style={{ width: "190px" }} onClick={() => this.addNewVideo(i)}>Добавить</Button>
                                                    {obj.video.map((obj, j) =>
                                                        <Button style={{ width: "190px" }} onClick={() => this.showCurrentVideoLink(i, j)}>Видео {j + 1}</Button>)}
                                                </Col>
                                            </div>
                                            {this.state.lessons[0].video.length === 0 ? <div></div> :
                                            <div class="col" style={{ marginTop: "1%" }}>
                                                <Form>
                                                    <Label>Ссылка на видео:</Label>
                                                    <Input type="textarea" rows="3" name="current_video_link" value={this.state.current_video_link.value} onChange={this.handleChangeVideoTab}></Input>
                                                </Form>
                                            </div>}
                                        </div>
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
                            <button class="ViewLesson">Предпросмотр</button>
                            <button class="DeleteLesson" onClick={() => this.deleteLesson(obj.id)}>Удалить урок</button>
                        </div>
                    </div>
                )}
                <div style={{ marginTop: "5%" }}>
                    <button disabled class="GreyBox">Описание</button>
                    <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="7" name="description"
                        value={this.state.description} onChange={this.handleChange}></Input>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <button class="Cancel" onClick={this.cancellingAllChanges}>Отменить</button>
                    <button class="Save" onClick={this.checkStatuses}>Сохранить изменения</button>
                </div>
            </div>
        )
    }
}