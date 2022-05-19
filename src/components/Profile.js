import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Col, Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import CustomNavbar from './Fragments/Navbar';
import Table from './Fragments/Table';
import '../style.css';

const rows = 10;

const columns = [
    { label: "Дата изменений", accessor: "date", sortable: true },
    { label: "Описание", accessor: "description", sortable: true },
];

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
            data_part: [],
            columns: [],
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
        let data = [];
        let data_part = data.length === 0 ? [] : data.slice(0, rows);
        let count = data.length === 0 ? 0 : Math.ceil(data.length / rows);
        this.setState({
            tableData: data,
            data_part: data_part,
            count: count
        });
        toast.success("Данные получены.");
        this.intervalGetData = setInterval(this.getData, 1000);
    }

    async getData() {
        /*const response = await fetch(getDataUrl);
        const data = await response.json();
        console.log(data);
        let data_part = data.length === 0 ? [] : data.slice(0, rows);
        let count = data.length === 0 ? 0 : Math.ceil(data.length / rows);
        this.setState({
            tableData: data,
            data_part: data_part,
            count: count
        });
        toast.success("Данные получены.");*/
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalGetData);
    };

    render() {
        return (
            <div class="Container">
                <header><CustomNavbar login={false} /></header>
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
                            Личные данные
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <Form>
                        <FormGroup style={{ marginTop: "5%" }}>
                            <Label>
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
                        <FormGroup style={{ marginTop: "20px" }}>
                            <Label>
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