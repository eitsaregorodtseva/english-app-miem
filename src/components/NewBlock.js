import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Button, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import CustomNavbar from './Fragments/Navbar';
import Lesson from './Lesson/Lesson.js';
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
            name_les: { les: "" },
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
                if (order.includes(this.state.lesson.rules[i].num_ex) && this.state.lesson.rules[i].type_ex !== 23) {
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
        if ((this.state.video.id_video !== null && this.state.video.id_video !== "") && (this.state.statuses.video_st === statuses[0] || this.state.statuses.video_st === undefined)) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Видео.");
        }
        if ((this.state.lesson.lex.length + 0 === 0) && (this.state.statuses.lex_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Буквы-слова.");
        }
        if ((this.state.lesson.lex.length + 0 > 0) && (this.state.statuses.lex_st === statuses[0] || this.state.statuses.lex_st === undefined)) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Буквы-слова.");
        }
        if ((this.state.lesson.phr.length + 0 === 0) && (this.state.statuses.phr_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Фразы.");
        }
        if ((this.state.lesson.phr.length + 0 > 0) && (this.state.statuses.phr_st === statuses[0] || this.state.statuses.phr_st === undefined)) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Фразы.");
        }
        if ((this.state.lesson.dialog.length + 0 === 0) && (this.state.statuses.dialog_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Диалоги.");
        }
        if ((this.state.lesson.dialog.length + 0 > 0) && (this.state.statuses.dialog_st === statuses[0] || this.state.statuses.dialog_st === undefined)) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Диалоги.");
        }
        if ((this.state.lesson.rules.length + 0 === 0) && (this.state.statuses.rules_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Правила.");
        }
        if ((this.state.lesson.rules.length + 0 > 0) && (this.state.statuses.rules_st === statuses[0] || this.state.statuses.rules_st === undefined)) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Правила.");
        }

        return mistakes;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let mistakes = 0;
        if (this.state.add_button_hidden === false) {
            mistakes = mistakes + 1;
            toast.error("Добавьте урок!")
        }
        else {
            mistakes = mistakes + this.checkStatuses();
        }
        if (mistakes === 0) {
            let data = {
                name_les: this.state.name_les.les,
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
                    Authorization: `Token ${localStorage.token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        toast.success("Урок " + (this.state.name_les.les) + " успешно создан.")
                    }
                }, (error) => {
                    console.log(error);
                    console.log(error.response);
                    console.log(error.response.data.errors);
                    toast.error("Не удалось создать новый блок. Проверьте заполнение обязательных полей.");
                });
        };
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

    cancellingAllChanges = () => {
        this.setState({
            lesson: [],
            video: { id_video: null },
            statuses: {},
            description: "",
            add_button_hidden: false
        })
    }

    handleCallback = (props) => {
        console.log(props)
        this.setState({
            lesson: props.lesson,
            statuses: props.statuses,
            video: props.video,
            name_les: props.name_les
        })
    }

    render() {
        return (
            <Form className="Container" onSubmit={this.handleSubmit}>
                <header><CustomNavbar login={false} /></header>
                <div style={{ marginTop: "100px" }}>
                    <Breadcrumb listTag="div">
                        <BreadcrumbItem
                            href="/menu"
                            tag="a">
                            Меню
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                        <Link to={{
                                    pathname: "/cabinet", state: {
                                        blocks: this.state.blocks,
                                        lexemes: this.state.lexemes,
                                        replicas: this.state.replicas,
                                        videos: this.state.videos
                                    }
                                }}>Уроки</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem
                            active
                            tag="span">
                            Новый блок
                        </BreadcrumbItem>
                    </Breadcrumb>
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
                {this.state.add_button_hidden === true ? <div></div> : <div style={{ marginTop: "5%"}}>
                    <Button outline block onClick={this.addNewLesson}>Добавить урок</Button>
                </div>}
                {this.state.add_button_hidden === false ? <div></div>
                    : <div>
                        <Lesson lesson={this.state.lesson}
                            statuses={this.state.statuses}
                            lexemes={this.state.lexemes}
                            replicas={this.state.replicas}
                            videos={this.state.videos}
                            video={this.state.video}
                            name_les={this.state.name_les}
                            id_les={1}
                            parentCallback={this.handleCallback} />
                    </div>
                }
                <div style={{ marginTop: "5%" }}>
                    <h5>Описание</h5>
                    <Input style={{ marginTop: "3%", width: "96%" }} type="textarea" rows="4" name="description"
                        value={this.state.description} onChange={this.handleChange} required
                        placeholder="Опишите внесенные изменения"></Input>
                </div>
                <div class="row" style={{ marginTop: "5%", marginBottom: "10%" }}>
                    <Col sm={6}>
                    <Button color="warning" outline block onClick={this.cancellingAllChanges}>Отменить</Button>
                    </Col>
                    <Col sm={6}>
                    <Button color="success" outline block type="submit">Сохранить</Button>
                    </Col>
                </div>
                <Toaster position="bottom-right" />
            </Form>
        )
    }
}