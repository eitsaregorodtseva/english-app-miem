import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Select from 'react-select';
import '../../style.css';
import model_word from "../../static/tips/model_word.jpg";
import model_consonant from "../../static/tips/model_consonant.jpg";
import model_syllable from "../../static/tips/model_consonant_2.jpg";
import model_vowel from "../../static/tips/model_vowel.jpg";
import model_vowel_2 from "../../static/tips/model_vowel_2.jpg";
import leks_syllables from "../../static/tips/leks_syllables.jpg";
import leks_insert_letter from "../../static/tips/leks_insert_letter.jpg";
import leks_insert_letters from "../../static/tips/leks_insert_letters.jpg";
import leks_create_word from "../../static/tips/leks_create_word.jpg";


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
            current_lex: { id_fr: null, id: 0, type_ex: 0, num_ex: 0 },
            id_lex: "",
            id_miss: "",
            id_var: "",
            options: [],
            options_letters: [],
            options_syllables: [],
            options_words: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        /*let options = [];
        let options_letters = [];
        let options_syllables = [];
        let options_words = [];
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
        }*/
        this.setState({
            lex: this.props.lex,
            lexemes: this.props.lexemes,
            options: this.props.options,
            options_letters: this.props.options_letters,
            options_syllables: this.props.options_syllables,
            options_words: this.props.options_words
        });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
        if (this.props.lex !== this.state.lex) {
            this.setState({
                lex: this.props.lex,
                current_lex: { id_fr: null, id: 0, type_ex: 0, num_ex: 0 }
            })
        }
        if (this.props.lexemes !== this.state.lexemes) {
            /*let options = [];
            let options_letters = [];
            let options_syllables = [];
            let options_words = [];
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
            }*/
            this.setState({
                lexemes: this.props.lexemes,
                options: this.props.options,
                options_letters: this.props.options_letters,
                options_syllables: this.props.options_syllables,
                options_words: this.props.options_words
            })
        }
    }

    handleChange = (event) => {
        let newLex = { ...this.state.current_lex, [event.target.name]: event.target.value };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    handleChangeOrder = (event) => {
        let num_ex = parseInt(event.target.value);
        let newLex = { ...this.state.current_lex, num_ex: num_ex };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_lex = [];
        if (typeof (event.value) === "number") {
            id_lex.push(event.value)
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_lex.push(event[i].value)
            }
        }
        console.log(id_lex);
        let newLex = { ...this.state.current_lex, id_lex: id_lex };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            id_lex: id_lex
        });
        this.passPropsToParent();
    }

    handleChangeMultipleNum = (event) => {
        let id_miss = [];
        if (typeof (event.value) === "number") {
            id_miss.push(event.value)
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_miss.push(event[i].value)
            }
        }
        console.log(id_miss);
        let newLex = { ...this.state.current_lex, id_miss: id_miss };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
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
        let newLex = { ...this.state.current_lex, id_var: id_var };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            id_var: id_var
        });
        this.passPropsToParent();
    }

    addNewLex = () => {
        let newLex = { id_fr: this.state.lex.length, id: 0, type_ex: 0, num_ex: 0 };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            lex: lex,
        });
        this.passPropsToParent();
    }

    showCurrentLex = (id_fr) => {
        switch (this.state.lex[id_fr].type_ex) {
            case 0:
                this.setState({
                    current_lex: this.state.lex[id_fr],
                });
                break;
            case 14:
            case 3:
            case 1:
            case 18:
                this.setState({
                    current_lex: this.state.lex[id_fr],
                    id_lex: this.state.lex[id_fr].id_lex ? this.state.lex[id_fr].id_lex : "",
                });
                break;
            case 2:
            case 7:
                this.setState({
                    current_lex: this.state.lex[id_fr],
                    id_lex: this.state.lex[id_fr].id_lex ? this.state.lex[id_fr].id_lex : "",
                });
                break;
            case 5:
                this.setState({
                    current_lex: this.state.lex[id_fr],
                    id_lex: this.state.lex[id_fr].id_lex ? this.state.lex[id_fr].id_lex : "",
                    id_miss: this.state.lex[id_fr].id_miss ? this.state.lex[id_fr].id_miss : "",
                    id_var: this.state.lex[id_fr].id_var ? this.state.lex[id_fr].id_var : "",
                });
                break;
            case 15:
                this.setState({
                    current_lex: this.state.lex[id_fr],
                    id_lex: this.state.lex[id_fr].id_lex ? this.state.lex[id_fr].id_lex : "",
                    id_miss: this.state.lex[id_fr].id_miss ? this.state.lex[id_fr].id_miss : "",
                    id_var: this.state.lex[id_fr].id_var ? this.state.lex[id_fr].id_var : "",
                });
                break;
            case 6:
                this.setState({
                    current_lex: this.state.lex[id_fr],
                    id_lex: this.state.lex[id_fr].id_lex ? this.state.lex[id_fr].id_lex : "",
                    id_var: this.state.lex[id_fr].id_var ? this.state.lex[id_fr].id_var : "",
                });
                break;
        }
    }

    getSelectedTypeLex = (event) => {
        let type_ex = parseInt(event.target.value);
        let newLex = { id_fr: this.state.current_lex.id_fr, type_ex: type_ex, id: 0,  num_ex: 0 };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            id_miss: "",
            id_var: "",
            id_lex: "",
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        let id_lex = [];
        id_lex.push(parseInt(event.target.value));
        let newLex = { ...this.state.current_lex, [event.target.name]: id_lex };
        let lex = this.state.lex;
        lex[newLex.id_fr] = newLex;
        this.setState({
            current_lex: newLex,
            lex: lex,
            [event.target.name]: id_lex
        });
        this.passPropsToParent();
    }

    deleteElement = (id_fr) => {
        let lex = this.state.lex;
        lex.splice(id_fr, 1);
        for (var i = 0; i < lex.length; i++) {
            lex[i].id_fr = i;
        }
        let newLex = { id_fr: null, type_ex: 0, id: 0, num_ex: 0 };
        this.setState({
            lex: lex,
            current_lex: newLex
        });
        this.passPropsToParent();
    }

    filterOptions(vl) {
        return this.includes(vl.value)
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.lex);
    }

    render() {
        return (
            <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col-sm-3" style={{ marginTop: "1%", overflow: "auto", minHeight: "5px", height: "450px", width: "210px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "180px" }} onClick={this.addNewLex}>Добавить</Button>
                        {this.state.lex.map((obj, i) =>
                            <Button style={{ width: "180px" }} key={obj.id_fr} color={this.state.current_lex.id_fr === i ? "primary" : "secondary"} onClick={() => this.showCurrentLex(i)}>Буквы-слова {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.lex.length === 0 || this.state.current_lex.id_fr === null ? <div></div> :
                    <div className="col" style={{ marginTop: "1%", width: "100px", height: "450px" }}>
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
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_lex.id_fr)}>Удалить</Button>
                            {this.state.current_lex.type_ex === 0 ? <div></div> :
                                this.state.current_lex.type_ex === 14 ?
                                    <div>
                                        <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                            <Label sm={2}>Буква:</Label>
                                            <Col sm={10}>
                                                <Select
                                                    options={this.state.options_letters}
                                                    name="colors"
                                                    value={this.state.options_letters.filter(this.filterOptions, this.state.id_lex)}
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    onChange={this.handleChangeMultiple}
                                                    placeholder="Выберите гласную букву"
                                                />
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_lex.type_ex === 3 ?
                                        <div>
                                            <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                <Label sm={2}>Буква:</Label>
                                                <Col sm={10}>
                                                    <Select
                                                        options={this.state.options_letters}
                                                        name="colors"
                                                        value={this.state.options_letters.filter(this.filterOptions, this.state.id_lex)}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeMultiple}
                                                        placeholder="Выберите согласную букву"
                                                    />
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_lex.type_ex === 2 ?
                                            <div>
                                                <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                    <Label sm={2}>Слоги:</Label>
                                                    <Col sm={10}>
                                                        <Select
                                                            options={this.state.options_syllables}
                                                            isMulti
                                                            name="colors"
                                                            value={this.state.options_syllables.filter(this.filterOptions, this.state.id_lex)}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={this.handleChangeMultiple}
                                                            placeholder="Выберите 2 слога"
                                                        />
                                                    </Col>
                                                </div>
                                            </div> :
                                            this.state.current_lex.type_ex === 1 ?
                                                <div>
                                                    <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                        <Label sm={2}>Слово:</Label>
                                                        <Col sm={10}>
                                                            <Select
                                                                options={this.state.options_words}
                                                                name="colors"
                                                                value={this.state.options_words.filter(this.filterOptions, this.state.id_lex)}
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                onChange={this.handleChangeMultiple}
                                                                placeholder="Выберите слово"
                                                            />
                                                        </Col>
                                                    </div>
                                                </div> :
                                                this.state.current_lex.type_ex === 18 ?
                                                    <div>
                                                        <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                            <Label sm={2}>Слово:</Label>
                                                            <Col sm={10}>
                                                                <Select
                                                                    options={this.state.options_words}
                                                                    name="colors"
                                                                    value={this.state.options_words.filter(this.filterOptions, this.state.id_lex)}
                                                                    className="basic-single"
                                                                    classNamePrefix="select"
                                                                    onChange={this.handleChangeMultiple}
                                                                    placeholder="Выберите слово"
                                                                />
                                                            </Col>
                                                        </div>
                                                    </div> :
                                                    this.state.current_lex.type_ex === 7 ?
                                                        <div>
                                                            <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                                <Label sm={2}>Слоги:</Label>
                                                                <Col sm={10}>
                                                                    <Select
                                                                        options={this.state.options_syllables}
                                                                        isMulti
                                                                        name="colors"
                                                                        value={this.state.options_syllables.filter(this.filterOptions, this.state.id_lex)}
                                                                        className="basic-multi-select"
                                                                        classNamePrefix="select"
                                                                        onChange={this.handleChangeMultiple}
                                                                        placeholder="Выберите 4 слога"
                                                                    />
                                                                </Col>
                                                            </div>
                                                        </div> :
                                                        this.state.current_lex.type_ex === 5 ?
                                                            <div>
                                                                <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                                    <Label sm={2}>Слово:</Label>
                                                                    <Col sm={10}>
                                                                        <Select
                                                                            options={this.state.options_words}
                                                                            name="colors"
                                                                            value={this.state.options_words.filter(this.filterOptions, this.state.id_lex)}
                                                                            className="basic-single"
                                                                            classNamePrefix="select"
                                                                            onChange={this.handleChangeMultiple}
                                                                            placeholder="Выберите слово"
                                                                        />
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                    <Label sm={4}>Пропущенная буква:</Label>
                                                                    <Col sm={8}>
                                                                        <Select
                                                                            options={numbers}
                                                                            name="colors"
                                                                            value={numbers.filter(this.filterOptions, this.state.id_miss)}
                                                                            className="basic-single"
                                                                            classNamePrefix="select"
                                                                            onChange={this.handleChangeMultipleNum}
                                                                            placeholder="Выберите номер буквы"
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
                                                                            value={this.state.options_letters.filter(this.filterOptions, this.state.id_var)}
                                                                            className="basic-multi-select"
                                                                            classNamePrefix="select"
                                                                            onChange={this.handleChangeMultipleVar}
                                                                            placeholder="Выберите варианты букв"
                                                                        />
                                                                    </Col>
                                                                </div>
                                                            </div> :
                                                            this.state.current_lex.type_ex === 15 ?
                                                                <div>
                                                                    <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                                        <Label sm={2}>Слово:</Label>
                                                                        <Col sm={10}>
                                                                            <Select
                                                                                options={this.state.options_words}
                                                                                name="colors"
                                                                                value={this.state.options_words.filter(this.filterOptions, this.state.id_lex)}
                                                                                className="basic-single"
                                                                                classNamePrefix="select"
                                                                                onChange={this.handleChangeMultiple}
                                                                                placeholder="Выберите слово"
                                                                            />
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                                        <Label sm={4}>Пропущенные буквы:</Label>
                                                                        <Col sm={8}>
                                                                            <Select
                                                                                options={numbers}
                                                                                isMulti
                                                                                name="colors"
                                                                                value={numbers.filter(this.filterOptions, this.state.id_miss)}
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
                                                                                value={this.state.options_letters.filter(this.filterOptions, this.state.id_var)}
                                                                                className="basic-multi-select"
                                                                                classNamePrefix="select"
                                                                                onChange={this.handleChangeMultipleVar}
                                                                                placeholder="Выберите варианты букв"
                                                                            />
                                                                        </Col>
                                                                    </div>
                                                                </div> :
                                                                this.state.current_lex.type_ex === 6 ?
                                                                    <div>
                                                                        <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                                            <Label sm={2}>Слово:</Label>
                                                                            <Col sm={10}>
                                                                                <Select
                                                                                    options={this.state.options_words}
                                                                                    name="colors"
                                                                                    value={this.state.options_words.filter(this.filterOptions, this.state.id_lex)}
                                                                                    className="basic-single"
                                                                                    classNamePrefix="select"
                                                                                    onChange={this.handleChangeMultiple}
                                                                                    placeholder="Выберите слово"
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
                                                                                    value={this.state.options_letters.filter(this.filterOptions, this.state.id_var)}
                                                                                    className="basic-multi-select"
                                                                                    classNamePrefix="select"
                                                                                    onChange={this.handleChangeMultipleVar}
                                                                                    placeholder="Выберите варианты букв"
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