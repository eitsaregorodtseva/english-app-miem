import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import '../style.css';

export default class Phrases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phr: this.props.phr,
            current_phr: { id: null, phrType: '0' },
            word1: "",
            word2: "",
            image1: "",
            sound1: "",
            scheme1: "",
            letters: "",
            phrase: "",
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
            [event.target.name]: event.target.value }); 
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
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    scheme1: this.state.phr[id].scheme1 ? this.state.phr[id].scheme1 : "",
                });
                break;
            case "11":
                this.setState({
                    current_phr: this.state.phr[id],
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    word1: this.state.phr[id].word1 ? this.state.phr[id].word1 : "",
                    letters: this.state.phr[id].letters ? this.state.phr[id].letters : "",
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                });
                break;
            case "12":
                this.setState({
                    current_phr: this.state.phr[id],
                    image1: this.state.phr[id].image1 ? this.state.phr[id].image1 : "",
                    sound1: this.state.phr[id].sound1 ? this.state.phr[id].sound1 : "",
                    word1: this.state.phr[id].word1 ? this.state.phr[id].word1 : "",
                    word2: this.state.phr[id].word2 ? this.state.phr[id].word2 : "",
                    phrase: this.state.phr[id].phrase ? this.state.phr[id].phrase : "",
                });
                break;
        }
    }

    getSelectedTypePhr(event) {
        let newPhr = { id: this.state.current_phr.id, phrType: event.target.value };
        let phr = this.state.phr;
        phr[newPhr.id] = newPhr
        this.setState({
            current_phr: newPhr,
            phr: phr,
            word1: "",
            word2: "",
            image1: "",
            sound1: "",
            scheme1: "",
            letters: "",
            phrase: "",
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
                            <Button style={{ width: "190px" }} onClick={() => this.showCurrentPhr(i)}>Фраза {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.phr.length === 0 ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px"}}>
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
                                                <Label sm={4}>Набор букв:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Часть фразы:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
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
                                                    <Label sm={4}>Фраза</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="phrase" value={this.state.phrase} onChange={this.handleChange}></Input>
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
                                            </div> :
                                            <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}