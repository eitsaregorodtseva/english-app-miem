import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'reactstrap';
import CustomNavbar from './Navbar';
import Table from './Table';
import '../style.css';

const rows = 10;
const tableData_0 = [{ first_name: "Lhfhfs", last_name: 22, country: 167, progress: 23 },
{ first_name: "fdsf", last_name: 24, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 61, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 17, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 12, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 13, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, country: 1, progress: 2 },
{ first_name: 17, last_name: 24, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 61, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 17, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 12, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 13, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 }];

const tableData_1 = [{ first_name: 0, last_name: 22, country: 167, progress: 23 },
{ first_name: 17, last_name: 24, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 61, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 17, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 12, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 13, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, country: 1, progress: 2 },
{ first_name: 17, last_name: 24, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 61, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 17, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 12, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 13, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, country: 1, progress: 2 },
{ first_name: 17, last_name: 24, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 61, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 17, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 },
{ first_name: 12, last_name: 2, progress: 1, country: 2 },
{ first_name: 1, last_name: 2, progress: 13, country: 2 },
{ first_name: 1, last_name: 2, progress: 1, country: 2 }];

const columns = [
    { label: "Имя", accessor: "first_name", sortable: true },
    { label: "Фамилия", accessor: "last_name", sortable: true },
    { label: "Страна", accessor: "country", sortable: true },
    { label: "Прогресс", accessor: "progress", sortable: true },
];
export default class Statisctics extends Component {
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
        /*this.setState({ data: data });*/
        let data_part = tableData_0 === null ? 0 : tableData_0.slice(0, rows);
        let count = tableData_0 === null ? 0 : Math.ceil(tableData_0.length / rows);
        this.setState({
            tableData: tableData_0,
            data_part: data_part,
            count: count
            //page: 0,
            //count: count,
            //firstButton: true,
            //prevButton: true,
            //nextButton: false,
            //lastButton: false
        });
        /*this.setState({
            tableData: tableData_0,
            columns: columns,
        });*/
        toast.success("Данные получены.");
        this.intervalGetData = setInterval(this.getData, 10000);
    }


    async getData() {
        /*const response = await fetch(getDataUrl);
        const data = await response.json();
        console.log(data);*/
        let data_part = tableData_1 === null ? null : tableData_1.slice(0, rows);
        let count = tableData_1 === null ? 0 : Math.ceil(tableData_1.length / rows);
        this.setState({
            tableData: tableData_1,
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
                            <li class="breadcrumb-item active" aria-current="page">Статистика</li>
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
            </div>
        )
    }

}
