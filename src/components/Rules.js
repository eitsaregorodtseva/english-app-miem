import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import '../style.css';

export default class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rule: this.props.rule,
            current_rule: { ruleId: null, ruleType: '0' },
        }
        this.addNewRule = this.addNewRule.bind(this);
        this.showCurrentRule = this.showCurrentRule.bind(this);
        this.getSelectedTypeRule = this.getSelectedTypeRule.bind(this);
    }

    addNewRule() {
        this.setState({
            rule: [...this.state.rule, {
                id: this.state.rule.length + 1,
                ruleType: '0',
            }],
        })
        this.passPropsToParent();
    }

    showCurrentRule(ruleId) {
        this.setState({
            current_rule: { ruleId: ruleId, ruleType: this.state.rule[ruleId].ruleType },
        });
    }

    getSelectedTypeRule(event) {
        let newRule = { ...this.state.current_rule, ruleType: event.target.value };
        let rule = this.state.rule;
        rule[newRule.ruleId].ruleType = newRule.ruleType;
        this.setState({
            current_rule: newRule,
            rule: rule
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.rule);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "850px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewRule()}>Добавить</Button>
                        {this.state.rule.map((obj, i) =>
                            <Button style={{ width: "190px" }} onClick={() => this.showCurrentRule(i)}>Правило {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.rule.length === 0 ? <div></div> :
                    <div class="col" style={{ marginTop: "1%" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_rule.ruleType} onChange={this.getSelectedTypeRule}>
                                <option value={0}>Выберите тип</option>
                                <option value={7}>Правило 1</option>
                                <option value={8}>Правило 2</option>
                                <option value={9}>Задание на правило</option>
                            </select>
                            {this.state.current_rule.ruleType === '0' ? <div></div> :
                                this.state.current_rule.ruleType === '7' ?
                                    <div>
                                        <Label>Ссылка на изображение 1:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Ссылка на звук 1:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Буква 1:</Label>
                                        <Input type="text"></Input>
                                        <Label>Ссылка на звук 2:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Буква 2:</Label>
                                        <Input type="text"></Input>
                                        <Label>Ссылка на звук 3:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Слово 1:</Label>
                                        <Input type="text"></Input>
                                        <Label>Ссылка на звук 4:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Слово 2:</Label>
                                        <Input type="text"></Input>
                                        <Label>Ссылка на изображение 2:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Ссылка на изображение 3:</Label>
                                        <Input type="text" rows="1"></Input>
                                    </div> :
                                    this.state.current_rule.ruleType === '8' ?
                                        <div>
                                            <Label>Ссылка на изображение 1:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Ссылка на звук 1:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Буква 1:</Label>
                                            <Input type="text"></Input>
                                            <Label>Ссылка на звук 2:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Буква 2:</Label>
                                            <Input type="text"></Input>
                                            <Label>Ссылка на звук 3:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Слово 1:</Label>
                                            <Input type="text"></Input>
                                            <Label>Ссылка на звук 4:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Слово 2:</Label>
                                            <Input type="text"></Input>
                                        </div> :
                                        this.state.current_rule.ruleType === '9' ?
                                            <div>
                                                <Label>Ссылка на звук 1:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Буква:</Label>
                                                <Input type="text"></Input>
                                                <Label>Ссылка на звук 2:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово 1:</Label>
                                                <Input type="text"></Input>
                                                <Label>Ссылка на звук 3:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово 2:</Label>
                                                <Input type="text"></Input>
                                                <Label>Ссылка на звук 4:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово 3:</Label>
                                                <Input type="text"></Input>
                                                <Label>Номер правильного варианта ответа:</Label>
                                                <Input type="text"></Input>
                                            </div> :
                                            <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}