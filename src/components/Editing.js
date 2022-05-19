import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Col, Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Input, Label } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import CustomNavbar from './Fragments/Navbar';
import Lesson from './Lesson/Lesson.js';
import '../style.css';

const statuses = ["Пусто     ", "В процессе", "Готов     "];
const postLesson = 'https://api.unolingua.flareon.ru/forlessonsdto/';

export default class Editing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: [],
            video: { id_video: null },
            id_lb: null,
            id_les: null,
            name_les: { les: "" },
            lesson_info: [],
            current_lesson: [],
            blocks: [],
            description: "",
            statuses: {},
            selectState: true,
            lessonState: true,
            buttonsState: true,
            lexemes: [],
            replicas: [],
            videos: []
        }
    };

    componentDidMount() {
        console.log(this.props);
        if (this.props.location.state.id_lb) {
            let lesson_info = [];
            for (var i = 0; i < this.props.location.state.blocks.length; i++) {
                if (this.props.location.state.blocks[i].id_lb === this.props.location.state.id_lb) {
                    lesson_info = this.props.location.state.blocks[i].lesson_info;
                }
            }
            let current_lesson = [];
            for (var i = 0; i < lesson_info.length; i++) {
                if (lesson_info[i].id_les === this.props.location.state.id_les) {
                    current_lesson = lesson_info[i];
                }
            }
            let video = { id_video: current_lesson.video };
            console.log(current_lesson.lesson);
            let name_les = { les: current_lesson.name_les };
            this.setState({
                blocks: this.props.location.state.blocks,
                lexemes: this.props.location.state.lexemes,
                replicas: this.props.location.state.replicas,
                videos: this.props.location.state.videos,
                id_lb: this.props.location.state.id_lb,
                id_les: this.props.location.state.id_les,
                name_les: name_les,
                lesson: current_lesson.lesson,
                video: video,
                lesson_info: lesson_info,
                current_lesson: current_lesson,
                buttonsState: false,
                selectState: false,
                lessonState: false,
                emptyLessonState: true
            });

        }
        else {
            this.setState({
                blocks: this.props.location.state.blocks,
                lexemes: this.props.location.state.lexemes,
                replicas: this.props.location.state.replicas,
                videos: this.props.location.state.videos
            });

        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    openLessonSelect = () => {
        this.setState({
            selectState: false,
            emptyLessonState: true,
            lessonState: true,
            current_lesson: []
        })
        console.log(this.state.current_lesson);
    }

    openEmptyLesson = () => {
        let video = { id_video: null };
        console.log(video);
        this.setState({
            lesson: {
                lex: [],
                phr: [],
                dialog: [],
                rules: [],
            },
            emptyLessonState: false,
            lessonState: false,
            selectState: true,
            current_lesson: [],
            name_les: { les: "" },
            id_les: null,
            video: video
        })
        console.log(this.state.current_lesson);
    }

    deleteLesson = () => {
        console.log(this.state.id_lb);
        console.log(this.state.id_les);
        if (this.state.lesson.lex.length !== 0 || this.state.lesson.phr.length !== 0 ||
            this.state.lesson.dialog.length !== 0 || this.state.lesson.rules.length !== 0) {
            toast.error("Нельзя удалить не пустой урок!")
        }
        else {
            axios.delete('https://api.unolingua.flareon.ru/lessons/' + this.state.id_les)
                .then((response) => {
                    console.log(response);
                    toast.success("Урок " + (this.state.name_les.les) + " был успешно удален.");
                }, (error) => {
                    console.log(error);
                    toast.error("Ошибка!")
                });;
        }
    }

    blockChange = (id_lb) => {
        console.log(id_lb);
        id_lb = parseInt(id_lb);
        let lesson_info = [];
        let buttonsState = true;
        if (id_lb !== 0) {
            for (var i = 0; i < this.state.blocks.length; i++) {
                if (this.state.blocks[i].id_lb === id_lb) {
                    lesson_info = this.state.blocks[i].lesson_info;
                }
            }
            buttonsState = false;
        }
        this.setState({
            id_lb: id_lb,
            id_les: null,
            name_les: { les: "" },
            lesson_info: lesson_info,
            current_lesson: [],
            buttonsState: buttonsState,
            lessonState: true,
            emptyLessonState: true,
            selectState: true,
        });
    }

    lessonChange = (id_les) => {
        id_les = parseInt(id_les);
        let lessonState = true;
        let current_lesson = [];
        if (id_les !== 0) {
            for (var i = 0; i < this.state.lesson_info.length; i++) {
                if (this.state.lesson_info[i].id_les === id_les) {
                    current_lesson = this.state.lesson_info[i];
                }
            }
            lessonState = false;
        }
        let name_les = { les: current_lesson.name_les };
        let video = { id_video: current_lesson.video };
        console.log(current_lesson.lesson)
        this.setState({
            lesson: current_lesson.lesson,
            id_les: id_les,
            name_les: name_les,
            video: video,
            lessonState: lessonState,
            current_lesson: current_lesson,
        });
        console.log(current_lesson);
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
        mistakes = mistakes + this.checkStatuses();
        if (mistakes === 0) {
            if (this.state.id_les === null) {
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
                            toast.success("Урок " + (this.state.name_les.les) + " успешно создан.");
                            this.props.history.push('/menu');
                        }
                    }, (error) => {
                        console.log(error);
                        console.log(error.response);
                        console.log(error.response.data.errors);
                        toast.error("Не удалось добавить урок. Проверьте заполнение обязательных полей.");
                    });
            }
            else {
                let data = {
                    name_les: this.state.name_les.les,
                    id: this.state.id_les,
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
                console.log(postLesson + this.state.id_les + '/');
                axios.put(postLesson + this.state.id_les + '/', JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            toast.success("Урок " + (this.state.name_les.les) + " успешно изменен.")
                        }
                    }, (error) => {
                        console.log(error);
                        console.log(error.response);
                        console.log(error.response.data.errors);
                        toast.error("Не удалось изменить урок. Проверьте заполнение обязательных полей.");
                    });
            }
        }
    }

    handleCallback = (props) => {
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
                        <BreadcrumbItem
                            active
                            tag="span">
                            Редактирование
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <div class="row">
                        <FormGroup>
                            <Label>Выберите блок:</Label>
                            <Col sm={12}>
                                <Input type="select" value={this.state.id_lb ? this.state.id_lb : "0"} onChange={(e) => this.blockChange(e.target.value)}>
                                    <option value={0} key={0}>Номер блока</option>
                                    {this.state.blocks.map((obj, i) => (
                                        <option value={obj.id_lb} key={obj.id_lb}>{obj.id_lb}</option>
                                    ))}
                                </Input></Col>
                        </FormGroup>
                    </div>
                    <div class="row" hidden={this.state.buttonsState}>
                        <Col sm={6}>
                        <Button block color={this.state.emptyLessonState === false ? "primary" : "secondary"} onClick={this.openEmptyLesson}>Новый урок</Button>
                        </Col>
                        <Col sm={6}>
                        <Button block color={this.state.selectState === false ? "primary" : "secondary"} onClick={this.openLessonSelect}>Выбрать урок</Button>
                        </Col>
                        </div>
                    <div style={{ marginTop: "2%" }}>
                        <div class="row" row hidden={this.state.selectState}>
                            <FormGroup>
                                <Label>Выберите номер урока:</Label>
                                <Col sm={12}>
                                    <Input type="select" value={this.state.id_les ? this.state.id_les : "0"} onChange={(e) => this.lessonChange(e.target.value)}>
                                        <option value={0} key={0}>Номер урока</option>
                                        {this.state.lesson_info.map((obj, j) => (
                                            <option value={obj.id_les} key={obj.id_les}>{obj.id_les}</option>
                                        ))}
                                    </Input></Col>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                {this.state.lessonState === true ? <div></div>
                    : <div>
                        <Lesson lesson={this.state.lesson}
                            statuses={this.state.statuses}
                            lexemes={this.state.lexemes}
                            replicas={this.state.replicas}
                            videos={this.state.videos}
                            name_les={this.state.name_les}
                            video={this.state.video}
                            id_les={this.state.id_les}
                            parentCallback={this.handleCallback} />
                        {this.state.emptyLessonState === false ? <div></div> :
                            <div style={{ marginTop: "5%" }}>
                                <Button block color="danger" onClick={this.deleteLesson}>Удалить урок</Button>
                            </div>}
                        <div style={{ marginTop: "5%" }}>
                            <h4>Описание</h4>
                            <Input placeholder="Опишите внесенные изменения" style={{ marginTop: "3%", width: "96%" }} type="textarea" name="description" rows="4" onChange={this.handleChange} required></Input>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            {/*<button type="button" class="Cancel" disabled>Отменить</button>*/}
                            <Button outline block color="success" type="submit" style={{marginBottom: "10%"}}>Сохранить</Button>
                        </div>
                    </div>
                }
                <Toaster position="bottom-right" />
            </Form>
        )
    }
}