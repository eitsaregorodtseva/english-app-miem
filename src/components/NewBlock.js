import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import CustomNavbar from './Navbar';
import Videos from './Videos';
import Vocabulary from './Vocabulary';
import Phrases from './Phrases';
import Rules from './Rules';
import Dialogs from './Dialogs';
import Statuses from './Statuses';
import '../style.css';

const statuses = ["Пусто     ", "В процессе", "Не требуется", "Готово"];
const getBlocksUrl = 'http://172.18.130.45:5052/api/lessonblocks/';
const postBlocksUrl = 'http://172.18.130.45:5052/api/lessonblocks/';
const postLessonUrl = 'http://172.18.130.45:5052/api/lessons/';
const getLexemesUrl = 'http://172.18.130.45:5052/api/lexemes/';

export default class NewBlock extends Component {
    constructor() {
        super();
        this.state = {
            id_lb: 0,
            lessons: [
                /*{
                    id: 1,
                    video: [],
                    leks: [],
                    phr: [],
                    dialog: [],
                    rules: [],
                },*/
            ],
            blocks: [],
            lesson_info: [],
            name_les: "",
            description: "",
            statuses: {},
            add_button_hidden: false,
            lexemes: [],
        }
    }

    componentDidMount() {
        fetch(getBlocksUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let id_lb = data[data.length - 1].id_lb + 1;
                this.setState({
                    blocks: data,
                    id_lb: id_lb
                });
            });

