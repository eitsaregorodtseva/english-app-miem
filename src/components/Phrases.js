import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Select from 'react-select';
import '../style.css';
import model_phrase from "../static/tips/model_phrase.jpg";
import model_phrase_2 from "../static/tips/model_phrase_2.jpg";
import phrase_create_word from "../static/tips/phrase_create_word.jpg";
import phrase_insert_words from "../static/tips/phrase_insert_words.jpg";

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
            current_phr: { id: null, type_ex: 0, id_ex: 0 },
            id_rep: "",
            id_miss: "",
            vl_miss: "",
            id_var: "",
            vl_var: "",
            options: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewPhr = this.addNewPhr.bind(this);
        this.showCurrentPhr = this.showCurrentPhr.bind(this);
        this.getSelectedTypePhr = this.getSelectedTypePhr.bind(this);
    }

    componentDidMount() {
        let options = [];
        for (var i = 0; i < this.props.replicas.length; i++) {
            options.push({ value: this.props.replicas[i].id_rep, label: this.props.replicas[i].lexeme.mean_lex + this.props.replicas[i].symbol })
        }
        this.setState({
            phr: this.props.phr,
            lexemes: this.props.lexemes,
            replicas: this.props.replicas,
            options: options
        });
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

    handleChangeOrder = (event) => {
        let newPhr = { ...this.state.current_phr, id_ex: event.target.value };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_var = [];
        for (var i = 0; i < event.length; i++) {
            id_var.push(event[i].value)
        }
        console.log(id_var);
        let newPhr = { ...this.state.current_phr, id_var: id_var, vl_var: event };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            id_var: id_var,
            vl_var: event
        });
        this.passPropsToParent();
    }

    handleChangeMultipleNum = (event) => {
        let id_miss = [];
        let vl_miss = [];
        id_miss.push(event.value);
        vl_miss = [event];
        console.log(id_miss);
        let newPhr = { ...this.state.current_phr, id_miss: id_miss, vl_miss: vl_miss };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            vl_miss: vl_miss,
            id_miss: id_miss
        });
        this.passPropsToParent();
    }

    addNewPhr() {
        let newPhr = { id: this.state.phr.length, type_ex: 0, id_ex: 0 };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            phr: phr,
        });
        this.passPropsToParent();
    }

    showCurrentPhr(id) {
        switch (this.state.phr[id].type_ex) {
            case 0:
                this.setState({
                    current_phr: this.state.phr[id],
                });
                break;
            case 4:
                this.setState({
                    current_phr: this.state.phr[id],
                    id_rep: this.state.phr[id].id_rep ? this.state.phr[id].id_rep : "",
                });
                break;
            case 19:
                this.setState({
                    current_phr: this.state.phr[id],
                    id_rep: this.state.phr[id].id_rep ? this.state.phr[id].id_rep : "",
                    id_miss: this.state.phr[id].id_miss ? this.state.phr[id].id_miss : "",
                    vl_miss: this.state.phr[id].vl_miss ? this.state.phr[id].vl_miss : "",
                });
                break;
            case 20:
                this.setState({
                    current_phr: this.state.phr[id],
                    id_rep: this.state.phr[id].id_rep ? this.state.phr[id].id_rep : "",
                    id_var: this.state.phr[id].id_var ? this.state.phr[id].id_var : "",
                    vl_var: this.state.phr[id].vl_var ? this.state.phr[id].vl_var : "",
                });
                break;
        }
    }

    getSelectedTypePhr(event) {
        let type_ex = parseInt(event.target.value);
        let newPhr = { id: this.state.current_phr.id, type_ex: type_ex, id_ex: 0 };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            id_rep: "",
            id_miss: "",
            vl_miss: "",
            id_var: "",
            vl_var: ""
        });
        this.passPropsToParent();
    }

    getSelectedRepId = (event) => {
        let id_rep = parseInt(event.target.value);
        let newPhr = { ...this.state.current_phr, [event.target.name]: id_rep };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            [event.target.name]: id_rep
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let phr = this.state.phr;
        phr.splice(id, 1);
        for (var i = 0; i < phr.length; i++) {
            phr[i].id = i;
        }
        let newPhr = { id: null, type_ex: 0, id_ex: 0 };
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
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_phr.type_ex} onChange={this.getSelectedTypePhr}>
                                <option value={0}>Выберите тип</option>
                                <option value={4}>Моделирование фразы</option>
                                <option value={19}>Задание вставь буквы во фразу</option>
                                <option value={20}>Задание вставь слова</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_phr.id)}>Удалить</Button>
                            {this.state.current_phr.type_ex === 0 ? <div></div> :
                                this.state.current_phr.type_ex === 4 ?
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
                                        <div className="row StructureFields">
                                            <Label sm={3}>Номер в уроке:</Label>
                                            <Col sm={2}>
                                                <Input type="number" name="id_ex" value={this.state.current_phr.id_ex} onChange={this.handleChangeOrder}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                            <Label sm={2}>Фраза:</Label>
                                            <Col sm={10}>
                                                <select class="form-select" name="id_rep" value={this.state.id_rep} onChange={this.getSelectedRepId}>
                                                    <option value={0}>Выберите лексему</option>
                                                    {this.state.replicas.map((obj, i) =>
                                                        <option value={obj.id_rep}>{obj.lexeme.mean_lex + obj.symbol}</option>
                                                    )}
                                                </select>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_phr.type_ex === 19 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
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
                                                    <Input type="number" name="id_ex" value={this.state.current_phr.id_ex} onChange={this.handleChangeOrder}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={2}>Фраза:</Label>
                                                <Col sm={10}>
                                                    <select class="form-select" name="id_rep" value={this.state.id_rep} onChange={this.getSelectedRepId}>
                                                        <option value={0}>Выберите лексему</option>
                                                        {this.state.replicas.map((obj, i) =>
                                                            <option value={obj.id_rep}>{obj.lexeme.mean_lex + obj.symbol}</option>
                                                        )}
                                                    </select>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Номер слова:</Label>
                                                <Col sm={5}>
                                                    <Select
                                                        options={numbers}
                                                        value={this.state.vl_miss}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeMultipleNum}
                                                        placeholder="Выберите номер"
                                                    />
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_phr.type_ex === 20 ?
                                            <div>
                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
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
                                                        <Input type="number" name="id_ex" value={this.state.current_phr.id_ex} onChange={this.handleChangeOrder}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                    <Label sm={3}>Ответ:</Label>
                                                    <Col sm={9}>
                                                        <select class="form-select" name="id_rep" value={this.state.id_rep} onChange={this.getSelectedRepId}>
                                                            <option value={0}>Выберите лексему</option>
                                                            {this.state.replicas.map((obj, i) =>
                                                                <option value={obj.id_rep}>{obj.lexeme.mean_lex + obj.symbol}</option>
                                                            )}
                                                        </select>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                    <Label sm={3}>Варианты:</Label>
                                                    <Col sm={9}>
                                                        <Select
                                                            options={this.state.options}
                                                            isMulti
                                                            value={this.state.vl_var}
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={this.handleChangeMultiple}
                                                            placeholder="Выберите лексемы"
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