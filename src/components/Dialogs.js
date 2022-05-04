import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label, UncontrolledPopover, PopoverBody } from "reactstrap";
import Select from 'react-select';
import '../style.css';
import model_dialog from "../static/tips/model_dialog.jpg";
import dialog_insert_phrases from "../static/tips/dialog_insert_phrases.jpg";

const numbers = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" }];

export default class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: [],
            lexemes: [],
            replicas: [],
            current_dialog: { id: null, type_ex: 0, num_ex: 0 },
            id_rep: "",
            id_miss: "",
            options: [],
            options_dialogs: []
        }
    }

    componentDidMount() {
        let options = [];
        for (var i = 0; i < this.props.replicas.length; i++) {
            options.push({ value: this.props.replicas[i].id_rep, label: this.props.replicas[i].lexeme.mean_lex + this.props.replicas[i].symbol })
        }
        let options_dialogs = [];
        for (var i = 0; i < this.props.lexemes.length; i++) {
            if (this.props.lexemes[i].type === "диалог") {
                options_dialogs.push({ value: this.props.lexemes[i].id_lex, label: this.props.lexemes[i].mean_lex })
            }
        }
        this.setState({
            dialog: this.props.dialog,
            lexemes: this.props.lexemes,
            replicas: this.props.replicas,
            options: options,
            options_dialogs: options_dialogs
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dialog !== this.state.dialog) {
            this.setState({
                dialog: this.props.dialog,
                current_dialog: { id: null, type_ex: 0, num_ex: 0 }
            })
        }
    }

    handleChange = (event) => {
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

    handleChangeOrder = (event) => {
        let num_ex = parseInt(event.target.value);
        let newDialog = { ...this.state.current_dialog, num_ex: num_ex };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
        });
        this.passPropsToParent();
    }

    handleChangeMultiple = (event) => {
        let id_rep = [];
        if (typeof (event.value) === "number") {
            id_rep.push(event.value)
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_rep.push(event[i].value)
            }
        }
        let newDialog = { ...this.state.current_dialog, id_rep: id_rep };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            id_rep: id_rep
        });
        this.passPropsToParent();
    }

    handleChangeMultipleNum = (event) => {
        let id_miss = [];
        if (typeof (event.value) === "number") {
            id_miss.push(event.value)
        }
        else {
            for (var i = 0; i < event.length; i++) {
                id_miss.push(event[i].value)
            }
        }
        let newDialog = { ...this.state.current_dialog, id_miss: id_miss };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            id_miss: id_miss
        });
        this.passPropsToParent();
    }

    addNewDialog = () => {
        let newDialog = { id: this.state.dialog.length, type_ex: 0, num_ex: 0 };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            dialog: dialog,
        });
        this.passPropsToParent();
    }

    showCurrentDialog = (id) => {
        switch (this.state.dialog[id].type_ex) {
            case 0:
                this.setState({
                    current_dialog: this.state.dialog[id],
                });
                break;
            case 21:
                this.setState({
                    current_dialog: this.state.dialog[id],
                    id_rep: this.state.dialog[id].id_rep ? this.state.dialog[id].id_rep : "",
                });
                break;
            case 22:
                this.setState({
                    current_dialog: this.state.dialog[id],
                    id_rep: this.state.dialog[id].id_rep ? this.state.dialog[id].id_rep : "",
                    id_miss: this.state.dialog[id].id_miss ? this.state.dialog[id].id_miss : ""
                });
                break;
        }
    }

    getSelectedTypeDialog = (event) => {
        let type_ex = parseInt(event.target.value);
        let newDialog = { id: this.state.current_dialog.id, type_ex: type_ex, num_ex: 0 };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            id_rep: "",
            id_miss: ""
        });
        this.passPropsToParent();
    }

    getSelectedRepId = (event) => {
        let id_rep = [];
        id_rep.push(parseInt(event.target.value));
        let newDialog = { ...this.state.current_dialog, [event.target.name]: id_rep };
        let dialog = this.state.dialog;
        dialog[newDialog.id] = newDialog;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog,
            [event.target.name]: id_rep
        });
        this.passPropsToParent();
    }

    deleteElement = (id) => {
        let dialog = this.state.dialog;
        dialog.splice(id, 1);
        for (var i = 0; i < dialog.length; i++) {
            dialog[i].id = i;
        }
        let newDialog = { id: null, type_ex: 0, num_ex: 0 };
        this.setState({
            dialog: dialog,
            current_dialog: newDialog,
        });
        this.passPropsToParent();
    }

    filterOptions(vl) {
        return this.includes(vl.value)
    }

    passPropsToParent() {
        this.props.parentCallback(this.state.dialog);
    }


    render() {
        return (
            <div class="row" style={{ marginBottom: "3%" }}>
                <div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "370px" }}>
                    <Col sm={12}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewDialog()}>Добавить</Button>
                        {this.state.dialog.map((obj, i) =>
                            <Button style={{ width: "190px" }} key={obj.id} color={this.state.current_dialog.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentDialog(i)}>Диалог {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.dialog.length === 0 || this.state.current_dialog.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_dialog.type_ex} onChange={this.getSelectedTypeDialog}>
                                <option value={0}>Выберите тип</option>
                                <option value={21}>Моделирование диалога</option>
                                <option value={22}>Задание вставь фразы</option>
                            </select>
                            <Button color="danger" onClick={() => this.deleteElement(this.state.current_dialog.id)}>Удалить</Button>
                            {this.state.current_dialog.type_ex === 0 ? <div></div> :
                                this.state.current_dialog.type_ex === 21 ?
                                    <div>
                                        <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                            <Button id="Popover18" type="button">Подсказка</Button>
                                            <UncontrolledPopover placement="right" target="Popover18" trigger="focus">
                                                <PopoverBody>
                                                    <img id="1" style={{ height: "150px", width: "150px" }} src={model_dialog} alt="" />
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                        </div>
                                        <div className="row StructureFields">
                                            <Label sm={3}>Номер в уроке:</Label>
                                            <Col sm={2}>
                                                <Input type="number" name="num_ex" value={this.state.current_dialog.num_ex} onChange={this.handleChangeOrder}></Input>
                                            </Col>
                                        </div>
                                        <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                            <Label sm={3}>Диалог:</Label>
                                            <Col sm={9}>
                                                <Select
                                                    options={this.state.options_dialogs}
                                                    value={this.state.options_dialogs.filter(this.filterOptions, this.state.id_rep)}
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    onChange={this.handleChangeMultiple}
                                                    placeholder="Выберите диалог"
                                                />
                                            </Col>
                                        </div>
                                    </div> :
                                    this.state.current_dialog.type_ex === 22 ?
                                        <div>
                                            <div style={{ paddingLeft: "530px", paddingBottom: "10px" }}>
                                                <Button id="Popover19" type="button">Подсказка</Button>
                                                <UncontrolledPopover placement="right" target="Popover19" trigger="focus">
                                                    <PopoverBody>
                                                        <img id="1" style={{ height: "150px", width: "150px" }} src={dialog_insert_phrases} alt="" />
                                                    </PopoverBody>
                                                </UncontrolledPopover>
                                            </div>
                                            <div className="row StructureFields">
                                                <Label sm={3}>Номер в уроке:</Label>
                                                <Col sm={2}>
                                                    <Input type="number" name="num_ex" value={this.state.current_dialog.num_ex} onChange={this.handleChangeOrder}></Input>
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Диалог:</Label>
                                                <Col sm={9}>
                                                    <Select
                                                        options={this.state.options}
                                                        value={this.state.options.filter(this.filterOptions, this.state.id_rep)}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeMultiple}
                                                        placeholder="Выберите реплики для диалога"
                                                    />
                                                </Col>
                                            </div>
                                            <div className="row StructureFields" style={{ marginTop: "20px" }}>
                                                <Label sm={3}>Пропущенные реплики:</Label>
                                                <Col sm={9}>
                                                    <Select
                                                        options={numbers}
                                                        isMulti
                                                        name="colors"
                                                        value={numbers.filter(this.filterOptions, this.state.id_miss)}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        onChange={this.handleChangeMultipleNum}
                                                        placeholder="Выберите номера реплик"
                                                    />
                                                </Col>
                                            </div>
                                        </div> :
                                        <div></div>}
                        </Form>
                    </div>}
            </div>)
    }
}