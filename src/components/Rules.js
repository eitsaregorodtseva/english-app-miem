import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Select from 'react-select';
import '../style.css';
import model_rule from "../static/tips/model_rule.jpg";
import model_rule_2 from "../static/tips/model_rule_2.jpg";
import task_rule from "../static/tips/task_rule.jpg";
import task_rule_2 from "../static/tips/task_rule_2.jpg";

export default class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rule: [],
            lexemes: [],
            current_rule: { id: null, type_ex: 0, id_ex: 0 },
            id_lex: null,
            id_var: "",
            vl_var: "",
            side: "",
            picture: "",
            sound_rule: "",
            options: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewRule = this.addNewRule.bind(this);
        this.showCurrentRule = this.showCurrentRule.bind(this);
        this.getSelectedTypeRule = this.getSelectedTypeRule.bind(this);
    }

    componentDidMount() {
        let options = [];
        for (var i = 0; i < this.props.lexemes.length; i++) {
            options.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
        }
        this.setState({
            rule: this.props.rule,
            lexemes: this.props.lexemes,
            options: options
        });
    }

    handleChange(event) {
        let newRule = { ...this.state.current_rule, [event.target.name]: event.target.value };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    handleChangeOrder = (event) => {
        let newRule = { ...this.state.current_rule, id_ex: event.target.value };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_var = [];
        for (var i = 0; i < event.length; i++) {
            id_var.push(event[i].value)
        }
        console.log(id_var);
        let newRule = { ...this.state.current_rule, id_var: id_var, vl_var: event };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            id_var: id_var,
            vl_var: event
        });
        this.passPropsToParent();
    }

    addNewRule() {
        let newRule = { id: this.state.rule.length, type_ex: 0, id_ex: 0 };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            rule: rule,
        });
        this.passPropsToParent();
    }

    showCurrentRule(id) {
        switch (this.state.rule[id].type_ex) {
            case 0:
                this.setState({
                    current_rule: this.state.rule[id],
                });
                break;
            case 23:
                this.setState({
                    current_rule: this.state.rule[id],
                    id_var: this.state.rule[id].id_var ? this.state.rule[id].id_var : "",
                    vl_var: this.state.rule[id].vl_var ? this.state.rule[id].vl_var : "",
                    side: this.state.rule[id].side ? this.state.rule[id].side : "",
                    picture: this.state.rule[id].picture ? this.state.rule[id].picture : "",
                    sound_rule: this.state.rule[id].sound_rule ? this.state.rule[id].sound_rule : "",
                });
                break;
            case 17:
                this.setState({
                    current_rule: this.state.rule[id],
                    id_lex: this.state.rule[id].id_lex ? this.state.rule[id].id_lex : "",
                    id_var: this.state.rule[id].id_var ? this.state.rule[id].id_var : "",
                    vl_var: this.state.rule[id].vl_var ? this.state.rule[id].vl_var : "",
                    picture: this.state.rule[id].picture ? this.state.rule[id].picture : "",
                    sound_rule: this.state.rule[id].sound_rule ? this.state.rule[id].sound_rule : "",
                });
                break;
        }
        this.passPropsToParent();
    }

    getSelectedTypeRule(event) {
        let type_ex = parseInt(event.target.value);
        let newRule = { id: this.state.current_rule.id, type_ex: type_ex, id_ex: 0 };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            id_lex: "",
            id_var: "",
            vl_var: "",
            side: "",
            picture: "",
            sound_rule: "",
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        let id_lex = parseInt(event.target.value);
        let newRule = { ...this.state.current_rule, [event.target.name]: id_lex };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            [event.target.name]: id_lex
        });
        this.passPropsToParent();
    }

    getSelectedSide = (event) => {
        let newRule = { ...this.state.current_rule, side: event.target.value };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            side: event.target.value
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let rule = this.state.rule;
        rule.splice(id, 1);
        for (var i = 0; i < rule.length; i++) {
            rule[i].id = i;
        }
        let newRule = { id: null, type_ex: 0, id_ex: 0 };
        this.setState({
            rule: rule,
            current_rule: newRule,
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.rule);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "530px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewRule()}>Добавить</Button>
                        {this.state.rule.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_rule.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentRule(i)}>Правило {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.rule.length === 0 || this.state.current_rule.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_rule.type_ex} onChange={this.getSelectedTypeRule}>
                                <option value={0}>Выберите тип</option>
                                <option value={23}>Правило</option>
                                <option value={17}>Задание на правило</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_rule.id)}>Удалить</Button>
                            {this.state.current_rule.type_ex === 0 ? <div></div> :
                                this.state.current_rule.type_ex === 23 ?
                                    <div>
                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                            <Button id="Popover14" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover14" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_rule} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        {/*<div className="row StructureFields" style={{ marginBottom: "20px" }}>
                                            <Label sm={3}>Номер в уроке:</Label>
                                            <Col sm={2}>
                                                <Input type="number" name="id_ex" value={this.state.current_rule.id_ex} onChange={this.handleChangeOrder}></Input>
                                            </Col>
                                        </div>*/}
                                        <div className="row StructureFields" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                            <Label sm={3}>Лексемы:</Label>
                                            <Col sm={8}>
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
                                        <div className="row StructureFields" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                            <Label sm={3}>Сторона экрана:</Label>
                                            <Col sm={5}>
                                                <select className="form-select" name="side" value={this.state.side} onChange={this.getSelectedSide}>
                                                    <option value="">Выберите сторону экрана</option>
                                                    <option value="право">право</option>
                                                    <option value="лево ">лево</option>
                                                </select>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={3}>Звук:</Label>
                                            <Col sm={9}>
                                                <Input type="textarea" rows="2" name="sound_rule" value={this.state.sound_rule} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={3}>Изображение:</Label>
                                            <Col sm={9}>
                                                <Input type="textarea" rows="2" name="picture" value={this.state.picture} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_rule.type_ex === 17 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover16" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover16" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={task_rule} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={3}>Номер в уроке:</Label>
                                                <Col sm={2}>
                                                    <Input type="number" name="id_ex" value={this.state.current_rule.id_ex} onChange={this.handleChangeOrder}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px"}}>
                                                <Label sm={3}>Ответ:</Label>
                                                <Col sm={8}>
                                                    <select className="form-select" data-mdb-clear-button="true"  name="id_lex" value={this.state.id_lex} onChange={this.getSelectedLexemeId}>
                                                        <option value={0}>Выберите лексему</option>
                                                        {this.state.lexemes.map((obj, i) =>
                                                            <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                        )}
                                                    </select>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                <Label sm={3}>Варианты:</Label>
                                                <Col sm={8}>
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
                                            <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Звук:</Label>
                                                <Col sm={9}>
                                                    <Input type="textarea" rows="2" name="sound_rule" value={this.state.sound_rule} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={3}>Изображение:</Label>
                                                <Col sm={9}>
                                                    <Input type="textarea" rows="2" name="picture" value={this.state.picture} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                        </div> :
                                        <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}