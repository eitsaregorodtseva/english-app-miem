import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Select from 'react-select';
import '../../style.css';
import model_phrase from "../../static/tips/model_phrase.jpg";
import model_phrase_2 from "../../static/tips/model_phrase_2.jpg";
import phrase_create_word from "../../static/tips/phrase_create_word.jpg";
import phrase_insert_words from "../../static/tips/phrase_insert_words.jpg";

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

export default class Phrases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phr: [],
            lexemes: [],
            replicas: [],
            current_phr: { id_fr: null, id: 0, type_ex: 0, num_ex: 0 },
            id_rep: "",
            id_miss: "",
            id_var: "",
            options: [],
            options_replicas: [],
            options_words: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewPhr = this.addNewPhr.bind(this);
        this.showCurrentPhr = this.showCurrentPhr.bind(this);
        this.getSelectedTypePhr = this.getSelectedTypePhr.bind(this);
    }

    componentDidMount() {
        /*let options = [];
        let options_words = [];
        for (var i = 0; i < this.props.lexemes.length; i++) {
            options.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex });
            if (this.props.lexemes[i].type === "буква" || this.props.lexemes[i].type === "слово") {
                options_words.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
        }
        let options_phrases = [];
        for (var i = 0; i < this.props.replicas.length; i++) {
            options_phrases.push({ value: this.props.replicas[i].id_rep, label: this.props.replicas[i].lexeme.mean_lex + this.props.replicas[i].symbol})
        }
        console.log(options_words);*/
        this.setState({
            phr: this.props.phr,
            lexemes: this.props.lexemes,
            replicas: this.props.replicas,
            options: this.props.options,
            options_replicas: this.props.options_replicas,
            options_words: this.props.options_words
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.phr !== this.state.phr) {
            this.setState({
                phr: this.props.phr,
                current_phr: { id_fr: null, id: 0, type_ex: 0, num_ex: 0 }
            })
        }
        if (this.props.lexemes !== this.state.lexemes) {
            this.setState({
                lexemes: this.props.lexemes,
                replicas: this.props.replicas,
                options: this.props.options,
                options_replicas: this.props.options_replicas,
                options_words: this.props.options_words
            })
        }
    }

    handleChange(event) {
        let newPhr = { ...this.state.current_phr, [event.target.name]: event.target.value };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    handleChangeOrder = (event) => {
        let num_ex = parseInt(event.target.value);
        let newPhr = { ...this.state.current_phr, num_ex: num_ex };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
        });
        this.passPropsToParent();
    }

    handleChangeSingle = (event) => {
        let id_rep = [];
        if (typeof (event.value) === "number") {
            id_rep.push(event.value)
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_rep.push(event[i].value)
            }
        }
        let newPhr = { ...this.state.current_phr, id_rep: id_rep };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            id_rep: id_rep
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_var = [];
        for (var i = 0; i < event.length; i++) {
            id_var.push(event[i].value)
        }
        console.log(id_var);
        let newPhr = { ...this.state.current_phr, id_var: id_var };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            id_var: id_var
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
        let newPhr = { ...this.state.current_phr, id_miss: id_miss };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            id_miss: id_miss
        });
        this.passPropsToParent();
    }

    addNewPhr() {
        let newPhr = { id_fr: this.state.phr.length, id: 0, type_ex: 0, num_ex: 0 };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            phr: phr,
        });
        this.passPropsToParent();
    }

    showCurrentPhr(id_fr) {
        switch (this.state.phr[id_fr].type_ex) {
            case 0:
                this.setState({
                    current_phr: this.state.phr[id_fr],
                });
                break;
            case 4:
                this.setState({
                    current_phr: this.state.phr[id_fr],
                    id_rep: this.state.phr[id_fr].id_rep ? this.state.phr[id_fr].id_rep : "",
                });
                break;
            case 19:
                this.setState({
                    current_phr: this.state.phr[id_fr],
                    id_rep: this.state.phr[id_fr].id_rep ? this.state.phr[id_fr].id_rep : "",
                    id_miss: this.state.phr[id_fr].id_miss ? this.state.phr[id_fr].id_miss : "",
                });
                break;
            case 20:
                this.setState({
                    current_phr: this.state.phr[id_fr],
                    id_rep: this.state.phr[id_fr].id_rep ? this.state.phr[id_fr].id_rep : "",
                    id_var: this.state.phr[id_fr].id_var ? this.state.phr[id_fr].id_var : "",
                    id_miss: this.state.phr[id_fr].id_miss ? this.state.phr[id_fr].id_miss : ""
                });
                break;
        }
        console.log(this.state.id_var)
    }

    getSelectedTypePhr(event) {
        let type_ex = parseInt(event.target.value);
        let newPhr = { id_fr: this.state.current_phr.id_fr, id: 0, type_ex: type_ex, num_ex: 0 };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            id_rep: "",
            id_miss: "",
            id_var: "",
        });
        this.passPropsToParent();
    }

    getSelectedRepId = (event) => {
        let id_rep = [];
        id_rep.push(parseInt(event.target.value));
        let newPhr = { ...this.state.current_phr, [event.target.name]: id_rep };
        let phr = this.state.phr;
        phr[newPhr.id_fr] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            [event.target.name]: id_rep
        });
        this.passPropsToParent();
    }

    deleteElement = (id_fr) => {
        let phr = this.state.phr;
        phr.splice(id_fr, 1);
        for (var i = 0; i < phr.length; i++) {
            phr[i].id_fr = i;
        }
        let newPhr = { id_fr: null, id: 0, type_ex: 0, num_ex: 0 };
        this.setState({
            phr: phr,
            current_phr: newPhr,
        });
        this.passPropsToParent();
    }

    filterOptions(vl) {
        return this.includes(vl.value)
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.phr);
    }

    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflow: "auto", minHeight: "5px", height: "4200px", width: "210px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "180px" }} onClick={() => this.addNewPhr()}>Добавить</Button>
                        {this.state.phr.map((obj, i) =>
                            <Button style={{ width: "180px" }} key={obj.id_fr} color={this.state.current_phr.id_fr === i ? "primary" : "secondary"} onClick={() => this.showCurrentPhr(i)}>Фраза {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.phr.length === 0 || this.state.current_phr.id_fr === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "100px", height: "420px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_phr.type_ex} onChange={this.getSelectedTypePhr}>
                                <option value={0}>Выберите тип</option>
                                <option value={4}>Моделирование фразы</option>
                                <option value={19}>Задание вставь буквы во фразу</option>
                                <option value={20}>Задание вставь слова</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_phr.id_fr)}>Удалить</Button>
                            {this.state.current_phr.type_ex === 0 ? <div></div> :
                                this.state.current_phr.type_ex === 4 ?
                                    <div>
                                        <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
                                            <Button id="Popover10" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover10" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_phrase} alt="" />
                                                    <img id="2" style={{ height: "150px", width: "150px" }} src={model_phrase_2} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={3}>Номер в уроке:</Label>
                                            <Col sm={2}>
                                                <Input type="number" name="num_ex" value={this.state.current_phr.num_ex} onChange={this.handleChangeOrder}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                            <Label sm={3}>Фраза:</Label>
                                            <Col sm={9}>
                                                <Select
                                                    options={this.state.options_replicas}
                                                    value={this.state.options_replicas.filter(this.filterOptions, this.state.id_rep)}
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    onChange={this.handleChangeSingle}
                                                    placeholder="Выберите фразу"
                                                />
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_phr.type_ex === 19 ?
                                        <div>
                                            <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
                                                <Button id="Popover12" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover12" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={phrase_create_word} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={3}>Номер в уроке:</Label>
                                                <Col sm={2}>
                                                    <Input type="number" name="num_ex" value={this.state.current_phr.num_ex} onChange={this.handleChangeOrder}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Фраза:</Label>
                                                <Col sm={9}>
                                                    <Select
                                                        options={this.state.options_replicas}
                                                        value={this.state.options_replicas.filter(this.filterOptions, this.state.id_rep)}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeSingle}
                                                        placeholder="Выберите фразу"
                                                    />
                                                </Col>
                                            </div>
                                            <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={5}>Слово для упражнения:</Label>
                                                <Col sm={6}>
                                                    <Select
                                                        options={numbers}
                                                        value={numbers.filter(this.filterOptions, this.state.id_miss)}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeMultipleNum}
                                                        placeholder="Выберите номер слова"
                                                    />
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_phr.type_ex === 20 ?
                                            <div>
                                                <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
                                                    <Button id="Popover13" type="button">Подсказка</Button>
                                                    <UncontrolledPopover placement="right" target="Popover13" trigger="focus">
                                                        <PopoverBody>
                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={phrase_insert_words} alt="" />
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={3}>Номер в уроке:</Label>
                                                    <Col sm={2}>
                                                        <Input type="number" name="num_ex" value={this.state.current_phr.num_ex} onChange={this.handleChangeOrder}></Input>
                                                    </Col>
                                                </div>
                                                <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                    <Label sm={3}>Ответ:</Label>
                                                    <Col sm={9}>
                                                        <Select
                                                            options={this.state.options_replicas}
                                                            value={this.state.options_replicas.filter(this.filterOptions, this.state.id_rep)}
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            onChange={this.handleChangeSingle}
                                                            placeholder="Выберите фразу"
                                                        />
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                    <Label sm={4}>Пропущенные слова:</Label>
                                                    <Col sm={6}>
                                                        <Select
                                                            options={numbers}
                                                            isMulti
                                                            value={numbers.filter(this.filterOptions, this.state.id_miss)}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={this.handleChangeMultipleNum}
                                                            placeholder="Выберите номера слов"
                                                        />
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                    <Label sm={3}>Варианты:</Label>
                                                    <Col sm={9}>
                                                        <Select
                                                            options={this.state.options_words}
                                                            isMulti
                                                            value={this.state.options_words.filter(this.filterOptions, this.state.id_var)}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={this.handleChangeMultiple}
                                                            placeholder="Выберите варианты слов"
                                                        />
                                                    </Col>
                                                </div>

                                            </div> :
                                            <div></div>}
                        </Form>
                    </div >}
            </div>)
    }
}