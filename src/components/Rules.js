import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import '../style.css';
import model_rule from "../static/tips/model_rule.jpg";
import model_rule_2 from "../static/tips/model_rule_2.jpg";
import task_rule from "../static/tips/task_rule.jpg";
import task_rule_2 from "../static/tips/task_rule_2.jpg";

export default class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rule: this.props.rule,
            current_rule: { id: null, rule_type: '0' },
            image1: "",
            image2: "",
            image3: "",
            sound1: "",
            sound2: "",
            sound3: "",
            sound4: "",
            word1: "",
            word2: "",
            word3: "",
            answer: "",
            letter1: "",
            letter2: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewRule = this.addNewRule.bind(this);
        this.showCurrentRule = this.showCurrentRule.bind(this);
        this.getSelectedTypeRule = this.getSelectedTypeRule.bind(this);
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

    addNewRule() { 
        let newRule = { id: this.state.rule.length, rule_type: '0'};
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            rule: rule,
        });
        this.passPropsToParent();
    }

    showCurrentRule(id) {
        switch (this.state.rule[id].rule_type) {
            case "0":
                this.setState({
                    current_rule: this.state.rule[id],
                });
                break;
            case "14":
                this.setState({
                    current_rule: this.state.rule[id],
                    image1: this.state.rule[id].image1 ? this.state.rule[id].image1 : "",
                    image2: this.state.rule[id].image2 ? this.state.rule[id].image2 : "",
                    image3: this.state.rule[id].image3 ? this.state.rule[id].image3 : "",
                    sound1: this.state.rule[id].sound1 ? this.state.rule[id].sound1 : "",
                    sound2: this.state.rule[id].sound2 ? this.state.rule[id].sound2 : "",
                    sound3: this.state.rule[id].sound3 ? this.state.rule[id].sound3 : "",
                    sound4: this.state.rule[id].sound4 ? this.state.rule[id].sound4 : "",
                    letter1: this.state.rule[id].letter1 ? this.state.rule[id].letter1 : "",
                    letter2: this.state.rule[id].letter2 ? this.state.rule[id].letter2 : "",
                    word1: this.state.rule[id].word1 ? this.state.rule[id].word1 : "",
                    word2: this.state.rule[id].word2 ? this.state.rule[id].word2 : "",
                });
                break;
            case "15":
                this.setState({
                    current_rule: this.state.rule[id],
                    image1: this.state.rule[id].image1 ? this.state.rule[id].image1 : "",
                    sound1: this.state.rule[id].sound1 ? this.state.rule[id].sound1 : "",
                    sound2: this.state.rule[id].sound2 ? this.state.rule[id].sound2 : "",
                    sound3: this.state.rule[id].sound3 ? this.state.rule[id].sound3 : "",
                    sound4: this.state.rule[id].sound4 ? this.state.rule[id].sound4 : "",
                    letter1: this.state.rule[id].letter1 ? this.state.rule[id].letter1 : "",
                    letter2: this.state.rule[id].letter2 ? this.state.rule[id].letter2 : "",
                    word1: this.state.rule[id].word1 ? this.state.rule[id].word1 : "",
                    word2: this.state.rule[id].word2 ? this.state.rule[id].word2 : "",
                });
                break;
            case "16":
                this.setState({
                    current_rule: this.state.rule[id],
                    sound1: this.state.rule[id].sound1 ? this.state.rule[id].sound1 : "",
                    sound2: this.state.rule[id].sound2 ? this.state.rule[id].sound2 : "",
                    sound3: this.state.rule[id].sound3 ? this.state.rule[id].sound3 : "",
                    sound4: this.state.rule[id].sound4 ? this.state.rule[id].sound4 : "",
                    letter1: this.state.rule[id].letter1 ? this.state.rule[id].letter1 : "",
                    word1: this.state.rule[id].word1 ? this.state.rule[id].word1 : "",
                    word2: this.state.rule[id].word2 ? this.state.rule[id].word2 : "",
                    word3: this.state.rule[id].word3 ? this.state.rule[id].word3 : "",
                    answer: this.state.rule[id].answer ? this.state.rule[id].answer : "",
                });
                break;
            case "17":
                this.setState({
                    current_rule: this.state.rule[id],
                    sound1: this.state.rule[id].sound1 ? this.state.rule[id].sound1 : "",
                    sound2: this.state.rule[id].sound2 ? this.state.rule[id].sound2 : "",
                    sound3: this.state.rule[id].sound3 ? this.state.rule[id].sound3 : "",
                    sound4: this.state.rule[id].sound4 ? this.state.rule[id].sound4 : "",
                    letter1: this.state.rule[id].letter1 ? this.state.rule[id].letter1 : "",
                    word1: this.state.rule[id].word1 ? this.state.rule[id].word1 : "",
                    word2: this.state.rule[id].word2 ? this.state.rule[id].word2 : "",
                    word3: this.state.rule[id].word3 ? this.state.rule[id].word3 : "",
                    answer: this.state.rule[id].answer ? this.state.rule[id].answer : "",
                });
                break;
        }
        this.passPropsToParent();
    }

    getSelectedTypeRule(event) {
        let newRule = { id: this.state.current_rule.id, rule_type: event.target.value };
        let rule = this.state.rule;
        rule[newRule.id] = newRule;
        this.setState({
            current_rule: newRule,
            rule: rule,
            image1: "",
            image2: "",
            image3: "",
            sound1: "",
            sound2: "",
            sound3: "",
            sound4: "",
            word1: "",
            word2: "",
            word3: "",
            answer: "",
            letter1: "",
            letter2: "",
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let rule = this.state.rule;
        rule.splice(id, 1);
        for (var i = 0; i < rule.length; i++) {
            rule[i].id = i;
        }
        let newRule = { id: null, rule_type: '0' };
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
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "630px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewRule()}>Добавить</Button>
                        {this.state.rule.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_rule.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentRule(i)}>Правило {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.rule.length === 0 || this.state.current_rule.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_rule.rule_type} onChange={this.getSelectedTypeRule}>
                                <option value={0}>Выберите тип</option>
                                <option value={14}>Правило 1</option>
                                <option value={15}>Правило 2</option>
                                <option value={16}>Задание на правило 1</option>
                                <option value={17}>Задание на правило 2</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_rule.id)}>Удалить</Button>
                            {this.state.current_rule.rule_type === '0' ? <div></div> :
                                this.state.current_rule.rule_type === '14' ?
                                    <div>
                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                            <Button id="Popover14" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover14" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_rule} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Звук 1:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Звук 2:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Слово 1:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="word1" value={this.state.word1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Слово 2:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="word2" value={this.state.word2} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на звук 1:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на звук 2:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на звук 3:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound3" value={this.state.sound3} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на звук 4:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound4" value={this.state.sound4} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={5}>Ссылка на изображение 1:</Label>
                                            <Col sm={7}>
                                                <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={5}>Ссылка на изображение 2:</Label>
                                            <Col sm={7}>
                                                <Input type="text" name="image2" value={this.state.image2} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={5}>Ссылка на изображение 3:</Label>
                                            <Col sm={7}>
                                                <Input type="text" name="image3" value={this.state.image3} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_rule.rule_type === '15' ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover15" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover15" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={model_rule_2} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Звук 1:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Звук 2:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Слово 1:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="word1" value={this.state.word1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Слово 2:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="word2" value={this.state.word2} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={5}>Ссылка на изображение:</Label>
                                                <Col sm={7}>
                                                    <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на звук 1:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на звук 2:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на звук 3:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="sound3" value={this.state.sound3} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на звук 4:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="sound4" value={this.state.sound4} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_rule.rule_type === '16' ?
                                            <div>
                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                    <Button id="Popover16" type="button">Подсказка</Button>
                                                    <UncontrolledPopover placement="right" target="Popover16" trigger="focus">
                                                        <PopoverBody>
                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={task_rule} alt="" />
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Буква:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Слово 1:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="word1" value={this.state.word1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Слово 2:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="word2" value={this.state.word2} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Слово 3:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="word3" value={this.state.word3} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Номер правильного варианта ответа:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="answer" value={this.state.answer} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 1:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 2:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 3:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound3" value={this.state.sound3} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 4:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound4" value={this.state.sound4} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                            </div> :
                                            this.state.current_rule.rule_type === '17' ?
                                                <div>
                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                        <Button id="Popover17" type="button">Подсказка</Button>
                                                        <UncontrolledPopover placement="right" target="Popover17" trigger="focus">
                                                            <PopoverBody>
                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={task_rule_2} alt="" />
                                                            </PopoverBody>
                                                        </UncontrolledPopover>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Буква:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Слово 1:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="word1" value={this.state.word1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Слово 2:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="word2" value={this.state.word2} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Слово 3:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="word3" value={this.state.word3} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Номер правильного варианта ответа:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="answer" value={this.state.answer} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Ссылка на звук 1:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Ссылка на звук 2:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Ссылка на звук 3:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="sound3" value={this.state.sound3} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Ссылка на звук 4:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="sound4" value={this.state.sound4} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                </div> :
                                                <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}