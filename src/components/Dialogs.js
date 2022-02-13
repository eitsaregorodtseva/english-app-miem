import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label } from "reactstrap";
import '../style.css';

export default class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: this.props.dialog,
            current_dialog: { id: null, dialogType: '0' },
            video: "",
            dialog_text: "",
            phrase1: "",
            phrase2: "",
            phrase3: "",
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
        this.setState({
            dialog: [...this.state.dialog, {
                id: this.state.dialog.length,
                dialogType: '0',
            }],
        });
        console.log(this.state.dialog);
        console.log(this.state.dialog.length);
        this.passPropsToParent();
    }

    showCurrentDialog(id) {
        switch (this.state.dialog[id].dialogType) {
            case "0":
                this.setState({
                    current_dialog: this.state.dialog[id],
                });
                break;
            case "18":
                this.setState({
                    current_dialog: this.state.dialog[id],
                    video: this.state.dialog[id].video ? this.state.dialog[id].video : "",
                    dialog_text: this.state.dialog[id].dialog_text ? this.state.dialog[id].dialog_text : "",
                });
                break;
            case "19":
                this.setState({
                    current_dialog: this.state.dialog[id],
                    dialog_text: this.state.dialog[id].dialog_text ? this.state.dialog[id].dialog_text : "",
                    phrase1: this.state.dialog[id].phrase1 ? this.state.dialog[id].phrase1 : "",
                    phrase2: this.state.dialog[id].phrase2 ? this.state.dialog[id].phrase2 : "",
                    phrase3: this.state.dialog[id].phrase3 ? this.state.dialog[id].phrase3 : "",
                });
                break;
            }
            this.passPropsToParent();
    }

    getSelectedTypeDialog(event) {
        let newDialog = {id: this.state.current_dialog.id, dialogType: event.target.value };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            video: "",
            dialog_text: "",
            phrase1: "",
            phrase2: "",
            phrase3: "",
        });
        this.passPropsToParent();
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.dialog);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "450px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewDialog()}>Добавить</Button>
                        {this.state.dialog.map((obj, i) =>
                            <Button style={{ width: "190px" }} color={this.state.current_dialog.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentDialog(i)}>Диалог {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.dialog.length === 0 || this.state.current_dialog.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_dialog.dialogType} onChange={this.getSelectedTypeDialog}>
                                <option value={0}>Выберите тип</option>
                                <option value={18}>Моделирование диалога</option>
                                <option value={19}>Задание на выбор фраз</option>
                            </select>
                            {this.state.current_dialog.dialogType === '0' ? <div></div> :
                                this.state.current_dialog.dialogType === '18' ?
                                    <div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Ссылка на видео:</Label>
                                            <Col sm={8}>
                                                <Input type="text" name="video" value={this.state.video} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                        <div class="row StructureFields">
                                            <Label sm={4}>Диалог:</Label>
                                            <Col sm={8}>
                                                <Input type="textarea" rows="7" name="dialog_text" value={this.state.dialog_text} onChange={this.handleChange}></Input>
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_dialog.dialogType === '19' ?
                                        <div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Диалог:</Label>
                                                <Col sm={8}>
                                                    <Input type="textarea" rows="7" name="dialog_text" value={this.state.dialog_text} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Фраза 1:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="phrase1" value={this.state.phrase1} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Фраза 2:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="phrase2" value={this.state.phrase2} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>
                                            <div class="row StructureFields">
                                                <Label sm={4}>Фраза 3:</Label>
                                                <Col sm={8}>
                                                    <Input type="text" name="phrase3" value={this.state.phrase3} onChange={this.handleChange}></Input>
                                                </Col>
                                            </div>

                                        </div> :
                                        <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}