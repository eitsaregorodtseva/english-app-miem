import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'reactstrap';
import CustomNavbar from './Navbar';
import Table from './Table';
import '../style.css';

const rows = 10;
const tableData = [{ name: 10, date: 22, description: 23 },
{ name: "try", date: 24, description: "Раз" },
{ name: 1, date: 2, description: "Два" },
{ name: 1, date: 2, description: "Три" },
{ name: 17, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 12, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 17, date: 24, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 17, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 12, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" },
{ name: 1, date: 2, description: "gdfgdgfdg" }];

const columns = [
    { label: "Имя администратора", accessor: "name", sortable: true },
    { label: "Дата изменения", accessor: "date", sortable: true },
    { label: "Описание", accessor: "description", sortable: true },
];

export default class History extends Component {
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
        let data_part = tableData === null ? null : tableData.slice(0, rows);
        let count = tableData === null ? 0 : Math.ceil(tableData.length / rows);
        this.setState({
            tableData: tableData,
            data_part: data_part,
            count: count
        });
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
        return(
            <div class = "Container" >
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li class="breadcrumb-item active" aria-current="page">История изменений</li>
                        </ol>
                    </nav>
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
