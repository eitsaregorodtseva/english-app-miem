import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Select from 'react-select';
import '../style.css';
import model_word from "../static/tips/model_word.jpg";
import model_consonant from "../static/tips/model_consonant.jpg";
import model_syllable from "../static/tips/model_consonant_2.jpg";
import model_vowel from "../static/tips/model_vowel.jpg";
import model_vowel_2 from "../static/tips/model_vowel_2.jpg";
import leks_syllables from "../static/tips/leks_syllables.jpg";
import leks_insert_letter from "../static/tips/leks_insert_letter.jpg";
import leks_insert_letters from "../static/tips/leks_insert_letters.jpg";
import leks_create_word from "../static/tips/leks_create_word.jpg";


const numbers = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" }];

export default class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lex: [],
            lexemes: [],
            current_lex: { id: null, type_ex: 0, num_ex: 0 },
            id_lex: "",
            vl_lex: "",
            id_miss: "",
            vl_miss: "",
            id_var: "",
            vl_var: "",
            options: [],
            options_letters: []
        }
    }

    componentDidMount() {
        let options = [];
        let options_letters = [];
        for (var i = 0; i < this.props.lexemes.length; i++) {
            options.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex });
            if (this.props.lexemes[i].type === "буква") {
                options_letters.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
        }

        this.setState({
            lex: this.props.lex,
            lexemes: this.props.lexemes,
            options: options,
            options_letters: options_letters
        });
    }

    handleChange = (event) => {
        let newLex = { ...this.state.current_lex, [event.target.name]: event.target.value };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    handleChangeOrder = (event) => {
        let newLex = { ...this.state.current_lex, num_ex: event.target.value };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_lex = [];
        for (var i = 0; i < event.length; i++) {
            id_lex.push(event[i].value)
        }
        console.log(id_lex);
        let newLex = { ...this.state.current_lex, id_lex: id_lex, vl_lex: event };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            vl_lex: event,
            id_lex: id_lex
        });
        this.passPropsToParent();
    }

    handleChangeMultipleNum = (event) => {
        let id_miss = [];
        let vl_miss = [];
        if (typeof (event.value) === "number") {
            id_miss.push(event.value);
            vl_miss = [event];
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_miss.push(event[i].value);
                vl_miss.push(event[i]);
            }
        }
        console.log(id_miss);
        let newLex = { ...this.state.current_lex, id_miss: id_miss, vl_miss: vl_miss };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            vl_miss: vl_miss,
            id_miss: id_miss
        });
        this.passPropsToParent();
    }

    handleChangeMultipleVar = (event) => {
        let id_var = [];
        for (var i = 0; i < event.length; i++) {
            id_var.push(event[i].value)
        }
        console.log(id_var);
        let newLex = { ...this.state.current_lex, id_var: id_var, vl_var: event };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            vl_var: event,
            id_var: id_var
        });
        this.passPropsToParent();
    }

    addNewLex = () => {
        let newLex = { id: this.state.lex.length, type_ex: 0, num_ex: 0 };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            lex: lex,
        });
        this.passPropsToParent();
    }

    showCurrentLex = (id) => {
        switch (this.state.lex[id].type_ex) {
            case 0:
                this.setState({
                    current_lex: this.state.lex[id],
                });
                break;
            case 14:
            case 3:
            case 1:
            case 18:
                this.setState({
                    current_lex: this.state.lex[id],
                    id_lex: this.state.lex[id].id_lex ? this.state.lex[id].id_lex : "",
                });
                break;
            case 2:
            case 7:
                this.setState({
                    current_lex: this.state.lex[id],
                    id_lex: this.state.lex[id].id_lex ? this.state.lex[id].id_lex : "",
                    vl_lex: this.state.lex[id].vl_lex ? this.state.lex[id].vl_lex : "",
                });
                break;
            case 5:
                this.setState({
                    current_lex: this.state.lex[id],
                    id_lex: this.state.lex[id].id_lex ? this.state.lex[id].id_lex : "",
                    id_miss: this.state.lex[id].id_miss ? this.state.lex[id].id_miss : "",
                    vl_miss: this.state.lex[id].vl_miss ? this.state.lex[id].vl_miss : "",
                    id_var: this.state.lex[id].id_var ? this.state.lex[id].id_var : "",
                    vl_var: this.state.lex[id].vl_var ? this.state.lex[id].vl_var : "",
                });
                break;
            case 15:
                this.setState({
                    current_lex: this.state.lex[id],
                    id_lex: this.state.lex[id].id_lex ? this.state.lex[id].id_lex : "",
                    id_miss: this.state.lex[id].id_miss ? this.state.lex[id].id_miss : "",
                    vl_miss: this.state.lex[id].vl_miss ? this.state.lex[id].vl_miss : "",
                    id_var: this.state.lex[id].id_var ? this.state.lex[id].id_var : "",
                    vl_var: this.state.lex[id].vl_var ? this.state.lex[id].vl_var : "",
                });
                break;
            case 6:
                this.setState({
                    current_lex: this.state.lex[id],
                    id_lex: this.state.lex[id].id_lex ? this.state.lex[id].id_lex : "",
                    id_var: this.state.lex[id].id_var ? this.state.lex[id].id_var : "",
                    vl_var: this.state.lex[id].vl_var ? this.state.lex[id].vl_var : "",
                });
                break;
        }
    }

    getSelectedTypeLex = (event) => {
        let type_ex = parseInt(event.target.value);
        let newLex = { id: this.state.current_lex.id, type_ex: type_ex, num_ex: 0 };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            id_miss: "",
            vl_miss: "",
            id_var: "",
            vl_var: "",
            id_lex: "",
            vl_lex: ""
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        let id_lex = parseInt(event.target.value);
        let newLex = { ...this.state.current_lex, [event.target.name]: id_lex };
        let lex = this.state.lex;
        lex[newLex.id] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            [event.target.name]: id_lex
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let lex = this.state.lex;
        lex.splice(id, 1);
        for (var i = 0; i < lex.length; i++) {
            lex[i].id = i;
        }
        let newLex = { id: null, type_ex: 0, num_ex: 0 };
        this.setState({
            lex: lex,
            current_lex: newLex
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.lex);
    }

    render() {
        return (
            <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "450px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={this.addNewLex}>Добавить</Button>
                        {this.state.lex.map((obj, i) =>
                            <Button style={{ width: "190px" }} key={i} color={this.state.current_lex.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentLex(i)}>Буквы-слова {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.lex.length === 0 || this.state.current_lex.id === null ? <div></div> :
                    <div className="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select className="form-select" style={{ marginBottom: "20px" }} value={this.state.current_lex.type_ex} onChange={this.getSelectedTypeLex}>
                                <option value={0}>Выберите тип</option>
                                <option value={14}>Моделирование гласной</option>
                                <option value={3}>Моделирование согласной</option>
                                <option value={2}>Моделирование слога</option>
                                <option value={1}>Моделирование слова</option>
                                <option value={18}>Повтор слова</option>
                                <option value={7}>Задание на слоги</option>
                                <option value={5}>Задание на выбор буквы</option>
                                <option value={15}>Задание на выбор букв</option>
                                <option value={6}>Задание на составление слова</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_lex.id)}>Удалить</Button>
                            {this.state.current_lex.type_ex === 0 ? <div></div> :
                                this.state.current_lex.type_ex === 14 ?
                                    <div>
                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                            <Button id="Popover2" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover2" trigger="focus">
                                                <PopoverBody row="true">
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_vowel} alt="" />
                                                    <img id="2" style={{ height: "150px", width: "150px" }} src={model_vowel_2} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={3}>Номер в уроке:</Label>
                                            <Col sm={2}>
                                                <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                            <Label sm={2}>Лексема:</Label>
                                            <Col sm={10}>
                                                <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                    <option value={0}>Выберите лексему</option>
                                                    {this.state.lexemes.map((obj, i) =>
                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                    )}
                                                </select>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_lex.type_ex === 3 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover2" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover2" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={model_consonant} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={3}>Номер в уроке:</Label>
                                                <Col sm={2}>
                                                    <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={2}>Лексема:</Label>
                                                <Col sm={10}>
                                                    <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                        <option value={0}>Выберите лексему</option>
                                                        {this.state.lexemes.map((obj, i) =>
                                                            <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                        )}
                                                    </select>
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_lex.type_ex === 2 ?
                                            <div>
                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                    <Button id="Popover3" type="button">Подсказка</Button>
                                                    <UncontrolledPopover placement="right" target="Popover3" trigger="focus">
                                                        <PopoverBody>
                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={model_syllable} alt="" />
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={3}>Номер в уроке:</Label>
                                                    <Col sm={2}>
                                                        <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                    </Col>
                                                </div>
                                                <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                    <Label sm={2}>Лексемы:</Label>
                                                    <Col sm={10}>
                                                        <Select
                                                            options={this.state.options}
                                                            isMulti
                                                            name="colors"
                                                            value={this.state.vl_lex}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={this.handleChangeMultiple}
                                                            placeholder="Выберите лексемы"
                                                        />
                                                    </Col>
                                                </div>
                                            </div> :
                                            this.state.current_lex.type_ex === 1 ?
                                                <div>
                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                        <Button id="Popover4" type="button">Подсказка</Button>
                                                        <UncontrolledPopover placement="right" target="Popover4" trigger="focus">
                                                            <PopoverBody>
                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={model_word} alt="" />
                                                            </PopoverBody>
                                                        </UncontrolledPopover>
                                                    </div>
                                                    <div className="row StructureFields">
                                                        <Label sm={3}>Номер в уроке:</Label>
                                                        <Col sm={2}>
                                                            <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                        </Col>
                                                    </div>
                                                    <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                        <Label sm={2}>Лексема:</Label>
                                                        <Col sm={10}>
                                                            <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                                <option value={0}>Выберите лексему</option>
                                                                {this.state.lexemes.map((obj, i) =>
                                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                )}
                                                            </select>
                                                        </Col>
                                                    </div>
                                                </div> :
                                                this.state.current_lex.type_ex === 18 ?
                                                    <div>
                                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                            <Button id="Popover5" type="button">Подсказка</Button>
                                                            <UncontrolledPopover placement="right" target="Popover5" trigger="focus">
                                                                <PopoverBody>
                                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_word} alt="" />
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                        <div className="row StructureFields">
                                                            <Label sm={3}>Номер в уроке:</Label>
                                                            <Col sm={2}>
                                                                <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                            </Col>
                                                        </div>
                                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                            <Label sm={2}>Лексема:</Label>
                                                            <Col sm={10}>
                                                                <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                                    <option value={0}>Выберите лексему</option>
                                                                    {this.state.lexemes.map((obj, i) =>
                                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                    )}
                                                                </select>
                                                            </Col>
                                                        </div>
                                                    </div> :
                                                    this.state.current_lex.type_ex === 7 ?
                                                        <div>
                                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                <Button id="Popover6" type="button">Подсказка</Button>
                                                                <UncontrolledPopover placement="right" target="Popover6" trigger="focus">
                                                                    <PopoverBody>
                                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={leks_syllables} alt="" />
                                                                    </PopoverBody>
                                                                </UncontrolledPopover>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={3}>Номер в уроке:</Label>
                                                                <Col sm={2}>
                                                                    <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                <Label sm={2}>Лексемы:</Label>
                                                                <Col sm={10}>
                                                                    <Select
                                                                        options={this.state.options}
                                                                        isMulti
                                                                        name="colors"
                                                                        value={this.state.vl_lex}
                                                                        className="basic-multi-select"
                                                                        classNamePrefix="select"
                                                                        onChange={this.handleChangeMultiple}
                                                                        placeholder="Выберите лексемы"
                                                                    />
                                                                </Col>
                                                            </div>
                                                        </div> :
                                                        this.state.current_lex.type_ex === 5 ?
                                                            <div>
                                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                    <Button id="Popover7" type="button">Подсказка</Button>
                                                                    <UncontrolledPopover placement="right" target="Popover7" trigger="focus">
                                                                        <PopoverBody>
                                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={leks_insert_letter} alt="" />
                                                                        </PopoverBody>
                                                                    </UncontrolledPopover>
                                                                </div>
                                                                <div className="row StructureFields">
                                                                    <Label sm={3}>Номер в уроке:</Label>
                                                                    <Col sm={2}>
                                                                        <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                    <Label sm={2}>Лексема:</Label>
                                                                    <Col sm={10}>
                                                                        <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                                            <option value={0}>Выберите лексему</option>
                                                                            {this.state.lexemes.map((obj, i) =>
                                                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                            )}
                                                                        </select>
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                    <Label sm={3}>Номер буквы:</Label>
                                                                    <Col sm={9}>
                                                                        <Select
                                                                            options={numbers}
                                                                            name="colors"
                                                                            value={this.state.vl_miss}
                                                                            className="basic-multi-select"
                                                                            classNamePrefix="select"
                                                                            onChange={this.handleChangeMultipleNum}
                                                                            placeholder="Выберите номер буквы"
                                                                        />
                                                                    </Col>
                                                                </div>
                                                                {/*<div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                    <Label sm={3}>Варианты:</Label>
                                                                    <Col sm={9}>
                                                                        <Input type="text" name="var" value={this.state.var} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                            </div>*/}
                                                                <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                    <Label sm={2}>Буквы:</Label>
                                                                    <Col sm={10}>
                                                                        <Select
                                                                            options={this.state.options_letters}
                                                                            isMulti
                                                                            name="colors"
                                                                            value={this.state.vl_var}
                                                                            className="basic-multi-select"
                                                                            classNamePrefix="select"
                                                                            onChange={this.handleChangeMultipleVar}
                                                                            placeholder="Выберите буквы"
                                                                        />
                                                                    </Col>
                                                                </div>
                                                            </div> :
                                                            this.state.current_lex.type_ex === 15 ?
                                                                <div>
                                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                        <Button id="Popover8" type="button">Подсказка</Button>
                                                                        <UncontrolledPopover placement="right" target="Popover8" trigger="focus">
                                                                            <PopoverBody>
                                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={leks_insert_letters} alt="" />
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                    </div>
                                                                    <div className="row StructureFields">
                                                                        <Label sm={3}>Номер в уроке:</Label>
                                                                        <Col sm={2}>
                                                                            <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                        <Label sm={2}>Лексема:</Label>
                                                                        <Col sm={10}>
                                                                            <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                                                <option value={0}>Выберите лексему</option>
                                                                                {this.state.lexemes.map((obj, i) =>
                                                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                                )}
                                                                            </select>
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                        <Label sm={3}>Номера букв:</Label>
                                                                        <Col sm={9}>
                                                                            <Select
                                                                                options={numbers}
                                                                                isMulti
                                                                                name="colors"
                                                                                value={this.state.vl_miss}
                                                                                className="basic-multi-select"
                                                                                classNamePrefix="select"
                                                                                onChange={this.handleChangeMultipleNum}
                                                                                placeholder="Выберите номера букв"
                                                                            />
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                        <Label sm={2}>Буквы:</Label>
                                                                        <Col sm={10}>
                                                                            <Select
                                                                                options={this.state.options_letters}
                                                                                isMulti
                                                                                name="colors"
                                                                                value={this.state.vl_var}
                                                                                className="basic-multi-select"
                                                                                classNamePrefix="select"
                                                                                onChange={this.handleChangeMultipleVar}
                                                                                placeholder="Выберите буквы"
                                                                            />
                                                                        </Col>
                                                                    </div>
                                                                </div> :
                                                                this.state.current_lex.type_ex === 6 ?
                                                                    <div>
                                                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                            <Button id="Popover9" type="button">Подсказка</Button>
                                                                            <UncontrolledPopover placement="right" target="Popover9" trigger="focus">
                                                                                <PopoverBody>
                                                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={leks_create_word} alt="" />
                                                                                </PopoverBody>
                                                                            </UncontrolledPopover>
                                                                        </div>
                                                                        <div className="row StructureFields">
                                                                            <Label sm={3}>Номер в уроке:</Label>
                                                                            <Col sm={2}>
                                                                                <Input type="number" name="num_ex" value={this.state.current_lex.num_ex} onChange={this.handleChangeOrder}></Input>
                                                                            </Col>
                                                                        </div>
                                                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                            <Label sm={2}>Лексема:</Label>
                                                                            <Col sm={10}>
                                                                                <select className="form-select" name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                                                    <option value={0}>Выберите лексему</option>
                                                                                    {this.state.lexemes.map((obj, i) =>
                                                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                                    )}
                                                                                </select>
                                                                            </Col>
                                                                        </div>
                                                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                            <Label sm={2}>Буквы:</Label>
                                                                            <Col sm={10}>
                                                                                <Select
                                                                                    options={this.state.options_letters}
                                                                                    isMulti
                                                                                    name="colors"
                                                                                    value={this.state.vl_var}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select"
                                                                                    onChange={this.handleChangeMultipleVar}
                                                                                    placeholder="Выберите буквы"
                                                                                />
                                                                            </Col>
                                                                        </div>
                                                                    </div> :
                                                                    <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}