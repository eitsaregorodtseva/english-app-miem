import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label } from "reactstrap";
import '../style.css';

export default class Phrases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phr: this.props.phr,
            current_phr: { id: null, phrType: '0' },
            word1: "",
            word2: "",
            word3: "",
            word4: "",
            words: "",
            image1: "",
            image2: "",
            sound1: "",
            scheme1: "",
            scheme2: "",
            letters: "",
            phrase: "",
            stress: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewPhr = this.addNewPhr.bind(this);
        this.showCurrentPhr = this.showCurrentPhr.bind(this);
        this.getSelectedTypePhr = this.getSelectedTypePhr.bind(this);
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

    addNewPhr() {
        this.setState({
            phr: [...this.state.phr, {
                id: this.state.phr.length,
                phrType: '0',
            }],
        })
        this.passPropsToParent();
    }

    showCurrentPhr(id) {
        switch (this.state.phr[id].phrType) {
            case "0":
                this.setState({
                    current_phr: this.state.phr[id],
                });
                break;
            case "10":
                this.setState({
                    current_phr: this.state.phr[id],
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                    stress: this.state.phr[id].stress ? this.state.phr[id].stress : "",
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    scheme1: this.state.phr[id].scheme1 ? this.state.phr[id].scheme1 : "",
                });
                break;
            case "11":
                this.setState({
                    current_phr: this.state.phr[id],
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                    stress: this.state.phr[id].stress ? this.state.phr[id].stress : "",
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    image2: this.state.phr[id].image2 ? this.state.phr[id].image2 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    scheme1: this.state.phr[id].scheme1 ? this.state.phr[id].scheme1 : "",
                    scheme2: this.state.phr[id].scheme2 ? this.state.phr[id].scheme2 : "",
                });
                break;
            case "12":
                this.setState({
                    current_phr: this.state.phr[id],
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    word1: this.state.phr[id].word1 ? this.state.phr[id].word1 : "",
                    letters: this.state.phr[id].letters ? this.state.phr[id].letters : "",
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                });
                break;
            case "13":
                this.setState({
                    current_phr: this.state.phr[id],
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    words: this.state.phr[id].words ? this.state.phr[id].words : "",
                    word1: this.state.phr[id].word1 ? this.state.phr[id].word1 : "",
                    word2: this.state.phr[id].word2 ? this.state.phr[id].word2 : "",
                    word3: this.state.phr[id].word1 ? this.state.phr[id].word1 : "",
                    word4: this.state.phr[id].word2 ? this.state.phr[id].word2 : "",
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                });
                break;
        }
        this.passPropsToParent();
    }

    getSelectedTypePhr(event) {
        let newPhr = { id: this.state.current_phr.id, phrType: event.target.value };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr;
        this.setState({
            current_phr: newPhr,
            phr: phr,
            word1: "",
            word2: "",
            word3: "",
            word4: "",
            words: "",
            image1: "",
            image2: "",
            sound1: "",
            scheme1: "",
            scheme2: "",
            letters: "",
            phrase: "",
            stress: "",
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.phr);
    }

    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "450px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewPhr()}>Добавить</Button>
                        {this.state.phr.map((obj, i) =>
                            <Button style={{ width: "190px"}} color={this.state.current_phr.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentPhr(i)}>Фраза {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.phr.length === 0 || this.state.current_phr.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_phr.phrType} onChange={this.getSelectedTypePhr}>
                                <option value={0}>Выберите тип</option>
                                <option value={10}>Моделирование фразы 1</option>
                                <option value={11}>Моделирование фразы 2</option>
                                <option value={12}>Вставить буквы во фразу</option>
                                <option value={13}>Задание на выбор слов</option>
                            </select>
                            {this.state.current_phr.phrType === '0' ? <div></div> :
                                this.state.current_phr.phrType === '10' ?
                                    <div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Фраза</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={5}>Номера ударных гласных:</Label>
                                            <Col sm={7}>
                                                <Input type="text" name="stress" value={this.state.stress} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на изображение:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на схему:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="scheme1" value={this.state.scheme1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на звук:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_phr.phrType === '11' ?
                                        <div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Фраза</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={5}>Номера ударных гласных:</Label>
                                                <Col sm={7}>
                                                    <Input type="text" name="stress" value={this.state.stress} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={5}>Ссылка на изображение 1:</Label>
                                                <Col sm={7}>
                                                    <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на схему 1:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="scheme1" value={this.state.scheme1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={5}>Ссылка на изображение 2:</Label>
                                                <Col sm={7}>
                                                    <Input type="text" name="image2" value={this.state.image2} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на схему 2:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="scheme2" value={this.state.scheme2} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Ссылка на звук:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_phr.phrType === '12' ?
                                            <div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на изображение:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Слово:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="word1" value={this.state.word1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Фраза:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Набор букв:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                            </div> :
                                            this.state.current_phr.phrType === '13' ?
                                                <div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Ссылка на изображение:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Ссылка на звук:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Фраза</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Набор слов</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="words" value={this.state.words} onChange={this.handleChange}></Input>
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
                                                        <Label sm={4}>Слово 4:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="word4" value={this.state.word4} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                </div> :
                                                <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}