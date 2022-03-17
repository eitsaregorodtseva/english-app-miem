import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import '../style.css';
import model_dialog from "../static/tips/model_dialog.jpg";
import dialog_insert_phrases from "../static/tips/dialog_insert_phrases.jpg";

export default class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: this.props.dialog,
            current_dialog: { id: null, dialog_type: 0 },
            phrase1: "",
            phrase2: "",
            phrase3: "",
            id_lexeme: "",
            lexemes: this.props.lexemes,
        }
        this.handleChange = this.handleChange.bind(this);
        this.addNewDialog = this.addNewDialog.bind(this);
        this.showCurrentDialog = this.showCurrentDialog.bind(this);
        this.getSelectedTypeDialog = this.getSelectedTypeDialog.bind(this);
    }

    handleChange(event) {
        let newDialog = { ...this.state.current_dialog, [event.target.name]: event.target.value };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            [event.target.name]: event.target.value
        });
        this.passPropsToParent();
    }

    addNewDialog() {
        let newDialog = { id: this.state.dialog.length, dialog_type: 0 };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            dialog: dialog,
        });
        this.passPropsToParent();
    }

    showCurrentDialog(id) {
        console.log(id);
        switch (this.state.dialog[id].dialog_type) {
            case 0:
                this.setState({
                    current_dialog: this.state.dialog[id],
                });
                break;
            case 21:
                this.setState({
                    current_dialog: this.state.dialog[id],
                    id_lexeme: this.state.dialog[id].id_lexeme ? this.state.dialog[id].id_lexeme : "",
                });
                break;
            case 22:
                this.setState({
                    current_dialog: this.state.dialog[id],
                    id_lexeme: this.state.dialog[id].id_lexeme ? this.state.dialog[id].id_lexeme : "",
                    phrase1: this.state.dialog[id].phrase1 ? this.state.dialog[id].phrase1 : "",
                    phrase2: this.state.dialog[id].phrase2 ? this.state.dialog[id].phrase2 : "",
                    phrase3: this.state.dialog[id].phrase3 ? this.state.dialog[id].phrase3 : "",
                });
                break;
        }
    }

    getSelectedTypeDialog(event) {
        let dialog_type = parseInt(event.target.value);
        let newDialog = { id: this.state.current_dialog.id, dialog_type: dialog_type };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            phrase1: "",
            phrase2: "",
            phrase3: "",
            id_lexeme: "",
        });
        this.passPropsToParent();
    }

    getSelectedLexemeId = (event) => {
        console.log(parseInt(event.target.value));
        console.log()
        let id_lexeme = parseInt(event.target.value);
        let newDialog = { ...this.state.current_dialog, [event.target.name]: id_lexeme };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            [event.target.name]: id_lexeme
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let dialog = this.state.dialog;
        dialog.splice(id, 1);
        for (var i = 0; i < dialog.length; i++) {
            dialog[i].id = i;
        }
        let newDialog = { id: null, dialog_type: 0 };
        this.setState({
            dialog: dialog,
            current_dialog: newDialog,
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.dialog);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "350px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewDialog()}>Добавить</Button>
                        {this.state.dialog.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_dialog.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentDialog(i)}>Диалог {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.dialog.length === 0 || this.state.current_dialog.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_dialog.dialog_type} onChange={this.getSelectedTypeDialog}>
                                <option value={0}>Выберите тип</option>
                                <option value={21}>Моделирование диалога</option>
                                <option value={22}>Задание вставь фразы</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_dialog.id)}>Удалить</Button>
                            {this.state.current_dialog.dialog_type === 0 ? <div></div> :
                                this.state.current_dialog.dialog_type === 21 ?
                                    <div>
                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                            <Button id="Popover18" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover18" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_dialog} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                            <option value={0}>Выберите лексему</option>
                                            {this.state.lexemes.map((obj, i) =>
                                                <option value={obj.id_lex}>{obj.mean_lex}</option>
                                            )}
                                        </select>
                                    </div> :
                                    this.state.current_dialog.dialog_type === 22 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover19" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover19" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={dialog_insert_phrases} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <select class="form-select" style={{ marginBottom: "20px" }} name="id_lexeme" value={this.state.id_lexeme} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                            <select class="form-select" style={{ marginBottom: "20px" }} name="phrase1" value={this.state.phrase1} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                            <select class="form-select" style={{ marginBottom: "20px" }} name="phrase2" value={this.state.phrase2} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                            <select class="form-select" style={{ marginBottom: "20px" }} name="phrase3" value={this.state.phrase3} onChange={this.getSelectedLexemeId}>
                                                <option value={0}>Выберите лексему</option>
                                                {this.state.lexemes.map((obj, i) =>
                                                    <option value={obj.id_lex}>{obj.mean_lex}</option>
                                                )}
                                            </select>
                                        </div> :
                                        <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}