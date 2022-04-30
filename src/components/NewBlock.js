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

export default class NewBlock extends Component {
    constructor() {
        super();
        this.state = {
            blocks: [],
            lexemes: [],
            replicas: [],
            id_lb: 0,
            name_les: "",
            lesson_info: [],
            lesson: [],
            video: { video_link: null },
            statuses: {},
            description: "",
            add_button_hidden: false
        }
    }

    componentDidMount() {
        let id_lb = this.props.location.state.blocks[this.props.location.state.blocks.length - 1].id_lb + 1;
        this.setState({
            blocks: this.props.location.state.blocks,
            lexemes: this.props.location.state.lexemes,
            replicas: this.props.location.state.replicas,
            id_lb: id_lb
        });
    }

    handleCallbackVideo = (props) => {
        //let newLessons = this.state.lessons;
        //newLessons[0].video = props;
        this.setState({ video: props });
    }

    handleCallbackVoc = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].lex = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackPhr = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].phr = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackDialog = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].dialog = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackRule = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].rules = props;
        this.setState({ lesson: newLesson });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkStatuses = () => {
        console.log(this.state.dialogs);
        let mistakes = 0;
        for (var i = 0; i < this.state.lesson.length; i++) {
            /*if (this.state.lesson[i].video.length + 0 === 0 && this.state.statuses.video_st !== statuses[0] && this.state.statuses.video_st !== "Не требуется") {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
            if ((this.state.lesson[i].video.length + 0 > 0) && (this.state.statuses.video_st === statuses[0] || this.state.statuses.video_st === "Не требуется" || this.state.statuses.video_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }*/
            if ((this.state.lesson[i].lex.length + 0 === 0) && (this.state.statuses.lex_st !== statuses[0] && this.state.statuses.lex_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Буквы-слова.");
            }
            if ((this.state.lesson[i].lex.length + 0 > 0) && (this.state.statuses.lex_st === statuses[0] || this.state.statuses.lex_st === "Не требуется" || this.state.statuses.lex_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Буквы-слова.");
            }
            if ((this.state.lesson[i].phr.length + 0 === 0) && (this.state.statuses.phr_st !== statuses[0] && this.state.statuses.phr_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Фразы.");
            }
            if ((this.state.lesson[i].phr.length + 0 > 0) && (this.state.statuses.phr_st === statuses[0] || this.state.statuses.phr_st === "Не требуется" || this.state.statuses.phr_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Фразы.");
            }
            if ((this.state.lesson[i].dialog.length + 0 === 0) && (this.state.statuses.dialog_st !== statuses[0] && this.state.statuses.dialog_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Диалоги.");
            }
            if ((this.state.lesson[i].dialog.length + 0 > 0) && (this.state.statuses.dialog_st === statuses[0] || this.state.statuses.dialog_st === "Не требуется" || this.state.statuses.dialog_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Диалоги.");
            }
            if ((this.state.lesson[i].rules.length + 0 === 0) && (this.state.statuses.rules_st !== statuses[0] && this.state.statuses.rules_st !== "Не требуется")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Правила.");
            }
            if ((this.state.lesson[i].rules.length + 0 > 0) && (this.state.statuses.rules_st === statuses[0] || this.state.statuses.rules_st === "Не требуется" || this.state.statuses.rules_st === "")) {
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
        data = { 
            name_les: this.state.name_les, 
            lessonblock: this.state.id_lb, 
            video: this.state.video.video_link, 
            lesson_info: this.state.statuses, 
            rules: this.state.lesson[0].rules, 
            lex: this.state.lesson[0].lex, 
            dialogs: this.state.lesson[0].dialog, 
            phrases: this.state.lesson[0].phr, description: this.state.description };
        console.log(data);
        /*axios.post(postBlocksUrl, JSON.stringify(data), {
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
        }*/
    }

    addNewLesson = () => {
        this.setState({
            lesson: [...this.state.lesson, {
                id: this.state.lesson.length + 1,
                lex: [],
                phr: [],
                dialog: [],
                rules: [],
            }],
            statuses: { video_st: "", lex_st: "", phr_st: "", dialog_st: "", rules_st: "" },
            add_button_hidden: true
        })
    }

    deleteLesson = (buttonId) => {
        let newLesson = [];
        this.setState({
            lesson: newLesson,
            statuses: {},
            add_button_hidden: false
        });
    }

    cancellingAllChanges = () => {
        this.setState({
            id_lb: "",
            lesson: [],
            video: { video_link: null },
            statuses: {},
            description: "",
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
                {this.state.lesson.map((obj, i) =>
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
                                        <Videos video={this.state.video} parentCallback={this.handleCallbackVideo} />
                                    </div>
                                    <div className="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                        <Vocabulary lex={Object.assign(this.state.lesson[0].lex)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackVoc} />
                                    </div>
                                    <div className="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                        <Rules rule={Object.assign(this.state.lesson[0].rules)} lexemes={this.state.lexemes}  parentCallback={this.handleCallbackRule} />
                                    </div>
                                    <div className="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                        <Phrases phr={Object.assign(this.state.lesson[0].phr)} lexemes={this.state.lexemes} replicas={this.state.replicas} parentCallback={this.handleCallbackPhr} />
                                    </div>
                                    <div className="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                        <Dialogs dialog={Object.assign(this.state.lesson[0].dialog)} lexemes={this.state.lexemes} replicas={this.state.replicas} parentCallback={this.handleCallbackDialog} />
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