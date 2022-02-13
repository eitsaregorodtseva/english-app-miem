import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label } from "reactstrap";
import '../style.css';

export default class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leks: this.props.leks,
            current_leks: { id: null, leksType: '0' },
            word: "",
            stress: "",
            image1: "",
            sound1: "",
            sound2: "",
            sound3: "",
            sound4: "",
            letter1: "",
            letter2: "",
            letter3: "",
            letter4: "",
            var1: "",
            var2: "",
            var3: "",
            number: "",
            numbers: "",
            letters: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewLeks = this.addNewLeks.bind(this);
        this.showCurrentLeks = this.showCurrentLeks.bind(this);
        this.getSelectedTypeLeks = this.getSelectedTypeLeks.bind(this);
    }

    handleChange(event) {
        let newLeks = { ...this.state.current_leks, [event.target.name]: event.target.value };
        let leks = this.state.leks;
        leks[newLeks.id] = newLeks;
        this.setState({
            current_leks: newLeks,
            leks: leks,
            [event.target.name]: event.target.value
        });
    }

    addNewLeks() {
        this.setState({
            leks: [...this.state.leks, {
                id: this.state.leks.length,
                leksType: '0',
            }],
        });
        this.passPropsToParent();
    }

    showCurrentLeks(id) {
        switch (this.state.leks[id].leksType) {
            case "0":
                this.setState({
                    current_leks: this.state.leks[id],
                });
                break;
            case "1":
                this.setState({
                    current_leks: this.state.leks[id],
                    word: this.state.leks[id].word ? this.state.leks[id].word : "",
                    stress: this.state.leks[id].stress ? this.state.leks[id].stress : "",
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                });
                break;
            case "2":
                this.setState({
                    current_leks: this.state.leks[id],
                    word: this.state.leks[id].word ? this.state.leks[id].word : "",
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                });
                break;
            case "3":
                this.setState({
                    current_leks: this.state.leks[id],
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                    sound2: this.state.leks[id].sound2 ? this.state.leks[id].sound2 : "",
                    letter1: this.state.leks[id].letter1 ? this.state.leks[id].letter1 : "",
                    letter2: this.state.leks[id].letter2 ? this.state.leks[id].letter2 : "",
                });
                break;
            case "4":
                this.setState({
                    current_leks: this.state.leks[id],
                    word: this.state.leks[id].word ? this.state.leks[id].word : "",
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                });
                break;
            case "5":
                this.setState({
                    current_leks: this.state.leks[id],
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                    sound2: this.state.leks[id].sound2 ? this.state.leks[id].sound2 : "",
                    letter1: this.state.leks[id].letter1 ? this.state.leks[id].letter1 : "",
                    letter2: this.state.leks[id].letter2 ? this.state.leks[id].letter2 : "",
                });
                break;
            case "6":
                this.setState({
                    current_leks: this.state.leks[id],
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                    sound2: this.state.leks[id].sound2 ? this.state.leks[id].sound2 : "",
                    sound3: this.state.leks[id].sound3 ? this.state.leks[id].sound3 : "",
                    sound4: this.state.leks[id].sound4 ? this.state.leks[id].sound4 : "",
                    letter1: this.state.leks[id].letter1 ? this.state.leks[id].letter1 : "",
                    letter2: this.state.leks[id].letter2 ? this.state.leks[id].letter2 : "",
                    letter3: this.state.leks[id].letter3 ? this.state.leks[id].letter3 : "",
                    letter4: this.state.leks[id].letter4 ? this.state.leks[id].letter4 : "",
                });
                break;
            case "7":
                this.setState({
                    current_leks: this.state.leks[id],
                    word: this.state.leks[id].word ? this.state.leks[id].word : "",
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                    var1: this.state.leks[id].var1 ? this.state.leks[id].var1 : "",
                    var2: this.state.leks[id].var2 ? this.state.leks[id].var2 : "",
                    var3: this.state.leks[id].var3 ? this.state.leks[id].var3 : "",
                    number: this.state.leks[id].number ? this.state.leks[id].number : "",
                });
                break;
            case "8":
                this.setState({
                    current_leks: this.state.leks[id],
                    word: this.state.leks[id].word ? this.state.leks[id].word : "",
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                    numbers: this.state.leks[id].numbers ? this.state.leks[id].numbers : "",
                    letters: this.state.leks[id].letters ? this.state.leks[id].letters : "",
                });
                break;
            case "9":
                this.setState({
                    current_leks: this.state.leks[id],
                    word: this.state.leks[id].word ? this.state.leks[id].word : "",
                    image1: this.state.leks[id].image1 ? this.state.leks[id].image1 : "",
                    sound1: this.state.leks[id].sound1 ? this.state.leks[id].sound1 : "",
                    letters: this.state.leks[id].letters ? this.state.leks[id].letters : "",
                });
                break;
        }
    }

    getSelectedTypeLeks(event) {
        let newLeks = { id: this.state.current_leks.id, leksType: event.target.value };
        let leks = this.state.leks;
        leks[newLeks.id] = newLeks;
        this.setState({
            current_leks: newLeks,
            leks: leks,
            word: "",
            stress: "",
            image1: "",
            sound1: "",
            sound2: "",
            sound3: "",
            sound4: "",
            letter1: "",
            letter2: "",
            letter3: "",
            letter4: "",
            var1: "",
            var2: "",
            var3: "",
            number: "",
            numbers: "",
            letters: "",
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.leks);
    }

    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "450px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewLeks()}>Добавить</Button>
                        {this.state.leks.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_leks.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentLeks(i)}>Буквы-слова {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.leks.length === 0 || this.state.current_leks.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_leks.leksType} onChange={this.getSelectedTypeLeks}>
                                <option value={0}>Выберите тип</option>
                                <option value={1}>Моделирование слова</option>
                                <option value={2}>Моделирование согласной 1</option>
                                <option value={3}>Моделирование согласной 2</option>
                                <option value={4}>Моделирование гласной 1</option>
                                <option value={5}>Моделирование гласной 2</option>
                                <option value={6}>Задание на слоги</option>
                                <option value={7}>Вставить букву</option>
                                <option value={8}>Задание на выбор букв</option>
                                <option value={9}>Задание на составление слова</option>
                            </select>
                            {this.state.current_leks.leksType === '0' ? <div></div> :
                                this.state.current_leks.leksType === '1' ?
                                    <div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Слово:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="word" value={this.state.word} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Номер ударной гласной:</Label>
                                            <Col sm={8}>
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
                                            <Label sm={4}>Ссылка на звук:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_leks.leksType === '2' ?
                                        <div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Буква:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="word" value={this.state.word} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
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
                                        </div> :
                                        this.state.current_leks.leksType === '3' ?
                                            <div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на изображение:</Label>
                                                    <Col sm={8}>
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
                                                    <Label sm={4}>Слог 1 :</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 2:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div class="row StructureFields">
                                                    <Label sm={4}>Слог 2:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                            </div> :
                                            this.state.current_leks.leksType === '4' ?
                                                <div>
                                                    <div class="row StructureFields">
                                                        <Label sm={4}>Буква:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="word" value={this.state.word} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
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
                                                </div> :
                                                this.state.current_leks.leksType === '5' ?
                                                    <div>
                                                        <div class="row StructureFields">
                                                            <Label sm={4}>Ссылка на изображение:</Label>
                                                            <Col sm={8}>
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
                                                            <Label sm={4}>Звук 1 :</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                        <div class="row StructureFields">
                                                            <Label sm={4}>Ссылка на звук 2:</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                        <div class="row StructureFields">
                                                            <Label sm={4}>Звук 2:</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                    </div> :
                                                    this.state.current_leks.leksType === '6' ?
                                                        <div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 1:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Слог 1 :</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 2:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Слог 2:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 3:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound3" value={this.state.sound3} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Слог 3:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter3" value={this.state.letter3} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 4:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound4" value={this.state.sound4} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div class="row StructureFields">
                                                                <Label sm={4}>Слог 4:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter4" value={this.state.letter4} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                        </div> :
                                                        this.state.current_leks.leksType === '7' ?
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
                                                                        <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div class="row StructureFields">
                                                                    <Label sm={4}>Вариант ответа 1:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="var1" value={this.state.var1} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div class="row StructureFields">
                                                                    <Label sm={4}>Вариант ответа 2:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="var2" value={this.state.var2} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div class="row StructureFields">
                                                                    <Label sm={4}>Вариант ответа 3:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="var3" value={this.state.var3} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div class="row StructureFields">
                                                                    <Label sm={5}>Номер пропущенной буквы:</Label>
                                                                    <Col sm={7}>
                                                                        <Input type="text" name="number" value={this.state.number} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                            </div> :
                                                            this.state.current_leks.leksType === '8' ?
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
                                                                            <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div class="row StructureFields">
                                                                        <Label sm={5}>Номера пропущенных букв:</Label>
                                                                        <Col sm={7}>
                                                                            <Input type="text" name="numbers" value={this.state.numbers} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div class="row StructureFields">
                                                                        <Label sm={4}>Набор букв:</Label>
                                                                        <Col sm={8}>
                                                                            <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                </div> :
                                                                this.state.current_leks.leksType === '9' ?
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
                                                                                <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                            </Col>
                                                                        </div>
                                                                        <div class="row StructureFields">
                                                                            <Label sm={4}>Набор букв:</Label>
                                                                            <Col sm={8}>
                                                                                <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                                            </Col>
                                                                        </div>
                                                                    </div> :
                                                                    <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}