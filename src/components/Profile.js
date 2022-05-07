import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import CustomNavbar from './Navbar';
import Table from './Table';
import '../style.css';

const rows = 10;
const data = null;
const tableData = [{ date: 10, description: 22 },
{ date: 17, description: 24 },
{ date: 1, description: 2 },
{ date: 1, description: 2 },
{ date: 17, description: 2 },
{ date: 1, description: 2 },
{ date: 1, description: 2 },
{ date: 12, description: 2 },
{ date: 1, description: 2 },
{ date: 1, description: 2 },
{ date: 1, description: 2 },
{ date: 17, description: 24 },
{ date: 1, description: 2 },
{ date: 1, description: 2 },
{ date: 17, description: 2 },
{ date: 1, description: 2 },
{ date: 1, description: 2 },
{ date: 12, description: 2 },
{ date: 1, description: 2 },
{ date: 1, description: 2 }];

const columns = [
    { label: "Дата изменений", accessor: "date", sortable: true },
    { label: "Описание", accessor: "description", sortable: true },
];

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            tableData: null,
            data_part: null,
            columns: null,
            count: 0
        }
        this.getData = this.getData.bind(this);
    };

    componentDidMount() {
        /*fetch(getDataUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    data: data
                });
            })*/
        //let data_part = data.slice(0, 5);
        //let data_part = data_1.slice(0, 5);
        let data_part = data === null ? null : data.slice(0, rows);
        let count = data === null ? 0 : Math.ceil(data.length / rows);
        this.setState({
            tableData: data,
            data_part: data_part,
            count: count
        });
        //this.setState({ data: data });
        toast.success("Данные получены.");
        this.intervalGetData = setInterval(this.getData, 10000);
    }

    async getData() {
        /*const response = await fetch(getDataUrl);
        const data = await response.json();
        console.log(data);*/
        let data_part = tableData === null ? null : tableData.slice(0, rows);
        let count = tableData === null ? 0 : Math.ceil(tableData.length / rows);
        this.setState({
            tableData: tableData,
            data_part: data_part,
            count: count
        });
        toast.success("Данные получены.");
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalGetData);
    };

    render() {
        return (
            <div class="Container">
                <header><CustomNavbar login={false} /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Личные данные</li>
                        </ol>
                    </nav>
                </div>
                <div>
                    <Form>
                        <FormGroup row style={{ marginTop: "5%" }}>
                            <Label sm={2}>
                                Username
                            </Label>
                            <Col sm={7}>
                                <Input style={{ width: "40%", borderRadius: "10px" }}
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={localStorage.username}
                                    disabled />
                            </Col>
                        </FormGroup>
                        {/*<FormGroup row style={{ marginTop: "20px" }}>
                            <Label for="last_name" sm={2}>
                                Фамилия
                            </Label>
                            <Col sm={10}>
                                <Input style={{ width: "40%", borderRadius: "10px" }}
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    disabled />
                            </Col>
        </FormGroup>*/}
                        <FormGroup row style={{ marginTop: "20px" }}>
                            <Label sm={2}>
                                Email
                            </Label>
                            <Col sm={7}>
                                <Input style={{ width: "40%", borderRadius: "10px" }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={localStorage.email}
                                    disabled />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <h4>История изменений</h4>
                    {this.state.tableData === null ? <div class="CenterContainer"><Spinner color="secondary" /></div> :
                        this.state.tableData.length === 0 ? <div>Нет данных</div> :
                            <div>
                                <Table data={this.state.tableData} data_part={this.state.data_part} count={this.state.count} columns={columns} />
                            </div>
                    }
                </div>
                <Toaster position="bottom-right" />
            </div >
        )
    }
}