        fetch(getLexemesUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    lexemes: data,
                });
            });
    }

    handleCallbackVideo = (props) => {
        let newLessons = this.state.lessons;
        newLessons[0].video = props;
        this.setState({ lessons: newLessons });
    }

    handleCallbackVoc = (props) => {
        let newLessons = this.state.lessons;
        newLessons[0].leks = props;
        this.setState({ lessons: newLessons });
    }

    handleCallbackPhr = (props) => {
        let newLessons = this.state.lessons;
        newLessons[0].phr = props;
        this.setState({ lessons: newLessons });
    }

    handleCallbackDialog = (props) => {
        let newLessons = this.state.lessons;
        newLessons[0].dialog = props;
        this.setState({ lessons: newLessons });
    }

    handleCallbackRule = (props) => {
        let newLessons = this.state.lessons;
        newLessons[0].rules = props;
        this.setState({ lessons: newLessons });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkStatuses = () => {
        console.log(this.state.dialogs);
        let mistakes = 0;
        for (var i = 0; i < this.state.lessons.length; i++) {
            if (this.state.lessons[i].video.length + 0 === 0 && this.state.statuses.video_st !== statuses[0] && this.state.statuses.video_st !== "Не требуется") {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
            if ((this.state.lessons[i].video.length + 0 > 0) && (this.state.statuses.video_st === statuses[0] || this.state.statuses.video_st === "Не требуется" || this.state.statuses.video_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
            if ((this.state.lessons[i].leks.length + 0 === 0) && (this.state.statuses.leks_st !== statuses[0] && this.state.statuses.leks_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Буквы-слова.");
            }
            if ((this.state.lessons[i].leks.length + 0 > 0) && (this.state.statuses.leks_st === statuses[0] || this.state.statuses.leks_st === "Не требуется" || this.state.statuses.leks_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Буквы-слова.");
            }
            if ((this.state.lessons[i].phr.length + 0 === 0) && (this.state.statuses.phr_st !== statuses[0] && this.state.statuses.phr_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Фразы.");
            }
            if ((this.state.lessons[i].phr.length + 0 > 0) && (this.state.statuses.phr_st === statuses[0] || this.state.statuses.phr_st === "Не требуется" || this.state.statuses.phr_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Фразы.");
            }
            if ((this.state.lessons[i].dialog.length + 0 === 0) && (this.state.statuses.dialog_st !== statuses[0] && this.state.statuses.dialog_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Диалоги.");
            }
            if ((this.state.lessons[i].dialog.length + 0 > 0) && (this.state.statuses.dialog_st === statuses[0] || this.state.statuses.dialog_st === "Не требуется" || this.state.statuses.dialog_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Диалоги.");
            }
            if ((this.state.lessons[i].rules.length + 0 === 0) && (this.state.statuses.rules_st !== statuses[0] && this.state.statuses.rules_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Правила.");
            }
            if ((this.state.lessons[i].rules.length + 0 > 0) && (this.state.statuses.rules_st === statuses[0] || this.state.statuses.rules_st === "Не требуется" || this.state.statuses.rules_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Правила.");
            }
        }
        if (mistakes === 0) {
            this.handleSubmit();
        }
        else {
            console.log(this.state.statuses.video_st);
            //toast.error("Ошибки в заполнении статусов.");
        }
    }

    handleSubmit = () => {
        let data = { id_lb: this.state.id_lb, lesson_info: this.state.lesson_info };
        console.log(data);
        axios.post(postBlocksUrl, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log(response);
                if (this.state.lessons.length === 0) {
                    this.setState({ id_lb: response.data.id_lb + 1 });
                }
                if (response.status === 201) {
                    toast.success("Блок успешно добавлен.");
                }
            }, (error) => {
                console.log(error);
                toast.error("Ошибка добавления блока.");
            });
        if (this.state.lessons.length !== 0) {
            data = {
                name_les: this.state.name_les,
                lessonblock: this.state.id_lb,
                video: null,
            }
            console.log(data);
            axios.post(postLessonUrl, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    console.log(response);
                    this.setState({
                        id_lb: response.data.lessonblock + 1,
                        lessons: [],
                        add_button_hidden: false,
                        name_les: ""
                    });
                    if (response.status === 201) {
                        toast.success("Урок успешно добавлен.");
                    }
                }, (error) => {
                    console.log(error);
                    toast.error("Ошибка добавления урока.");
                });
        }
    }

    addNewLesson = () => {
        this.setState({
            lessons: [...this.state.lessons, {
                id: this.state.lessons.length + 1,
                name_les: "",
                video: [],
                leks: [],
                phr: [],
                dialog: [],
                rules: [],
            }],
            statuses: { video_st: "", leks_st: "", phr_st: "", dialog_st: "", rules_st: "" },
            add_button_hidden: true
        })
    }

    deleteLesson = (buttonId) => {
        let newLessons = [];
        this.setState({
            lessons: newLessons,
            statuses: {},
            add_button_hidden: false
        });
    }

    cancellingAllChanges = () => {
        this.setState({
            id_lb: "",
            lessons: [],
            description: "",
            statuses: {},
            add_button_hidden: false
        })
    }

    render() {
        return (
            <div className="Container">
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Новый блок</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <Form row="true">
                        <FormGroup row>
                            <Label sm={2}>Номер блока:</Label>
                            <Col sm={4}>
                                <Input type="text" name="id_lb" value={this.state.id_lb} onChange={this.handleChange} disabled></Input>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div hidden={this.state.add_button_hidden} style={{ marginLeft: "35%" }}>
                    <button type="button" className="GreyButton" onClick={this.addNewLesson}>Добавить новый урок</button>
                </div>
                {this.state.lessons.map((obj, i) =>
                    <div key={obj.id}>
                        <div style={{ marginTop: "7%" }}>
                            <button disabled className="GreyBox">Урок {obj.id}</button>
                            <div style={{ marginTop: "5%", marginBottom: "5%" }}>
                                <Form row="true">
                                    <FormGroup row>
                                        <Label sm={2}>Название урока:</Label>
                                        <Col sm={4}>
                                            <Input type="text" name="name_les" value={this.state.name_les} onChange={this.handleChange}></Input>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                            <div style={{ marginTop: "5%", marginLeft: "3%", width: "90%" }} >
                                <nav>
                                    <div className="nav nav-pills" id="myTab" role="tablist">
                                        <button className="nav-link active" id="video-tab" data-bs-toggle="tab" data-bs-target="#video" type="button" role="tab" aria-controls="video" aria-selected="true">Видео</button>
                                        <button className="nav-link" id="letter-tab" data-bs-toggle="tab" data-bs-target="#letter" type="button" role="tab" aria-controls="letter" aria-selected="false">Буквы-слова</button>
                                        <button className="nav-link" id="rule-tab" data-bs-toggle="tab" data-bs-target="#rule" type="button" role="tab" aria-controls="rule" aria-selected="false">Правила</button>
                                        <button className="nav-link" id="phrase-tab" data-bs-toggle="tab" data-bs-target="#phrase" type="button" role="tab" aria-controls="phrase" aria-selected="false">Фразы</button>
                                        <button className="nav-link" id="dialog-tab" data-bs-toggle="tab" data-bs-target="#dialog" type="button" role="tab" aria-controls="dialog" aria-selected="false">Диалоги</button>
                                    </div>
                                </nav>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                                        <Videos video={Object.assign(this.state.lessons[0].video)} parentCallback={this.handleCallbackVideo} />
                                    </div>
                                    <div className="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                        <Vocabulary leks={Object.assign(this.state.lessons[0].leks)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackVoc} />
                                    </div>
                                    <div className="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                        <Rules rule={Object.assign(this.state.lessons[0].rules)} parentCallback={this.handleCallbackRule} />
                                    </div>
                                    <div className="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                        <Phrases phr={Object.assign(this.state.lessons[0].phr)} parentCallback={this.handleCallbackPhr} />
                                    </div>
                                    <div className="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                        <Dialogs dialog={Object.assign(this.state.lessons[0].dialog)} parentCallback={this.handleCallbackDialog} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            <button disabled className="GreyBox">Статусы</button>
                            <div style={{ marginTop: "5%", marginLeft: "25%" }}>
                                <Statuses statuses={this.state.statuses} />
                            </div>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            <button className="ViewLesson">Предпросмотр</button>
                            <button className="DeleteLesson" onClick={() => this.deleteLesson(obj.id)}>Удалить урок</button>
                        </div>
                    </div>
                )}
                <div style={{ marginTop: "5%" }}>
                    <button disabled className="GreyBox">Описание</button>
                    <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="4" name="description"
                        value={this.state.description} onChange={this.handleChange} required></Input>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <button className="Cancel" onClick={this.cancellingAllChanges}>Отменить</button>
                    <button className="Save" onClick={this.checkStatuses}>Сохранить изменения</button>
                </div>
                <Toaster position="bottom-right" />
            </div>
        )
    }
}