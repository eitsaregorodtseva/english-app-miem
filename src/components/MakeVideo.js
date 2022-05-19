import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Button, Input } from "reactstrap";
import CustomNavbar from './Fragments/Navbar';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import '../style.css';

const getCommands = 'https://api.unolingua.flareon.ru/api/makevideo/showcommands/';
const postCommands = 'https://api.unolingua.flareon.ru/api/makevideo/video/';

export default class MakeVideo extends Component {
    constructor() {
        super();
        this.state = {
            video_name: "",
            options: [],
            selectors: [/*{ id: 1, value: "1" }, { id: 2, value: "2" }*/],
            current_selector: [{ id: null, value: "" }],
        }
    }

    componentDidMount() {
        fetch(getCommands)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let options = [];
                for (var i = 0; i < data.length; i++) {
                    options.push({ value: data[i], label: data[i] })
                }
                this.setState({
                    options: options
                });
            });
    }

    handleChange = (event, id) => {
        console.log(event);
        console.log(id);
        let newAction = { ...this.state.current_selector, value: event.value };
        newAction.id = id;
        let selectors = this.state.selectors;
        selectors[newAction.id - 1].value = newAction.value;
        this.setState({
            current_selector: newAction,
            selectors: selectors
        });
    }

    handleChangeVideo = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    checkSelectors = () => {
        let mistakes = 0;
        for (var i = 0; i < this.state.selectors.length; i++) {
            if (this.state.selectors[i].value === "") {
                mistakes = mistakes + 1;
                toast.error("Не выбрано действие " + (this.state.selectors[i].id) + "!");
            }
        }
        return mistakes;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let actions = [];
        let mistakes = 0;
        mistakes = mistakes + this.checkSelectors();
        if (mistakes === 0) {
            for (var i = 0; i < this.state.selectors.length; i++) {
                actions.push(this.state.selectors[i].value)
            }
            let video = {
                name_video: this.state.video_name,
                commands: actions
            }
            console.log(video);
            axios.post(postCommands, JSON.stringify(video),
                {
                    headers: {
                        Authorization: `Token ${localStorage.token}`,
                        'Content-Type': 'application/json'
                    },
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        toast.success("Команды для видео " + (this.state.video_name) + " успешно добавлены.")
                    }
                }, (error) => {
                    console.log(error);
                    toast.error("Ошибка!");
                })
        }
    }

    addNewAction = () => {
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
                <CustomNavbar login={false} />
                <div style={{ marginTop: "100px" }}>
                    <Breadcrumb listTag="div">
                        <BreadcrumbItem
                            href="/menu"
                            tag="a">
                            Меню
                        </BreadcrumbItem>
                        <BreadcrumbItem
                            active
                            tag="span">
                            Создать видео
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <FormGroup>
                                <Label>Название</Label>
                                <Col sm={7}>
                                    <Input name="video_name" value={this.state.video_name} type="text" placeholder="Введите название" onChange={this.handleChangeVideo} required />
                                </Col>
                            </FormGroup>
                            <Button style={{ marginBottom: "3%" }} onClick={this.addNewAction}>Добавить новое действие</Button>
                            {this.state.selectors.length === 0 ? <div></div> :
                                this.state.selectors.map((obj, i) =>
                                    <FormGroup key={obj.id}>
                                        <Label>Команда {obj.id}:</Label>
                                        <Col sm={7}>
                                            <Select
                                                options={this.state.options}
                                                name="colors"
                                                value={this.state.options.filter(command => command.value === obj.value)}
                                                className="basic-single"
                                                classNamePrefix="select"
                                                onChange={(e) => this.handleChange(e, obj.id)}
                                                placeholder="Выберите команду"
                                                required
                                            />
                                        </Col>
                                    </FormGroup>
                                )}
                            {this.state.selectors.length === 0 ? <div></div> :
                                <Button type="submit" color="primary" style={{marginBottom: "60px"}}>Создать</Button>}
                        </div>
                    </Form>
                </div >
                <Toaster position="bottom-right" />
            </div >
        )
    }
}