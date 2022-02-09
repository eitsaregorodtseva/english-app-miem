import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import '../style.css';

export default class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leks: this.props.leks,
            current_leks: { leksId: null, leksType: '0' },
        }
        this.addNewLeks = this.addNewLeks.bind(this);
        this.showCurrentLeks = this.showCurrentLeks.bind(this);
        this.getSelectedTypeLeks = this.getSelectedTypeLeks.bind(this);
    }

    addNewLeks() {
        this.setState({
            leks: [...this.state.leks, {
                id: this.state.leks.length + 1,
                leksType: '0',
            }],
        })
        this.passPropsToParent();
    }

    showCurrentLeks(leksId) {
        this.setState({
            current_leks: { leksId: leksId, leksType: this.state.leks[leksId].leksType },
        });
    }

    getSelectedTypeLeks(event) {
        let newLeks = { ...this.state.current_leks, leksType: event.target.value };
        let leks = this.state.leks;
        leks[newLeks.leksId].leksType = newLeks.leksType;
        this.setState({
            current_leks: newLeks,
            leks: leks
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.leks);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "850px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewLeks()}>Добавить</Button>
                        {this.state.leks.map((obj, i) =>
                            <Button style={{ width: "190px" }} onClick={() => this.showCurrentLeks(i)}>Буквы-слова {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.leks.length === 0 ? <div></div> :
                    <div class="col" style={{ marginTop: "1%" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_leks.leksType} onChange={this.getSelectedTypeLeks}>
                                <option value={0}>Выберите тип</option>
                                <option value={1}>Моделирование 1</option>
                                <option value={2}>Моделирование 2</option>
                                <option value={3}>Задание на слоги</option>
                                <option value={4}>Задание на выбор буквы</option>
                                <option value={5}>Задание на выбор букв</option>
                                <option value={6}>Задание на составление слова</option>
                            </select>
                            {this.state.current_leks.leksType === '0' ? <div></div> :
                                this.state.current_leks.leksType === '1' ?
                                    <div>
                                        <Label>Ссылка на изображение:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Ссылка на звук:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Слово или буква:</Label>
                                        <Input type="text"></Input>
                                    </div> :
                                    this.state.current_leks.leksType === '2' ?
                                        <div>
                                            <Label>Ссылка на изображение:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Ссылка на звук 1:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Слово или буква 1 :</Label>
                                            <Input type="text"></Input>
                                            <Label>Ссылка на звук 2:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Слово или буква 2:</Label>
                                            <Input type="text"></Input>
                                        </div> :
                                        this.state.current_leks.leksType === '3' ?
                                            <div>
                                                <Label>Ссылка на звук 1:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово или буква 1 :</Label>
                                                <Input type="text"></Input>
                                                <Label>Ссылка на звук 2:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово или буква 2:</Label>
                                                <Input type="text"></Input>
                                                <Label>Ссылка на звук 3:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово или буква 3:</Label>
                                                <Input type="text"></Input>
                                                <Label>Ссылка на звук 4:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово или буква 4:</Label>
                                                <Input type="text"></Input>
                                            </div> :
                                            this.state.current_leks.leksType === '4' ?
                                                <div>
                                                    <Label>Ссылка на изображение:</Label>
                                                    <Input type="text" rows="1"></Input>
                                                    <Label>Ссылка на звук:</Label>
                                                    <Input type="text" rows="1"></Input>
                                                    <Label>Слово:</Label>
                                                    <Input type="text"></Input>
                                                    <Label>Вариант ответа 1:</Label>
                                                    <Input type="text" rows="1"></Input>
                                                    <Label>Вариант ответа 2:</Label>
                                                    <Input type="text" rows="1"></Input>
                                                    <Label>Вариант ответа 3:</Label>
                                                    <Input type="text" rows="1"></Input>
                                                    <Label>Номер пропущенной буквы:</Label>
                                                    <Input type="text" rows="1"></Input>
                                                </div> :
                                                this.state.current_leks.leksType === '5' ?
                                                    <div>
                                                        <Label>Ссылка на изображение:</Label>
                                                        <Input type="text" rows="1"></Input>
                                                        <Label>Ссылка на звук:</Label>
                                                        <Input type="text" rows="1"></Input>
                                                        <Label>Слово:</Label>
                                                        <Input type="text"></Input>
                                                        <Label>Номера пропущенных букв:</Label>
                                                        <Input type="text" rows="1"></Input>
                                                        <Label>Набор букв:</Label>
                                                        <Input type="text" rows="1"></Input>
                                                    </div> :
                                                    this.state.current_leks.leksType === '6' ?
                                                        <div>
                                                            <Label>Ссылка на изображение:</Label>
                                                            <Input type="text" rows="1"></Input>
                                                            <Label>Ссылка на звук:</Label>
                                                            <Input type="text" rows="1"></Input>
                                                            <Label>Слово:</Label>
                                                            <Input type="text"></Input>
                                                            <Label>Набор букв:</Label>
                                                            <Input type="text" rows="1"></Input>
                                                        </div> :
                                                        <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}