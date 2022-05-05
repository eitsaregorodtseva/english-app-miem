import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from 'react-router-dom';
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

const statuses = ["Пусто     ", "В процессе", "Готов     "];
const postLesson = 'https://api.unolingua.flareon.ru/forlessonsdto/';

export default class NewBlock extends Component {
    constructor() {
        super();
        this.state = {
            blocks: [],
            lexemes: [],
            replicas: [],
            videos: [],
            id_lb: 0,
            name_les: "",
            lesson_info: [],
            lesson: [],
            video: { id_video: null },
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
            videos: this.props.location.state.videos,
            id_lb: id_lb
        });
    }

    handleCallbackVoc = (props) => {
        let newLesson = this.state.lesson;
        newLesson.lex = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackPhr = (props) => {
        let newLesson = this.state.lesson;
        newLesson.phr = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackDialog = (props) => {
        let newLesson = this.state.lesson;
        newLesson.dialog = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackRule = (props) => {
        let newLesson = this.state.lesson;
        newLesson.rules = props;
        this.setState({ lesson: newLesson });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkTypes = () => {
        let mistakes = 0;
        for (var i = 0; i < this.state.lesson.lex.length; i++) {
            if (this.state.lesson.lex[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Буквы-слова " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        for (var i = 0; i < this.state.lesson.rules.length; i++) {
            if (this.state.lesson.rules[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Правило " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        for (var i = 0; i < this.state.lesson.phr.length; i++) {
            if (this.state.lesson.phr[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Фраза " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        for (var i = 0; i < this.state.lesson.dialog.length; i++) {
            if (this.state.lesson.dialog[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Диалог " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        return mistakes;
    }

    checkOrder = () => {
        let order = [];
        let mistakes = 0;
        for (var i = 0; i < this.state.lesson.lex.length; i++) {
            if (this.state.lesson.lex[i].num_ex === 0 && this.state.lesson.lex[i].type_ex !== 0) {
                mistakes += 1;
                toast.error("Для Буквы-слова " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.lex[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Буквы-слова " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.lex[i].num_ex)
                }
            }
        }
        for (var i = 0; i < this.state.lesson.phr.length; i++) {
            if (this.state.lesson.phr[i].num_ex === 0 && this.state.lesson.phr[i].type_ex !== 0) {
                mistakes += 1;
                toast.error("Для Фраза " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.phr[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Фраза " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.phr[i].num_ex)
                }
            }
        }
        for (var i = 0; i < this.state.lesson.dialog.length; i++) {
            if (this.state.lesson.dialog[i].num_ex === 0 && this.state.lesson.dialog[i].type_ex !== 0) {
                mistakes += 1;
                toast.error("Для Диалог " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.dialog[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Диалог " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.dialog[i].num_ex)
                }
            }
        }
        for (var i = 0; i < this.state.lesson.rules.length; i++) {
            if (this.state.lesson.rules[i].num_ex === 0 && this.state.lesson.rules[i].type_ex !== 0 && this.state.lesson.rules[i].type_ex !== 23) {
                mistakes += 1;
                toast.error("Для Правило " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.rules[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Правило " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.rules[i].num_ex)
                }
            }
        }
        return mistakes;
    }

    checkStatuses = () => {
        let mistakes = 0;
        mistakes = mistakes + this.checkTypes();
        mistakes = mistakes + this.checkOrder();
        console.log(mistakes);
        if ((this.state.video.id_video === null || this.state.video.id_video === "") && this.state.statuses.video_st !== statuses[0]) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
            if ((this.state.video.id_video !== null && this.state.video.id_video !== "") && (this.state.statuses.video_st === statuses[0] || this.state.statuses.video_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
            if ((this.state.lesson.lex.length + 0 === 0) && (this.state.statuses.lex_st !== statuses[0])) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Буквы-слова.");
            }
            if ((this.state.lesson.lex.length + 0 > 0) && (this.state.statuses.lex_st === statuses[0] || this.state.statuses.lex_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Буквы-слова.");
            }
            if ((this.state.lesson.phr.length + 0 === 0) && (this.state.statuses.phr_st !== statuses[0])) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Фразы.");
            }
            if ((this.state.lesson.phr.length + 0 > 0) && (this.state.statuses.phr_st === statuses[0] || this.state.statuses.phr_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Фразы.");
            }
            if ((this.state.lesson.dialog.length + 0 === 0) && (this.state.statuses.dialog_st !== statuses[0])) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Диалоги.");
            }
            if ((this.state.lesson.dialog.length + 0 > 0) && (this.state.statuses.dialog_st === statuses[0] || this.state.statuses.dialog_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Диалоги.");
            }
            if ((this.state.lesson.rules.length + 0 === 0) && (this.state.statuses.rules_st !== statuses[0])) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Правила.");
            }
            if ((this.state.lesson.rules.length + 0 > 0) && (this.state.statuses.rules_st === statuses[0] || this.state.statuses.rules_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Правила.");
            }
        
        return mistakes;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let mistakes = 0;
        mistakes = mistakes + this.checkStatuses();
        if (mistakes === 0) {
            let data = {
                name_les: this.state.name_les,
                lessonblock: this.state.id_lb,
                video: this.state.video.id_video,
                lesson_info: this.state.statuses,
                rules: this.state.lesson.rules,
                lex: this.state.lesson.lex,
                dialogs: this.state.lesson.dialog,
                phrases: this.state.lesson.phr,
                description: this.state.description
            };
            console.log(data);
            axios.post(postLesson, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                    console.log(error.response);
                    console.log(error.response.data.errors);
                });
        };




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
            lesson: {
                lex: [],
                phr: [],
                dialog: [],
                rules: [],
            },
            statuses: { video_st: "", lex_st: "", phr_st: "", dialog_st: "", rules_st: "" },
            add_button_hidden: true
        })
    }

    /*deleteLesson = (buttonId) => {
        let newLesson = [];
        this.setState({
            lesson: newLesson,
            statuses: {},
            add_button_hidden: false
        });
    }*/

    cancellingAllChanges = () => {
        this.setState({
            lesson: [],
            video: { id_video: null },
            statuses: {},
            description: "",
            add_button_hidden: false
        })
    }

    render() {
        return (
            <Form className="Container" onSubmit={this.handleSubmit}>
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li className="breadcrumb-item">
                                <Link to={{pathname: "/cabinet", state: {
                                    blocks: this.state.blocks,
                                    lexemes: this.state.lexemes,
                                    replicas: this.state.replicas,
                                    videos: this.state.videos
                                }}}>Уроки</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Новый блок</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Form row="true">
                        <FormGroup row>
                            <Label sm={2}>Номер блока:</Label>
                            <Col sm={2}>
                                <Input type="text" name="id_lb" value={this.state.id_lb} onChange={this.handleChange} disabled></Input>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                {this.state.add_button_hidden === true ? <div></div> : <div style={{ marginTop: "5%", marginLeft: "35%" }}>
                    <button type="button" className="GreyButton" onClick={this.addNewLesson}>Добавить урок</button>
                </div>}
                {this.state.add_button_hidden === false ? <div></div>
                    : <div>
                        <div style={{ marginTop: "7%" }}>
                            <button disabled className="GreyBox">Урок 1</button>
                            <div style={{ marginTop: "5%", marginBottom: "5%" }}>
                                <div className="row">
                                    <Label sm={2}>Название урока:</Label>
                                    <Col sm={4}>
                                        <Input type="text" name="name_les" value={this.state.name_les} onChange={this.handleChange} required></Input>
                                    </Col>
                                </div>
                            </div>
                            <div style={{ marginTop: "5%", marginLeft: "3%", overflow: "auto",  width: "90%", minWidth: "600px"  }} >
                                <nav>
                                    <div className="nav nav-pills" id="myTab" role="tablist">
                                        <button className="nav-link active" id="video-tab" data-bs-toggle="tab" data-bs-target="#video" type="button" role="tab" aria-controls="video" aria-selected="true">Видео</button>
                                        <button className="nav-link" id="letter-tab" data-bs-toggle="tab" data-bs-target="#letter" type="button" role="tab" aria-controls="letter" aria-selected="false">Буквы-слова</button>
                                        <button className="nav-link" id="rule-tab" data-bs-toggle="tab" data-bs-target="#rule" type="button" role="tab" aria-controls="rule" aria-selected="false">Правила</button>
                                        <button className="nav-link" id="phrase-tab" data-bs-toggle="tab" data-bs-target="#phrase" type="button" role="tab" aria-controls="phrase" aria-selected="false">Фразы</button>
                                        <button className="nav-link" id="dialog-tab" data-bs-toggle="tab" data-bs-target="#dialog" type="button" role="tab" aria-controls="dialog" aria-selected="false">Диалоги</button>
                                    </div>
                                </nav>
                                <div className="tab-content" id="myTabContent" style={{ display: 'flex', flexDirection: 'column' }} >
                                    <div className="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                                        <Videos video={this.state.video} videos={this.state.videos} />
                                    </div>
                                    <div className="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                        <Vocabulary lex={Object.assign(this.state.lesson.lex)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackVoc} />
                                    </div>
                                    <div className="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                        <Rules rule={Object.assign(this.state.lesson.rules)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackRule} />
                                    </div>
                                    <div className="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                        <Phrases phr={Object.assign(this.state.lesson.phr)} lexemes={this.state.lexemes} replicas={this.state.replicas} parentCallback={this.handleCallbackPhr} />
                                    </div>
                                    <div className="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                        <Dialogs dialog={Object.assign(this.state.lesson.dialog)} lexemes={this.state.lexemes} replicas={this.state.replicas} parentCallback={this.handleCallbackDialog} />
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
                    </div>
                }
                <div style={{ marginTop: "5%" }}>
                    <button disabled className="GreyBox">Описание</button>
                    <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="4" name="description"
                        value={this.state.description} onChange={this.handleChange} required></Input>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <button className="Cancel" onClick={this.cancellingAllChanges}>Отменить</button>
                    <button className="Save" type="submit">Сохранить</button>
                </div>
                <Toaster position="bottom-right" />
            </Form>
        )
    }
}