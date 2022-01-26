import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import CustomNavbar from './Navbar';
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
                    video: [/*{id: 1, link: '123'}, {id: 2, link: '456'}*/],
                    leks: [/*{id: 1, leksType: 1}, {id: 2, leksType: 2}*/],
                    phr: [],
                    dialog: [],
                    rules: []
                },
                /*{
                    id: "2",
                    lessons_info: { video_st: '', leks_st: '', phr_st: '', dialog_st: '', rules_st: '' }
                }*/
            ],
            description: "",
            current_video_link: { lessonId: null, videoId: null, value: "" },
            current_leks: { lessonId: null, leksId: null, leksType: '0' },
            current_phr: { lessonId: null, leksId: null, phrType: '0' },
            current_dialog: { lessonId: null, leksId: null, dialogType: '0' },
            current_rule: { lessonId: null, leksId: null, ruleType: '0' },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeVideoTab = this.handleChangeVideoTab.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewVideo = this.addNewVideo.bind(this);
        this.showCurrentVideoLink = this.showCurrentVideoLink.bind(this);
        this.addNewLeks = this.addNewLeks.bind(this);
        this.showCurrentLeks = this.showCurrentLeks.bind(this);
        this.addNewPhr = this.addNewPhr.bind(this);
        this.showCurrentPhr = this.showCurrentPhr.bind(this);
        this.addNewDialog = this.addNewDialog.bind(this);
        this.showCurrentDialog = this.showCurrentDialog.bind(this);
        this.addNewRule = this.addNewRule.bind(this);
        this.showCurrentRule = this.showCurrentRule.bind(this);
        this.addNewLesson = this.addNewLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.cancellingAllChanges = this.cancellingAllChanges.bind(this);
        this.getSelectedTypeLeks = this.getSelectedTypeLeks.bind(this);
        this.getSelectedTypePhr = this.getSelectedTypePhr.bind(this);
        this.checkStatuses = this.checkStatuses.bind(this);
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

    addNewLeks(lessonId) {
        let leks = this.state.lessons[lessonId].leks;
        leks.push(
            {
                id: this.state.lessons[lessonId].leks.length + 1,
                leksType: '0'
            });
        let newLessons = this.state.lessons;
        newLessons[lessonId].leks = leks;
        this.setState({ lessons: newLessons });
        console.log(this.state.lessons);
    }

    addNewPhr(lessonId) {
        let phr = this.state.lessons[lessonId].phr;
        phr.push(
            {
                id: this.state.lessons[lessonId].phr.length + 1,
                phrType: '0'
            });
        let newLessons = this.state.lessons;
        newLessons[lessonId].phr = phr;
        this.setState({ lessons: newLessons });
        console.log(this.state.lessons);
    }

    addNewDialog(lessonId) {
        let dialog = this.state.lessons[lessonId].dialog;
        dialog.push(
            {
                id: this.state.lessons[lessonId].dialog.length + 1,
                dialogType: '0'
            });
        let newLessons = this.state.lessons;
        newLessons[lessonId].dialog = dialog;
        this.setState({ lessons: newLessons });
        console.log(this.state.lessons);
    }

    addNewRule(lessonId) {
        let rules = this.state.lessons[lessonId].rules;
        rules.push(
            {
                id: this.state.lessons[lessonId].rules.length + 1,
                ruleType: '0'
            });
        let newLessons = this.state.lessons;
        newLessons[lessonId].rules = rules;
        this.setState({ lessons: newLessons });
        console.log(this.state.lessons);
    }

    showCurrentVideoLink(lessonId, videoId) {
        this.setState({
            current_video_link: { lessonId: lessonId, videoId: videoId, value: this.state.lessons[lessonId].video[videoId].link },
        })
        console.log(this.state.current_video_link);
    }

    showCurrentLeks(lessonId, leksId) {
        this.setState({
            current_leks: { lessonId: lessonId, leksId: leksId, leksType: this.state.lessons[lessonId].leks[leksId].leksType },
        });
        console.log(this.state.current_leks);
    }

    showCurrentPhr(lessonId, phrId) {
        this.setState({
            current_phr: { lessonId: lessonId, phrId: phrId, phrType: this.state.lessons[lessonId].phr[phrId].phrType },
        });
        console.log(this.state.current_phr);
    }

    showCurrentDialog(lessonId, dialogId) {
        this.setState({
            current_dialog: { lessonId: lessonId, dialogId: dialogId, dialogType: this.state.lessons[lessonId].dialog[dialogId].dialogType },
        });
        console.log(this.state.current_dialog);
    }

    showCurrentRule(lessonId, ruleId) {
        this.setState({
            current_rule: { lessonId: lessonId, ruleId: ruleId, ruleType: this.state.lessons[lessonId].rules[ruleId].ruleType },
        });
        console.log(this.state.current_rule);
    }

    getSelectedTypeLeks(event) {
        console.log(event.target.value);
        let newLeks = { ...this.state.current_leks, leksType: event.target.value };
        //newLeks.push({pictureLink: ""});
        console.log(newLeks);
        let leks = this.state.lessons[newLeks.lessonId].leks;
        leks[newLeks.leksId].leksType = newLeks.leksType;

        let newLessons = this.state.lessons;
        newLessons[newLeks.lessonId].leks = leks;
        this.setState({
            current_leks: newLeks,
            lessons: newLessons
        });
    }

    getSelectedTypePhr(event) {
        console.log(event.target.value);
        let newLeks = { ...this.state.current_leks, leksType: event.target.value };

        let leks = this.state.lessons[newLeks.lessonId].leks;
        leks[newLeks.leksId].leksType = newLeks.leksType;

        let newLessons = this.state.lessons;
        newLessons[newLeks.lessonId].leks = leks;
        this.setState({
            current_leks: newLeks,
            lessons: newLessons
        });
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
                                            <div class="col" style={{ marginTop: "1%" }}>
                                                <Form>
                                                    <Label>Ссылка на видео:</Label>
                                                    <Input type="textarea" rows="3" name="current_video_link" value={this.state.current_video_link.value} onChange={this.handleChangeVideoTab}></Input>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                        <div class="row" style={{ marginBottom: "3%" }}>
                                            <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "300px" }}>
                                                <Col sm={12}>
                                                    <Button style={{ width: "190px" }} onClick={() => this.addNewLeks(i)}>Добавить</Button>
                                                    {obj.leks.map((obj, j) =>
                                                        <Button style={{ width: "190px" }} onClick={() => this.showCurrentLeks(i, j)}>Буквы-слова {j + 1}</Button>)}
                                                </Col>
                                            </div>
                                            {this.state.lessons[i].leks.length === 0 ? <div></div> :
                                                <div class="col" style={{ marginTop: "1%" }}>
                                                    <Form>
                                                        <select value={this.state.current_leks.leksType} onChange={this.getSelectedTypeLeks}>
                                                            <option value={0}>Выберите тип</option>
                                                            <option value={1}>картинка рупор слово</option>
                                                            <option value={2}>картинка 2 рупора 2 слова</option>
                                                            <option value={3}>4 рупора 4 слова</option>
                                                            <option value={4}>картинка рупор слово 4 варианта букв правильный ответ</option>
                                                        </select>
                                                        {this.state.current_leks.leksType === '0' ? <div></div> :
                                                            this.state.current_leks.leksType === '1' ?
                                                                <div>
                                                                    <Label>Ссылка на картинку:</Label>
                                                                    <Input type="text" rows="1"></Input>
                                                                    <Label>Ссылка на звук:</Label>
                                                                    <Input type="text" rows="1"></Input>
                                                                    <Label>Слово или буква:</Label>
                                                                    <Input type="text"></Input>
                                                                </div> :
                                                                this.state.current_leks.leksType === '2' ?
                                                                    <div>
                                                                        <Label>Ссылка на картинку:</Label>
                                                                        <Input type="text" rows="1"></Input>
                                                                        <Label>Ссылка на звук 1:</Label>
                                                                        <Input type="text" rows="1"></Input>
                                                                        <Label>Слово или буква 1 :</Label>
                                                                        <Input type="text"></Input>
                                                                        <Label>Ссылка на звук 2:</Label>
                                                                        <Input type="text" rows="1"></Input>
                                                                        <Label>Слово или буква 2:</Label>
                                                                        <Input type="text"></Input>
                                                                    </div> :
                                                                    this.state.current_leks.leksType === '3' ?
                                                                        <div>
                                                                            <Label>Ссылка на звук 1:</Label>
                                                                            <Input type="text" rows="1"></Input>
                                                                            <Label>Слово или буква 1 :</Label>
                                                                            <Input type="text"></Input>
                                                                            <Label>Ссылка на звук 2:</Label>
                                                                            <Input type="text" rows="1"></Input>
                                                                            <Label>Слово или буква 2:</Label>
                                                                            <Input type="text"></Input>
                                                                            <Label>Ссылка на звук 3:</Label>
                                                                            <Input type="text" rows="1"></Input>
                                                                            <Label>Слово или буква 3:</Label>
                                                                            <Input type="text"></Input>
                                                                            <Label>Ссылка на звук 4:</Label>
                                                                            <Input type="text" rows="1"></Input>
                                                                            <Label>Слово или буква 4:</Label>
                                                                            <Input type="text"></Input>
                                                                        </div> :
                                                                        this.state.current_leks.leksType === '4' ?
                                                                            <div>
                                                                                <Label>Ссылка на картинку:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                                <Label>Ссылка на звук:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                                <Label>Слово или буква:</Label>
                                                                                <Input type="text"></Input>
                                                                                <Label>Вариант ответа 1:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                                <Label>Вариант ответа 2:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                                <Label>Вариант ответа 3:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                                <Label>Вариант ответа 4:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                                <Label>Правильный ответ:</Label>
                                                                                <Input type="text" rows="1"></Input>
                                                                            </div> :
                                                                            <Input type="textarea" rows="3"></Input>}
                                                    </Form>
                                                </div>}
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                        <div class="row" style={{ marginBottom: "3%" }}>
                                            <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "300px" }}>
                                                <Col sm={12}>
                                                    <Button style={{ width: "190px" }} onClick={() => this.addNewPhr(i)}>Добавить</Button>
                                                    {obj.phr.map((obj, j) =>
                                                        <Button style={{ width: "190px" }} onClick={() => this.showCurrentPhr(i, j)}>Фраза {j + 1}</Button>)}
                                                </Col>
                                            </div>
                                            <div class="col" style={{ marginTop: "1%" }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                        <div class="row" style={{ marginBottom: "3%" }}>
                                            <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "300px" }}>
                                                <Col sm={12}>
                                                    <Button style={{ width: "190px" }} onClick={() => this.addNewDialog(i)}>Добавить</Button>
                                                    {obj.dialog.map((obj, j) =>
                                                        <Button style={{ width: "190px" }} onClick={() => this.showCurrentDialog(i, j)}>Диалог {j + 1}</Button>)}
                                                </Col>
                                            </div>
                                            <div class="col" style={{ marginTop: "1%" }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                        <div class="row" style={{ marginBottom: "3%" }}>
                                            <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "300px" }}>
                                                <Col sm={12}>
                                                    <Button style={{ width: "190px" }} onClick={() => this.addNewRule(i)}>Добавить</Button>
                                                    {obj.rules.map((obj, j) =>
                                                        <Button style={{ width: "190px" }} onClick={() => this.showCurrentRule(i, j)}>Правило {j + 1}</Button>)}
                                                </Col>
                                            </div>
                                            <div class="col" style={{ marginTop: "1%" }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div style={{ marginLeft: "6%", marginTop: "5%" }}>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новое видео</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новые буквы-слова</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новая фраза</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новый диалог</Button></div>
                        <div style={{ marginTop: "3%" }}><Button style={neutralButton}>Новое правило</Button></div>
                    </div>*/}
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