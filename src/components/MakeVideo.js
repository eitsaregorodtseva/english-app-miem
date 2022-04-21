import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Label, Button } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const basic_actions = ["Идти", "Бежать", "Смотреть"];

export default class MakeVideo extends Component {
    constructor() {
        super();
        this.state = {
            selectors: [/*{ id: 1, value: "1" }, { id: 2, value: "2" }*/],
            current_selector: [{ id: null, value: "" }],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewAction = this.addNewAction.bind(this);
    }

    handleChange(event) {
        let newAction = { ...this.state.current_selector, value: event.target.value };
        newAction.id = event.target.getAttribute("data-key");
        let selectors = this.state.selectors;
        selectors[newAction.id - 1].value = newAction.value;
        this.setState({
            current_selector: newAction,
            selectors: selectors
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let actions = this.state.selectors;
        console.log(actions);
        /*axios.post('', { actions },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            })*/
    }

    addNewAction() {
        let newSelectors = this.state.selectors;
        newSelectors.push(
            {
                id: this.state.selectors.length + 1,
                value: "",
            });
        this.setState({ selectors: newSelectors });
    }

    render() {
        return (
            <div class="Container">
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <div>
                        <Button style={{marginLeft: "10%", marginBottom: "3%"}} onClick={this.addNewAction}>Добавить новое действие</Button>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        {this.state.selectors.length === 0 ? <div></div> :
                            this.state.selectors.map((obj, i) =>
                                <FormGroup row>
                                    <Label sm={3}>Действие {obj.id}</Label>
                                    <Col sm={3}>
                                        <select style={{marginLeft: "10%", marginTop: "5%"}} data-key={obj.id} name="selector" value={obj.value} onChange={this.handleChange}>
                                            <option>Выберите действие</option>
                                            {basic_actions.map((obj, j) =>
                                                <option value={j}>{basic_actions[j]}</option>
                                            )}
                                        </select>
                                    </Col>
                                </FormGroup>
                            )}
                        {this.state.selectors.length === 0 ? <div></div> : 
                        <Button style={{marginLeft: "15%", marginTop: "3%"}} /*type="submit"*/ onClick={this.handleSubmit}>Применить</Button>}
                    </Form>
                </div>
            </div>
        )
    }
}