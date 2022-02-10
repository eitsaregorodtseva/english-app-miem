import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import '../style.css';

export default class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: this.props.dialog,
            current_dialog: { dialogId: null, dialogType: '0' },
        }
        this.addNewDialog = this.addNewDialog.bind(this);
        this.showCurrentDialog = this.showCurrentDialog.bind(this);
        this.getSelectedTypeDialog = this.getSelectedTypeDialog.bind(this);
    }

    addNewDialog() {
        this.setState({
            dialog: [...this.state.dialog, {
                id: this.state.dialog.length + 1,
                dialogType: '0',
            }],
        })
        this.passPropsToParent();
    }

    showCurrentDialog(dialogId) {
        this.setState({
            current_dialog: { dialogId: dialogId, dialogType: this.state.dialog[dialogId].dialogType },
        });
    }

    getSelectedTypeDialog(event) {
        let newDialog = { ...this.state.current_dialog, dialogType: event.target.value };
        let dialog = this.state.dialog;
        dialog[newDialog.dialogId].dialogType = newDialog.dialogType;
        this.setState({
            current_dialog: newDialog,
            dialog: dialog
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
                            <Button style={{ width: "190px" }} onClick={() => this.showCurrentDialog(i)}>Диалог {i + 1}</Button>)}
                    </Col>
                </div>
                {this.state.dialog.length === 0 ? <div></div> :
                    <div class="col" style={{ marginTop: "1%", width: "500px" }}>
                        <Form>
                            <select class="form-select" style={{ marginBottom: "20px" }} value={this.state.current_dialog.dialogType} onChange={this.getSelectedTypeDialog}>
                                <option value={0}>Выберите тип</option>
                            </select>
                            { }
                        </Form>
                    </div>}
            </div>)
    }
}