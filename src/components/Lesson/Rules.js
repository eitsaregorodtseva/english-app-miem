import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Modal from '../Modal';
import Select from 'react-select';
import '../../style.css';
import model_rule from "../../static/tips/model_rule.jpg";
import model_rule_2 from "../../static/tips/model_rule_2.jpg";
import task_rule from "../../static/tips/task_rule.jpg";
import task_rule_2 from "../../static/tips/task_rule_2.jpg";

export default class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rule: [],
            lexemes: [],
            current_rule: { id_fr: null, id: 0, type_ex: 0, num_ex: 0 },
            id_lex: null,
            id_var: "",
            side: "",
            picture: "",
            sound_rule: "",
            options: [],
            options_words: [],
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewRule = this.addNewRule.bind(this);
        this.showCurrentRule = this.showCurrentRule.bind(this);
        this.getSelectedTypeRule = this.getSelectedTypeRule.bind(this);
    }

    componentDidMount() {
        /*let options = [];
        let options_words = [];
        for (var i = 0; i < this.props.lexemes.length; i++) {
            options.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex });
            if (this.props.lexemes[i].type === "слово") {
                options_words.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
        }*/
        this.setState({
            rule: this.props.rule,
            lexemes: this.props.lexemes,
            options: this.props.options,
            options_words: this.props.options_words
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.rule !== this.state.rule) {
            this.setState({
                rule: this.props.rule,
                current_rule: { id_fr: null, id: 0, type_ex: 0, num_ex: 0 }
            })
        }
        if (this.props.lexemes !== this.state.lexemes) {
            this.setState({
                lexemes: this.props.lexemes,
                options: this.props.options,
                options_words: this.props.options_words
            })
        }
    }

    handleChange(event) {
        //console.log(event.target.files[0]);
        /*let newRule = { ...this.state.current_rule, [event.target.name]: event.target.value };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            [event.target.name]: event.target.value
        });*/
        /*let form_data = new FormData();
        let data = {image_url: event.target.files[0], name: event.target.files[0].name};
        console.log(data);
        if (data.image_url)
            form_data.append("image_url", data.image_url, data.image_url.name);
        form_data.append("is_active", true);
        console.log(form_data)*/
        /*let form_data = new FormData();
        let data = event.target.files[0];
        form_data.append("media", data);

        console.log(Object.fromEntries(form_data).media.name);
        console.log(typeof(Object.fromEntries(form_data)));*/
        let newRule = { ...this.state.current_rule, [event.target.name]: event.target.value };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    handleChangeOrder = (event) => {
        let num_ex = parseInt(event.target.value);
        let newRule = { ...this.state.current_rule, num_ex: num_ex };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
        });
        this.passPropsToParent();
    }

    handleChangeSingle = (event) => {
        let id_lex = [];
        if (typeof (event.value) === "number") {
            id_lex.push(event.value)
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_lex.push(event[i].value)
            }
        }
        let newRule = { ...this.state.current_rule, id_lex: id_lex };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            id_lex: id_lex
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_var = [];
        for (var i = 0; i < event.length; i++) {
            id_var.push(event[i].value)
        }
        console.log(id_var);
        let newRule = { ...this.state.current_rule, id_var: id_var };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            id_var: id_var
        });
        this.passPropsToParent();
    }

    addNewRule() {
        let newRule = { id_fr: this.state.rule.length, id: 0, type_ex: 0, num_ex: 0 };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
        this.setState({
            rule: rule,
        });
        this.passPropsToParent();
    }

    showCurrentRule(id_fr) {
        switch (this.state.rule[id_fr].type_ex) {
            case 0:
                this.setState({
                    current_rule: this.state.rule[id_fr],
                });
                break;
            case 23:
                this.setState({
                    current_rule: this.state.rule[id_fr],
                    id_var: this.state.rule[id_fr].id_var ? this.state.rule[id_fr].id_var : "",
                    side: this.state.rule[id_fr].side ? this.state.rule[id_fr].side : "",
                    picture: this.state.rule[id_fr].picture ? this.state.rule[id_fr].picture : "",
                    sound_rule: this.state.rule[id_fr].sound_rule ? this.state.rule[id_fr].sound_rule : "",
                });
                break;
            case 17:
                this.setState({
                    current_rule: this.state.rule[id_fr],
                    id_lex: this.state.rule[id_fr].id_lex ? this.state.rule[id_fr].id_lex : "",
                    id_var: this.state.rule[id_fr].id_var ? this.state.rule[id_fr].id_var : "",
                    picture: this.state.rule[id_fr].picture ? this.state.rule[id_fr].picture : "",
                    sound_rule: this.state.rule[id_fr].sound_rule ? this.state.rule[id_fr].sound_rule : "",
                });
                break;
        }
        this.passPropsToParent();
    }

    getSelectedTypeRule(event) {
        let type_ex = parseInt(event.target.value);
        let newRule = { id_fr: this.state.current_rule.id_fr, id: 0, type_ex: type_ex, num_ex: 0 };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            id_lex: "",
            id_var: "",
            side: "",
            picture: "",
            sound_rule: ""
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        let id_lex = [];
        id_lex.push(parseInt(event.target.value));
        let newRule = { ...this.state.current_rule, [event.target.name]: id_lex };
        let rule = this.state.rule;
        rule[newRule.id_fr] = newRule;
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
        rule[newRule.id_fr] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            side: event.target.value
        });
        this.passPropsToParent();
    }

    deleteElement = (id_fr) => {
        let rule = this.state.rule;
        rule.splice(id_fr, 1);
        for (var i = 0; i < rule.length; i++) {
            rule[i].id_fr = i;
        }
        let newRule = { id_fr: null, id: 0, type_ex: 0, num_ex: 0 };
        this.setState({
            rule: rule,
            current_rule: newRule,
        });
        this.passPropsToParent();
    }

    filterOptions(vl) {
        return this.includes(vl.value)
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    passPropsToParent() {
        this.props.parentCallback(this.state.rule);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflow: "auto", minHeight: "5px", height: "530px", width: "210px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "180px" }} onClick={() => this.addNewRule()}>Добавить</Button>
                        {this.state.rule.map((obj, i) =>
                            <Button style={{ width: "180px" }} key={obj.id_fr} color={this.state.current_rule.id_fr === i ? "primary" : "secondary"} onClick={() => this.showCurrentRule(i)}>Правило {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.rule.length === 0 || this.state.current_rule.id_fr === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "100px", height: "530px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_rule.type_ex} onChange={this.getSelectedTypeRule}>
                                <option value={0}>Выберите тип</option>
                                <option value={23}>Правило</option>
                                <option value={17}>Задание на правило</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_rule.id_fr)}>Удалить</Button>
                            {this.state.current_rule.type_ex === 0 ? <div></div> :
                                this.state.current_rule.type_ex === 23 ?
                                    <div>
                                        <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
                                            <Button id="Popover14" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover14" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_rule} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <div className="row StructureFields" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                            <Label sm={3}>Лексемы:</Label>
                                            <Col sm={8}>
                                                <Select
                                                    options={this.state.options}
                                                    isMulti
                                                    value={this.state.options.filter(this.filterOptions, this.state.id_var)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={this.handleChangeMultiple}
                                                    placeholder="Выберите лексемы"
                                                />
                                            </Col>
                                        </div>
                                        <div className="row StructureFields" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                            <Label sm={3}>Сторона экрана:</Label>
                                            <Col sm={7}>
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
                                                <Input type="text" rows="2" name="sound_rule" value={this.state.sound_rule} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={3}>Изображение:</Label>
                                            <Col sm={9}>
                                                <Input type="text" rows="2" name="picture" value={this.state.picture} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_rule.type_ex === 17 ?
                                        <div>
                                            <div style={{ marginTop: "10px", marginBottom: "10px", paddingBottom: "10px" }}>
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
                                                    <Input type="number" name="num_ex" value={this.state.current_rule.num_ex} onChange={this.handleChangeOrder}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Ответ:</Label>
                                                <Col sm={9}>
                                                    <Select
                                                        options={this.state.options_words}
                                                        value={this.state.options_words.filter(this.filterOptions, this.state.id_lex)}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeSingle}
                                                        placeholder="Выберите слово"
                                                    />
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                                <Label sm={3}>Варианты:</Label>
                                                <Col sm={8}>
                                                    <Select
                                                        options={this.state.options_words}
                                                        isMulti
                                                        value={this.state.options_words.filter(this.filterOptions, this.state.id_var)}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeMultiple}
                                                        placeholder="Выберите слова"
                                                    />
                                                </Col>
                                            </div>
                                            <div class="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Звук:</Label>
                                                <Col sm={9}>
                                                    <Input type="text" rows="2" name="sound_rule" value={this.state.sound_rule} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={3}>Изображение:</Label>
                                                <Col sm={9}>
                                                    <Input type="text" rows="2" name="picture" value={this.state.picture} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                        </div> :
                                        <div></div>}
                        </Form>
                        <Button onClick={this.showModal} style={{marginTop: "10px"}}>Добавить файлы</Button>
                        <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
                    </div>}
            </div>)
    }
}