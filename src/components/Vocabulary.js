import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import '../style.css';
import model_word from "../static/tips/model_word.jpg";
import model_consonant from "../static/tips/model_consonant.jpg";
import model_syllable from "../static/tips/model_consonant_2.jpg";
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
            current_leks: { id: null, leks_type: 0 },
            number: "",
            numbers: "",
            letters: "",
            id_lexeme: "",
            id_lexeme_2: "",
            id_lexeme_3: "",
            id_lexeme_4: "",
            lexemes: this.props.lexemes,
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewLeks = this.addNewLeks.bind(this);
        this.showCurrentLeks = this.showCurrentLeks.bind(this);
        this.getSelectedTypeLeks = this.getSelectedTypeLeks.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
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
        this.passPropsToParent();
    }

    addNewLeks() {
        let newLeks = { id: this.state.leks.length, leks_type: 0 };
        let leks = this.state.leks;
        leks[newLeks.id] = newLeks;
        this.setState({
            leks: leks,
        });
        this.passPropsToParent();
    }

    showCurrentLeks(id) {
        console.log(id);
        //console.log(document.getAttribute("data-key"));
        switch (this.state.leks[id].leks_type) {
            case 0:
                this.setState({
                    current_leks: this.state.leks[id],
                });
                break;
            
            case 14:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                    id_lexeme_2: this.state.leks[id].id_lexeme_2 ? this.state.leks[id].id_lexeme_2 : "",
                    id_lexeme_3: this.state.leks[id].id_lexeme_3 ? this.state.leks[id].id_lexeme_3 : "",
                });
                break;
            case 3:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                });
                break;
            case 2:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                    id_lexeme_2: this.state.leks[id].id_lexeme_2 ? this.state.leks[id].id_lexeme_2 : "",
                });
                break;
            case 1:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                });
                break;
            case 18:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                });
                break;
            case 7:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                    id_lexeme_2: this.state.leks[id].id_lexeme_2 ? this.state.leks[id].id_lexeme_2 : "",
                    id_lexeme_3: this.state.leks[id].id_lexeme_3 ? this.state.leks[id].id_lexeme_3 : "",
                    id_lexeme_4: this.state.leks[id].id_lexeme_4 ? this.state.leks[id].id_lexeme_4 : "",
                });
                break;
            case 5:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                    number: this.state.leks[id].number ? this.state.leks[id].number : "",
                    letters: this.state.leks[id].letters ? this.state.leks[id].letters : "",
                });
                break;
            case 15:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                    numbers: this.state.leks[id].numbers ? this.state.leks[id].numbers : "",
                    letters: this.state.leks[id].letters ? this.state.leks[id].letters : "",
                });
                break;
            case 6:
                this.setState({
                    current_leks: this.state.leks[id],
                    id_lexeme: this.state.leks[id].id_lexeme ? this.state.leks[id].id_lexeme : "",
                    letters: this.state.leks[id].letters ? this.state.leks[id].letters : "",
                });
                break;
        }
    }

    getSelectedTypeLeks(event) {
        let leks_type = parseInt(event.target.value);
        let newLeks = { id: this.state.current_leks.id, leks_type: leks_type };
        let leks = this.state.leks;
        leks[newLeks.id] = newLeks;
        this.setState({
            current_leks: newLeks,
            leks: leks,
            number: "",
            numbers: "",
            letters: "",
            id_lexeme: "",
            id_lexeme_2: "",
            id_lexeme_3: "",
            id_lexeme_4: "",
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        console.log(parseInt(event.target.value));
        console.log()
        let id_lexeme = parseInt(event.target.value);
        let newLeks = { ...this.state.current_leks, [event.target.name]: id_lexeme };
        let leks = this.state.leks;
        leks[newLeks.id] = newLeks;
        this.setState({
            current_leks: newLeks,
            leks: leks,
            [event.target.name]: id_lexeme
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let leks = this.state.leks;
        leks.splice(id, 1);
        for (var i = 0; i < leks.length; i++) {
            leks[i].id = i;
        }
        let newLeks = { id: null, leks_type: 0 };
        this.setState({
            leks: leks,
            current_leks: newLeks
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.leks);
    }

    render() {
        return (
            <div className="row" style={{ marginBottom: "3%" }}>
                <div className="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "350px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={this.addNewLeks}>Добавить</Button>
                        {this.state.leks.map((obj, i) =>
                            <Button style={{ width: "190px" }} key={i} color={this.state.current_leks.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentLeks(i)}>Буквы-слова {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.leks.length === 0 || this.state.current_leks.id === null ? <div></div> :
                    <div className="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select className="form-select" style={{ marginBottom: "20px" }} value={this.state.current_leks.leks_type} onChange={this.getSelectedTypeLeks}>
                                <option value={0}>Выберите тип</option>
                                <option value={14}>Моделирование гласной</option>
                                <option value={3}>Моделирование согласной</option>
                                <option value={2}>Моделирование слога</option>
                                <option value={1}>Моделирование слова</option>
                                <option value={18}>Повтор слова</option>
                                <option value={7}>Задание на слоги</option>
                                <option value={5}>Задание на выбор буквы</option>
                                <option value={15}>Задание на выбор букв</option>
                                <option value={6}>Задание на составление слова</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_leks.id)}>Удалить</Button>
                            {this.state.current_leks.leks_type === 0 ? <div></div> :
                                this.state.current_leks.leks_type === 14 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover2" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover2" trigger="focus">
                                                    <PopoverBody row="true">
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={model_vowel} alt="" />
                                                        <img id="2" style={{ height: "150px", width: "150px" }} src={model_vowel_2} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                            <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_2" value={this.state.id_lexeme_2} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                            <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_3" value={this.state.id_lexeme_3} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                        </div> :
                                        this.state.current_leks.leks_type === 3 ?
                                            <div>
                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                    <Button id="Popover2" type="button">Подсказка</Button>
                                                    <UncontrolledPopover placement="right" target="Popover2" trigger="focus">
                                                        <PopoverBody>
                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={model_consonant} alt="" />
                                                        </PopoverBody>
                                                    </UncontrolledPopover>
                                                </div>
                                                <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                    <option value={0}>Выберите лексему</option>
                                                    {this.state.lexemes.map((obj, i) =>
                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                    )}
                                                </select>
                                            </div> :
                                            this.state.current_leks.leks_type === 2 ?
                                                <div>
                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                        <Button id="Popover3" type="button">Подсказка</Button>
                                                        <UncontrolledPopover placement="right" target="Popover3" trigger="focus">
                                                            <PopoverBody>
                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={model_syllable} alt="" />
                                                            </PopoverBody>
                                                        </UncontrolledPopover>
                                                    </div>
                                                    <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                        <option value={0}>Выберите лексему</option>
                                                        {this.state.lexemes.map((obj, i) =>
                                                            <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                        )}
                                                    </select>
                                                    <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_2" value={this.state.id_lexeme_2} onChange={this.getSelectedLexemeId}>
                                                        <option value={0}>Выберите лексему</option>
                                                        {this.state.lexemes.map((obj, i) =>
                                                            <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                        )}
                                                    </select>
                                                </div> :
                                                this.state.current_leks.leks_type === 1 ?
                                                    <div>
                                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                            <Button id="Popover4" type="button">Подсказка</Button>
                                                            <UncontrolledPopover placement="right" target="Popover4" trigger="focus">
                                                                <PopoverBody>
                                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_word} alt="" />
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                        </div>
                                                        <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                            <option value={0}>Выберите лексему</option>
                                                            {this.state.lexemes.map((obj, i) =>
                                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                            )}
                                                        </select>
                                                    </div> :
                                                    this.state.current_leks.leks_type === 18 ?
                                                        <div>
                                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                <Button id="Popover5" type="button">Подсказка</Button>
                                                                <UncontrolledPopover placement="right" target="Popover5" trigger="focus">
                                                                    <PopoverBody>
                                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={model_word} alt="" />
                                                                    </PopoverBody>
                                                                </UncontrolledPopover>
                                                            </div>
                                                            <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                                <option value={0}>Выберите лексему</option>
                                                                {this.state.lexemes.map((obj, i) =>
                                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                )}
                                                            </select>
                                                        </div> :
                                                        this.state.current_leks.leks_type === 7 ?
                                                            <div>
                                                                <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                    <Button id="Popover6" type="button">Подсказка</Button>
                                                                    <UncontrolledPopover placement="right" target="Popover6" trigger="focus">
                                                                        <PopoverBody>
                                                                            <img id="1" style={{ height: "150px", width: "150px" }} src={leks_syllables} alt="" />
                                                                        </PopoverBody>
                                                                    </UncontrolledPopover>
                                                                </div>
                                                                <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                                    <option value={0}>Выберите лексему</option>
                                                                    {this.state.lexemes.map((obj, i) =>
                                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                    )}
                                                                </select>
                                                                <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_2" value={this.state.id_lexeme_2} onChange={this.getSelectedLexemeId}>
                                                                    <option value={0}>Выберите лексему</option>
                                                                    {this.state.lexemes.map((obj, i) =>
                                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                    )}
                                                                </select>
                                                                <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_3" value={this.state.id_lexeme_3} onChange={this.getSelectedLexemeId}>
                                                                    <option value={0}>Выберите лексему</option>
                                                                    {this.state.lexemes.map((obj, i) =>
                                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                    )}
                                                                </select>
                                                                <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme_4" value={this.state.id_lexeme_4} onChange={this.getSelectedLexemeId}>
                                                                    <option value={0}>Выберите лексему</option>
                                                                    {this.state.lexemes.map((obj, i) =>
                                                                        <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                    )}
                                                                </select>
                                                            </div> :
                                                            this.state.current_leks.leks_type === 5 ?
                                                                <div>
                                                                    <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                        <Button id="Popover7" type="button">Подсказка</Button>
                                                                        <UncontrolledPopover placement="right" target="Popover7" trigger="focus">
                                                                            <PopoverBody>
                                                                                <img id="1" style={{ height: "150px", width: "150px" }} src={leks_insert_letter} alt="" />
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                    </div>
                                                                    <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                                        <option value={0}>Выберите лексему</option>
                                                                        {this.state.lexemes.map((obj, i) =>
                                                                            <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                        )}
                                                                    </select>
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
                                                                </div> :
                                                                this.state.current_leks.leks_type === 15 ?
                                                                    <div>
                                                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                            <Button id="Popover8" type="button">Подсказка</Button>
                                                                            <UncontrolledPopover placement="right" target="Popover8" trigger="focus">
                                                                                <PopoverBody>
                                                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={leks_insert_letters} alt="" />
                                                                                </PopoverBody>
                                                                            </UncontrolledPopover>
                                                                        </div>
                                                                        <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                                            <option value={0}>Выберите лексему</option>
                                                                            {this.state.lexemes.map((obj, i) =>
                                                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                            )}
                                                                        </select>
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
                                                                    </div> :
                                                                    this.state.current_leks.leks_type === 6 ?
                                                                        <div>
                                                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                                                <Button id="Popover9" type="button">Подсказка</Button>
                                                                                <UncontrolledPopover placement="right" target="Popover9" trigger="focus">
                                                                                    <PopoverBody>
                                                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={leks_create_word} alt="" />
                                                                                    </PopoverBody>
                                                                                </UncontrolledPopover>
                                                                            </div>
                                                                            <select className="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                                                <option value={0}>Выберите лексему</option>
                                                                                {this.state.lexemes.map((obj, i) =>
                                                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                                                )}
                                                                            </select>
                                                                            <div className="row StructureFields">
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