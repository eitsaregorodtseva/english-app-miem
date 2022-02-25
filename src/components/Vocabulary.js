import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/popover.js';
import 'bootstrap/js/src/popover.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import '../style.css';
import model_word from "../static/tips/model_word.jpg";
import model_consonant from "../static/tips/model_consonant.jpg";
import model_consonant_2 from "../static/tips/model_consonant_2.jpg";
import model_vowel from "../static/tips/model_vowel.jpg";
import model_vowel_2 from "../static/tips/model_vowel_2.jpg";
import leks_syllables from "../static/tips/leks_syllables.jpg";
import leks_insert_letter from "../static/tips/leks_insert_letter.jpg";
import leks_insert_letters from "../static/tips/leks_insert_letters.jpg";
import leks_create_word from "../static/tips/leks_create_word.jpg";

export default class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leks: this.props.leks,
            current_leks: { id: null, leks_type: '0' },
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
        let newLeks = { id: this.state.leks.length, leks_type: '0'};
        let leks = this.state.leks;
        leks[newLeks.id] = newLeks;
        this.setState({
            leks: leks,
        });
        this.passPropsToParent();
    }

    showCurrentLeks(id) {
        switch (this.state.leks[id].leks_type) {
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
                    number: this.state.leks[id].number ? this.state.leks[id].number : "",
                    letters: this.state.leks[id].letters ? this.state.leks[id].letters : "",
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
        let newLeks = { id: this.state.current_leks.id, leks_type: event.target.value };
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
            <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "480px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewLeks()}>Добавить</Button>
                        {this.state.leks.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_leks.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentLeks(i)}>Буквы-слова {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.leks.length === 0 || this.state.current_leks.id === null ? <div></div> :
                    <div className="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select className="form-select" style={{ marginBottom: "20px" }} value={this.state.current_leks.leks_type} onChange={this.getSelectedTypeLeks}>
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
                            {this.state.current_leks.leks_type === '0' ? <div></div> :
                                this.state.current_leks.leks_type === '1' ?
                                    <div>
                                        <div style={{ paddingLeft: "83%", paddingBottom: "10px" }}>
                                            <Button id="Popover1" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover1" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_word} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={4}>Слово:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="word" value={this.state.word} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={4}>Номер ударной гласной:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="stress" value={this.state.stress} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={4}>Ссылка на изображение:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={4}>Ссылка на звук:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_leks.leks_type === '2' ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover2" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover2" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={model_consonant} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={4}>Буква:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="word" value={this.state.word} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={4}>Ссылка на изображение:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={4}>Ссылка на звук:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                        </div> :
                                        this.state.current_leks.leks_type === '3' ?
                                            <div>
                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                    <Button id="Popover3" type="button">Подсказка</Button>
                                                    <UncontrolledPopover placement="right" target="Popover3" trigger="focus">
                                                        <PopoverBody>
                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={model_consonant_2} alt="" />
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={4}>Слог 1 :</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={4}>Слог 2:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={4}>Ссылка на изображение:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 1:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                                <div className="row StructureFields">
                                                    <Label sm={4}>Ссылка на звук 2:</Label>
                                                    <Col sm={8}>
                                                        <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                    </Col>
                                                </div>
                                            </div> :
                                            this.state.current_leks.leks_type === '4' ?
                                                <div>
                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                        <Button id="Popover4" type="button">Подсказка</Button>
                                                        <UncontrolledPopover placement="right" target="Popover4" trigger="focus">
                                                            <PopoverBody>
                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={model_vowel} alt="" />
                                                            </PopoverBody>
                                                        </UncontrolledPopover>
                                                    </div>
                                                    <div className="row StructureFields">
                                                        <Label sm={4}>Буква:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="word" value={this.state.word} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div className="row StructureFields">
                                                        <Label sm={4}>Ссылка на изображение:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                    <div className="row StructureFields">
                                                        <Label sm={4}>Ссылка на звук:</Label>
                                                        <Col sm={8}>
                                                            <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                        </Col>
                                                    </div>
                                                </div> :
                                                this.state.current_leks.leks_type === '5' ?
                                                    <div>
                                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                            <Button id="Popover5" type="button">Подсказка</Button>
                                                            <UncontrolledPopover placement="right" target="Popover5" trigger="focus">
                                                                <PopoverBody>
                                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_vowel_2} alt="" />
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                        <div className="row StructureFields">
                                                            <Label sm={4}>Звук 1 :</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                        <div className="row StructureFields">
                                                            <Label sm={4}>Звук 2:</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                        <div className="row StructureFields">
                                                            <Label sm={4}>Ссылка на изображение:</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                        <div className="row StructureFields">
                                                            <Label sm={4}>Ссылка на звук 1:</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                        <div className="row StructureFields">
                                                            <Label sm={4}>Ссылка на звук 2:</Label>
                                                            <Col sm={8}>
                                                                <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                            </Col>
                                                        </div>
                                                    </div> :
                                                    this.state.current_leks.leks_type === '6' ?
                                                        <div>
                                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                <Button id="Popover6" type="button">Подсказка</Button>
                                                                <UncontrolledPopover placement="right" target="Popover6" trigger="focus">
                                                                    <PopoverBody>
                                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={leks_syllables} alt="" />
                                                                    </PopoverBody>
                                                                </UncontrolledPopover>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Слог 1 :</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Слог 2:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter2" value={this.state.letter2} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Слог 3:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter3" value={this.state.letter3} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Слог 4:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="letter4" value={this.state.letter4} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 1:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 2:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound2" value={this.state.sound2} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 3:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound3" value={this.state.sound3} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                            <div className="row StructureFields">
                                                                <Label sm={4}>Ссылка на звук 4:</Label>
                                                                <Col sm={8}>
                                                                    <Input type="text" name="sound4" value={this.state.sound4} onChange={this.handleChange}></Input>
                                                                </Col>
                                                            </div>
                                                        </div> :
                                                        this.state.current_leks.leks_type === '7' ?
                                                            <div>
                                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                    <Button id="Popover7" type="button">Подсказка</Button>
                                                                    <UncontrolledPopover placement="right" target="Popover7" trigger="focus">
                                                                        <PopoverBody>
                                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={leks_insert_letter} alt="" />
                                                                        </PopoverBody>
                                                                    </UncontrolledPopover>
                                                                </div>
                                                                <div className="row StructureFields">
                                                                    <Label sm={4}>Слово:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields">
                                                                    <Label sm={5}>Номер пропущенной буквы:</Label>
                                                                    <Col sm={7}>
                                                                        <Input type="text" name="number" value={this.state.number} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields">
                                                                    <Label sm={4}>Набор букв:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields">
                                                                    <Label sm={4}>Ссылка на изображение:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                                <div className="row StructureFields">
                                                                    <Label sm={4}>Ссылка на звук:</Label>
                                                                    <Col sm={8}>
                                                                        <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                                    </Col>
                                                                </div>
                                                            </div> :
                                                            this.state.current_leks.leks_type === '8' ?
                                                                <div>
                                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                        <Button id="Popover8" type="button">Подсказка</Button>
                                                                        <UncontrolledPopover placement="right" target="Popover8" trigger="focus">
                                                                            <PopoverBody>
                                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={leks_insert_letters} alt="" />
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                    </div>
                                                                    <div className="row StructureFields">
                                                                        <Label sm={4}>Слово:</Label>
                                                                        <Col sm={8}>
                                                                            <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields">
                                                                        <Label sm={5}>Номера пропущенных букв:</Label>
                                                                        <Col sm={7}>
                                                                            <Input type="text" name="numbers" value={this.state.numbers} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields">
                                                                        <Label sm={4}>Набор букв:</Label>
                                                                        <Col sm={8}>
                                                                            <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields">
                                                                        <Label sm={4}>Ссылка на изображение:</Label>
                                                                        <Col sm={8}>
                                                                            <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                    <div className="row StructureFields">
                                                                        <Label sm={4}>Ссылка на звук:</Label>
                                                                        <Col sm={8}>
                                                                            <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                                        </Col>
                                                                    </div>
                                                                </div> :
                                                                this.state.current_leks.leks_type === '9' ?
                                                                    <div>
                                                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                            <Button id="Popover9" type="button">Подсказка</Button>
                                                                            <UncontrolledPopover placement="right" target="Popover9" trigger="focus">
                                                                                <PopoverBody>
                                                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={leks_create_word} alt="" />
                                                                                </PopoverBody>
                                                                            </UncontrolledPopover>
                                                                        </div>
                                                                        <div className="row StructureFields">
                                                                            <Label sm={4}>Слово:</Label>
                                                                            <Col sm={8}>
                                                                                <Input type="text" name="letter1" value={this.state.letter1} onChange={this.handleChange}></Input>
                                                                            </Col>
                                                                        </div>
                                                                        <div className="row StructureFields">
                                                                            <Label sm={4}>Набор букв:</Label>
                                                                            <Col sm={8}>
                                                                                <Input type="text" name="letters" value={this.state.letters} onChange={this.handleChange}></Input>
                                                                            </Col>
                                                                        </div>
                                                                        <div className="row StructureFields">
                                                                            <Label sm={4}>Ссылка на изображение:</Label>
                                                                            <Col sm={8}>
                                                                                <Input type="text" name="image1" value={this.state.image1} onChange={this.handleChange}></Input>
                                                                            </Col>
                                                                        </div>
                                                                        <div className="row StructureFields">
                                                                            <Label sm={4}>Ссылка на звук:</Label>
                                                                            <Col sm={8}>
                                                                                <Input type="text" name="sound1" value={this.state.sound1} onChange={this.handleChange}></Input>
                                                                            </Col>
                                                                        </div>
                                                                    </div> :
                                                                    <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}