import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useEffect, useState } from "react";
import { Col, Input, Label } from "reactstrap";
import Videos from './Videos';
import Vocabulary from './Vocabulary';
import Phrases from './Phrases';
import Rules from './Rules';
import Dialogs from './Dialogs';
import Statuses from './Statuses';
import '../style.css';

export default class Lesson extends Component {
    constructor(props) {
        super();
        this.state = {
            lexemes: [],
            replicas: [],
            videos: [],
            name_les: "",
            lesson: {
                lex: [],
                phr: [],
                dialog: [],
                rules: []
            },
            video: { id_video: null },
            statuses: {},
            options: [],
            options_letters: [],
            options_syllables: [],
            options_words: [],
            options_dialogs: [],
            options_replicas: []
        }
    }

    componentDidMount() {
        let options = [];
        let options_letters = [];
        let options_syllables = [];
        let options_words = [];
        let options_dialogs = [];
        let options_replicas = [];
        for (var i = 0; i < this.props.lexemes.length; i++) {
            options.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex });
            if (this.props.lexemes[i].type === "буква") {
                options_letters.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
            if (this.props.lexemes[i].type === "слог") {
                options_syllables.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
            if (this.props.lexemes[i].type === "слово") {
                options_words.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
            if (this.props.lexemes[i].type === "диалог") {
                options_dialogs.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
        }
        for (var i = 0; i < this.props.replicas.length; i++) {
            options_replicas.push({ value: this.props.replicas[i].id_rep, label: this.props.replicas[i].lexeme.mean_lex + this.props.replicas[i].symbol })
        }
        this.setState({
            lesson: this.props.lesson,
            statuses: this.props.statuses,
            lexemes: this.props.lexemes,
            replicas: this.props.replicas,
            name_les: this.props.name_les,
            videos: this.props.videos,
            video: this.props.video,
            options: options,
            options_letters: options_letters,
            options_syllables: options_syllables,
            options_words: options_words,
            options_dialogs: options_dialogs,
            options_replicas: options_replicas
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
        if (this.props.lesson !== this.state.lesson) {
            this.setState({
                lesson: this.props.lesson,
                statuses: this.props.statuses,
                lexemes: this.props.lexemes,
                replicas: this.props.replicas,
                name_les: this.props.name_les,
                videos: this.props.videos,
                video: this.props.video
            })
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.passPropsToParent();
    }

    handleCallbackVoc = (props) => {
        let newLesson = this.state.lesson;
        newLesson.lex = props;
        this.setState({ lesson: newLesson });
        this.passPropsToParent();
    }

    handleCallbackPhr = (props) => {
        let newLesson = this.state.lesson;
        newLesson.phr = props;
        this.setState({ lesson: newLesson });
        this.passPropsToParent();
    }

    handleCallbackDialog = (props) => {
        let newLesson = this.state.lesson;
        newLesson.dialog = props;
        this.setState({ lesson: newLesson });
        this.passPropsToParent();
    }

    handleCallbackRule = (props) => {
        let newLesson = this.state.lesson;
        newLesson.rules = props;
        this.setState({ lesson: newLesson });
        this.passPropsToParent();
    }

    passPropsToParent() {
        let state = {
            lesson: this.state.lesson,
            statuses: this.state.statuses,
            video: this.state.video,
            name_les: this.state.name_les
        };
        this.props.parentCallback(state);
    }

    render() {
        return (
            <div>
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
                    <div style={{ marginTop: "5%", marginLeft: "3%", overflow: "auto", width: "90%", minWidth: "600px" }} >
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
                                <Vocabulary lex={Object.assign(this.state.lesson.lex)}
                                    lexemes={this.state.lexemes}
                                    options={this.state.options}
                                    options_letters={this.state.options_letters}
                                    options_syllables={this.state.options_syllables}
                                    options_words={this.state.options_words}
                                    parentCallback={this.handleCallbackVoc} />
                            </div>
                            <div className="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                <Rules rule={Object.assign(this.state.lesson.rules)}
                                    lexemes={this.state.lexemes}
                                    options={this.state.options}
                                    options_words={this.state.options_words}
                                    parentCallback={this.handleCallbackRule} />
                            </div>
                            <div className="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                <Phrases phr={Object.assign(this.state.lesson.phr)}
                                    lexemes={this.state.lexemes}
                                    replicas={this.state.replicas}
                                    options={this.state.options}
                                    options_words={this.state.options_words}
                                    options_phrases={this.state.options_phrases}
                                    parentCallback={this.handleCallbackPhr} />
                            </div>
                            <div className="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                <Dialogs dialog={Object.assign(this.state.lesson.dialog)}
                                    lexemes={this.state.lexemes}
                                    options_replicas={this.state.options_replicas}
                                    options_dialogs={this.state.options_dialogs}
                                    parentCallback={this.handleCallbackDialog} />
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
        )
    }
}