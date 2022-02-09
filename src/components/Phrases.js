import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import '../style.css';

export default class Phrases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phr: this.props.phr,
            current_phr: { phrId: null, phrType: '0' },
        }
        this.addNewPhr = this.addNewPhr.bind(this);
        this.showCurrentPhr = this.showCurrentPhr.bind(this);
        this.getSelectedTypePhr = this.getSelectedTypePhr.bind(this);
    }

    addNewPhr() {
        this.setState({
            phr: [...this.state.phr, {
                id: this.state.phr.length + 1,
                phrType: '0',
            }],
        })
        this.passPropsToParent();
    }

    showCurrentPhr(phrId) {
        this.setState({
            current_phr: { phrId: phrId, phrType: this.state.phr[phrId].phrType },
        });
    }

    getSelectedTypePhr(event) {
        let newPhr = { ...this.state.current_phr, phrType: event.target.value };
        let phr = this.state.phr;
        phr[newPhr.phrId].phrType = newPhr.phrType;
        this.setState({
            current_phr: newPhr,
            phr: phr
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.phr);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "850px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewPhr()}>Добавить</Button>
                        {this.state.phr.map((obj, i) =>
                            <Button style={{ width: "190px" }} onClick={() => this.showCurrentPhr(i)}>Фраза {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.phr.length === 0 ? <div></div> :
                    <div class="col" style={{ marginTop: "1%" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_phr.phrType} onChange={this.getSelectedTypePhr}>
                                <option value={0}>Выберите тип</option>
                                <option value={10}>Моделирование фразы</option>
                                <option value={11}>Собрать часть фразы</option>
                                <option value={12}>Собрать фразу из слов</option>
                            </select>
                            {this.state.current_phr.phrType === '0' ? <div></div> :
                                this.state.current_phr.phrType === '10' ?
                                    <div>
                                        <Label>Ссылка на изображение:</Label>
                                        <Input type="text" rows="1"></Input>
                                        <Label>Ссылка на схему:</Label>
                                        <Input type="text"></Input>
                                        <Label>Ссылка на звук:</Label>
                                        <Input type="text" rows="1"></Input>
                                    </div> :
                                    this.state.current_phr.phrType === '11' ?
                                        <div>
                                            <Label>Ссылка на изображение:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Ссылка на звук:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Слово:</Label>
                                            <Input type="text"></Input>
                                            <Label>Набор букв:</Label>
                                            <Input type="text" rows="1"></Input>
                                            <Label>Часть фразы:</Label>
                                            <Input type="text" rows="1"></Input>
                                        </div> :
                                        this.state.current_phr.phrType === '12' ?
                                            <div>
                                                <Label>Ссылка на изображение:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Ссылка на звук:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Фраза</Label>
                                                <Input type="text"></Input>
                                                <Label>Слово 1:</Label>
                                                <Input type="text" rows="1"></Input>
                                                <Label>Слово 2:</Label>
                                                <Input type="text" rows="1"></Input>
                                            </div> :
                                            <div></div>}
                        </Form>


                    </div>}
            </div>)
    }
}