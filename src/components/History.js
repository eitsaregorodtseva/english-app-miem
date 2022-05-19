import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import CustomNavbar from './Fragments/Navbar';
import Table from './Fragments/Table';
import '../style.css';

const rows = 10;

const columns = [
    { label: "Администратор", accessor: "name", sortable: true },
    { label: "Дата изменения", accessor: "date", sortable: true },
    { label: "Описание", accessor: "description", sortable: true },
];

export default class History extends Component {
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
            <div class="Container" >
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
                                История изменений
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
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
