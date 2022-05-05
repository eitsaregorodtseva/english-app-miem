import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Col, Button, Form, FormGroup, Input, Label, List, Badge } from "reactstrap";
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

const BadgePills = {
    padding: "1% 5% 1% 5%"
}
const statuses = ["Пусто     ", "В процессе", "Готов     "];
const getBlocksUrl = 'http://172.18.130.45:5052/api/lessonblocks/';
const getLexemesUrl = 'http://172.18.130.45:5052/api/lexemes/';
const postLessonUrl = 'http://172.18.130.45:5052/api/lessons/';

export default class Editing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: [],
            video: { id_video: null },
            id_lb: null,
            id_les: null,
            name_les: "",
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
            this.setState({
                blocks: this.props.location.state.blocks,
                lexemes: this.props.location.state.lexemes,
                replicas: this.props.location.state.replicas,
                videos: this.props.location.state.videos,
                id_lb: this.props.location.state.id_lb,
                id_les: this.props.location.state.id_les,
                name_les: current_lesson.name_les,
                lesson: [current_lesson.lesson],
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

    async getBlocks() {
        const response = await fetch(getBlocksUrl);
        const blocks = await response.json();
        console.log(blocks);
        let lesson_info = [];
        if (this.state.id_lb !== 0) {
            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].id_lb === this.state.id_lb) {
                    lesson_info = blocks[i].lesson_info;
                }
            }
        }
        this.setState({
            blocks: blocks,
            lesson_info: lesson_info,
        });
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalGetBlocks);
    };

    handleCallbackVoc = (propsVocabulary) => {
        let newLessons = this.state.lesson;
        newLessons[0].lex = propsVocabulary;
        this.setState({ lesson: newLessons });
    }

    handleCallbackPhr = (propsPhrases) => {
        let newLessons = this.state.lesson;
        newLessons[0].phr = propsPhrases;
        this.setState({ lesson: newLessons });
    }

    handleCallbackDialog = (propsDialogs) => {
        let newLessons = this.state.lesson;
        newLessons[0].dialog = propsDialogs;
        this.setState({ lesson: newLessons });
    }

    handleCallbackRule = (propsRules) => {
        let newLessons = this.state.lesson;
        newLessons[0].rules = propsRules;
        this.setState({ lesson: newLessons });

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
            lesson: [{
                lex: [],
                phr: [],
                dialog: [],
                rules: [],
            }],
            emptyLessonState: false,
            lessonState: false,
            selectState: true,
            current_lesson: [],
            name_les: "",
            id_les: null,
            video: video
        })
        console.log(this.state.current_lesson);
    }

    deleteLesson = () => {
        console.log(this.state.id_lb);
        console.log(this.state.id_les);
        axios.delete('https://api.unolingua.flareon.ru/lessons/' + this.state.id_les)
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });;
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
            name_les: "",
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
        let name_les = current_lesson.name_les;
        let video = { id_video: current_lesson.video };
        this.setState({
            lesson: [current_lesson.lesson],
            id_les: id_les,
            name_les: name_les,
            video: video,
            lessonState: lessonState,
            current_lesson: current_lesson,
        });
        console.log(current_lesson);
    }

    checkStatuses = () => {
        console.log(this.state.dialogs);
        let mistakes = 0;
        for (var i = 0; i < this.state.lesson.length; i++) {
            if ((this.state.video.id_video === null || this.state.video.id_video === "" ) && this.state.statuses.video_st !== statuses[0] && this.state.statuses.video_st !== "Не требуется") {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
            if ((this.state.video.id_video !== null && this.state.video.id_video !== "") && (this.state.statuses.video_st === statuses[0] || this.state.statuses.video_st === "Не требуется" || this.state.statuses.video_st === "")) {
                mistakes = mistakes + 1;
                toast.error("Ошибка в заполнении статуса Видео.");
            }
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
        let data = {
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
                if (response.status === 201) {
                    toast.success("Урок успешно добавлен.");
                }
            }, (error) => {
                console.log(error);
                toast.error("Ошибка добавления урока.");
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
                            {/*<Label sm={3}>Выберите блок:</Label>*/}
                            <Col sm={4}>
                                <Input type="select" value={this.state.id_lb ? this.state.id_lb : "0"} onChange={(e) => this.blockChange(e.target.value)}>
                                    <option value={0} key={0}>Выберите блок</option>
                                    {this.state.blocks.map((obj, i) => (
                                        <option value={obj.id_lb} key={obj.id_lb}>{obj.id_lb}</option>
                                    ))}
                                </Input></Col>
                        </FormGroup>
                    </Form>
                    <div row hidden={this.state.buttonsState}>
                        <Button color={this.state.emptyLessonState === false ? "primary" : "secondary"} type="button" onClick={this.openEmptyLesson}>Новый урок</Button>
                        <Button color={this.state.selectState === false ? "primary" : "secondary"} type="button" onClick={this.openLessonSelect}>Выбрать урок</Button>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <Form row hidden={this.state.selectState}>
                            <FormGroup row>
                                {/*<Label sm={3}>Выберите номер урока:</Label>*/}
                                <Col sm={4}>
                                    <Input type="select" value={this.state.id_les ? this.state.id_les : "0"} onChange={(e) => this.lessonChange(e.target.value)}>
                                        <option value={0} key={0}>Выберите урок</option>
                                        {this.state.lesson_info.map((obj, j) => (
                                            <option value={obj.id_les} key={obj.id_les}>{obj.id_les}</option>
                                        ))}
                                    </Input></Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div hidden={this.state.lessonState}>
                    {this.state.lesson.map((obj, i) =>
                        <div style={{ marginTop: "7%" }}>
                            <button disabled class="GreyBox">Урок {this.state.id_les}</button>
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
                            <div style={{ marginTop: "5%", marginLeft: "3%", overflow: "auto",  width: "90%", minWidth: "600px" }} >
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
                                        <Videos key={1} video={Object.assign(this.state.video)} videos={this.state.videos}/>
                                    </div>
                                    <div class="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                        <Vocabulary nam={this.state.name_les} key={2} lex={Object.assign(this.state.lesson[0].lex)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackVoc} />
                                    </div>
                                    <div class="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                        <Rules key={3} rule={Object.assign(this.state.lesson[0].rules)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackRule} />
                                    </div>
                                    <div class="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                        <Phrases key={4} phr={Object.assign(this.state.lesson[0].phr)} lexemes={this.state.lexemes} replicas={this.state.replicas} parentCallback={this.handleCallbackPhr} />
                                    </div>
                                    <div class="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                        <Dialogs key={5} dialog={Object.assign(this.state.lesson[0].dialog)} lexemes={this.state.lexemes} replicas={this.state.replicas} parentCallback={this.handleCallbackDialog} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div style={{ marginTop: "5%" }}>
                        <button disabled class="GreyBox">Статусы</button>
                        <div style={{ marginTop: "5%" }}>
                            <Statuses statuses={this.state.statuses} />
                        </div>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button type="button" class="DeleteLesson" onClick={this.deleteLesson}>Удалить урок</button>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button disabled class="GreyBox">Описание</button>
                        <Input style={{ marginTop: "3%", width: "94%" }} type="textarea" rows="4"></Input>
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <button type="button" class="Cancel" disabled>Отменить</button>
                        <button type="button" class="Save" onClick={this.checkStatuses}>Сохранить</button>
                    </div>
                </div>
                <Toaster position="bottom-right" />
            </div>
        )
    }
}