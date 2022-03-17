import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import '../style.css';
import model_phrase from "../static/tips/model_phrase.jpg";
import model_phrase_2 from "../static/tips/model_phrase_2.jpg";
import phrase_create_word from "../static/tips/phrase_create_word.jpg";
import phrase_insert_words from "../static/tips/phrase_insert_words.jpg";

export default class Phrases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phr: this.props.phr,
            current_phr: { id: null, phr_type: 0 },
            word1: "",
            words: "",
            image1: "",
            image2: "",
            sound1: "",
            scheme1: "",
            scheme2: "",
            letters: "",
            phrase: "",
            stress: "",
            id_lexeme: "",
            id_lexeme_2: "",
            id_lexeme_3: "",
            lexemes: this.props.lexemes,
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewPhr = this.addNewPhr.bind(this);
        this.showCurrentPhr = this.showCurrentPhr.bind(this);
        this.getSelectedTypePhr = this.getSelectedTypePhr.bind(this);
    }

    handleChange(event) {
        let newPhr = { ...this.state.current_phr, [event.target.name]: event.target.value };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    addNewPhr() {
        let newPhr = { id: this.state.phr.length, phr_type: 0 };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            phr: phr,
        });
        this.passPropsToParent();
    }

    showCurrentPhr(id) {
        switch (this.state.phr[id].phr_type) {
            case 0:
                this.setState({
                    current_phr: this.state.phr[id],
                });
                break;
            case 4:
                this.setState({
                    current_phr: this.state.phr[id],
                    id_lexeme: this.state.phr[id].id_lexeme ? this.state.phr[id].id_lexeme : "",
                });
                break;
            case 19:
                this.setState({
                    current_phr: this.state.phr[id],
                    id_lexeme: this.state.phr[id].id_lexeme ? this.state.phr[id].id_lexeme : "",
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                });
                break;
            case 20:
                this.setState({
                    current_phr: this.state.phr[id],
                    id_lexeme: this.state.phr[id].id_lexeme ? this.state.phr[id].id_lexeme : "",
                    id_lexeme_2: this.state.phr[id].id_lexeme_2 ? this.state.phr[id].id_lexeme_2 : "",
                    id_lexeme_3: this.state.phr[id].id_lexeme_3 ? this.state.phr[id].id_lexeme_3 : "",
                });
                break;
        }
    }

    getSelectedTypePhr(event) {
        let phr_type = parseInt(event.target.value);
        let newPhr = { id: this.state.current_phr.id, phr_type: phr_type };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            word1: "",
            words: "",
            image1: "",
            image2: "",
            sound1: "",
            scheme1: "",
            scheme2: "",
            letters: "",
            phrase: "",
            stress: "",
            id_lexeme: "",
            id_lexeme_2: "",
            id_lexeme_3: "",
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        console.log(parseInt(event.target.value));
        console.log()
        let id_lexeme = parseInt(event.target.value);
        let newPhr = { ...this.state.current_phr, [event.target.name]: id_lexeme };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            [event.target.name]: id_lexeme
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let phr = this.state.phr;
        phr.splice(id, 1);
        for (var i = 0; i < phr.length; i++) {
            phr[i].id = i;
        }
        let newPhr = { id: null, phr_type: '0' };
        this.setState({
            phr: phr,
            current_phr: newPhr,
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.phr);
    }

    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "350px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewPhr()}>Добавить</Button>
                        {this.state.phr.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_phr.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentPhr(i)}>Фраза {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.phr.length === 0 || this.state.current_phr.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_phr.phr_type} onChange={this.getSelectedTypePhr}>
                                <option value={0}>Выберите тип</option>
                                <option value={4}>Моделирование фразы</option>
                                <option value={19}>Задание вставь буквы во фразу</option>
                                <option value={20}>Задание вставь слова</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_phr.id)}>Удалить</Button>
                            {this.state.current_phr.phr_type === 0 ? <div></div> :
                                this.state.current_phr.phr_type === 4 ?
                                    <div>
                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                            <Button id="Popover10" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover10" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_phrase} alt="" />
                                                    <img id="2" style={{ height: "150px", width: "150px" }} src={model_phrase_2} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                            <option value={0}>Выберите лексему</option>
                                            {this.state.lexemes.map((obj, i) =>
                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                            )}
                                        </select>
                                    </div> :
                                    this.state.current_phr.phr_type === 19 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover12" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover12" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={phrase_create_word} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Номер слова:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_phr.phr_type === 20 ?
                                            <div>
                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                    <Button id="Popover13" type="button">Подсказка</Button>
                                                    <UncontrolledPopover placement="right" target="Popover13" trigger="focus">
                                                        <PopoverBody>
                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={phrase_insert_words} alt="" />
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ответ:</Label>
                                                    <Col sm={8}>
                                                        <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                            <option value={0}>Выберите лексему</option>
                                                            {this.state.lexemes.map((obj, i) =>
                                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                            )}
                                                        </select>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Вариант 1:</Label>
                                                    <Col sm={8}>
                                                        <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_2" value={this.state.id_lexeme_2} onChange={this.getSelectedLexemeId}>
                                                            <option value={0}>Выберите лексему</option>
                                                            {this.state.lexemes.map((obj, i) =>
                                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                            )}
                                                        </select>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Вариант 2:</Label>
                                                    <Col sm={8}>
                                                        <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_3" value={this.state.id_lexeme_3} onChange={this.getSelectedLexemeId}>
                                                            <option value={0}>Выберите лексему</option>
                                                            {this.state.lexemes.map((obj, i) =>
                                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                            )}
                                                        </select>
                                                    </Col>
                                                </div>
                                            </div> :
                                            <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}