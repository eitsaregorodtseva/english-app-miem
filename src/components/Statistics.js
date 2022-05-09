import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from 'reactstrap';
import CustomNavbar from './Fragments/Navbar';
import Table from './Fragments/Table';
import '../style.css';

const rows = 10;
const getProgress = 'https://api.unolingua.flareon.ru/progress/';
const getExercises = 'https://api.unolingua.flareon.ru/exercises/';

export default class Statisctics extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
            data_part: [],
            columns: [],
            progress: [],
            count: 0
        }
        this.getData = this.getData.bind(this);
    };

    componentDidMount() {
        fetch(getExercises)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let columns = [];
                columns.push({ label: "Логин", accessor: "login", sortable: true });
                for (var i = 0; i < data.length; i++) {
                    columns.push({ label: data[i].id_ex, accessor: data[i].id_ex, sortable: false })
                }
                this.setState({
                    columns: columns
                });
            })
        fetch(getProgress)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    progress: data
                });
            })
        toast.success("Данные получены.");
        setTimeout(() => this.prepareData(), 2500);
        this.intervalGetData = setInterval(this.getData, 10000);
    }

    prepareData = () => {
        let tableData = [];
        for (var i = 0; i < this.state.progress.length; i++) {
            console.log(this.state.progress[i].login)
            if (tableData.length !== 0) {
                let index = tableData.findIndex(object => {
                    return object.login === this.state.progress[i].login;
                });
                console.log(index);
                if (index !== -1) {
                    let oldData = tableData[index];
                    let newData = { ...oldData, [this.state.progress[i].id_ex]: this.state.progress[i].count_attempt }
                    tableData[index] = newData;
                }
                else {
                    tableData.push({ login: this.state.progress[i].login, [this.state.progress[i].id_ex]: this.state.progress[i].count_attempt })
                }
            }
            else {
                tableData.push({ login: this.state.progress[i].login, [this.state.progress[i].id_ex]: this.state.progress[i].count_attempt })
            }
        }
        console.log(tableData);
        let data_part = tableData.length === 0 ? 0 : tableData.slice(0, rows);
        let count = tableData.length === 0 ? 0 : Math.ceil(tableData.length / rows);
        this.setState({
            tableData: tableData,
            data_part: data_part,
            count: count
        });
    }

    async getData() {
        const responseEx = await fetch(getExercises);
        const data_1 = await responseEx.json();
        console.log(data_1);
        const responsePr = await fetch(getProgress);
        const data_2 = await responsePr.json();
        console.log(data_2);
        let columns = [];
        columns.push({ label: "Логин", accessor: "login", sortable: true });
        for (var i = 0; i < data_1.length; i++) {
            columns.push({ label: data_1[i].id_ex, accessor: data_1[i].id_ex, sortable: false })
        }
        this.setState({
            columns: columns,
            progress: data_2
        });
        toast.success("Данные получены.");
        setTimeout(() => this.prepareData(), 2500);
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
                {this.state.columns.length === 0 || this.state.tableData.length === 0 ? <div class="CenterContainer"><Spinner color="secondary" /></div> :
                    this.state.tableData.length === 0 ? <div>Нет данных</div> :
                        <div>
                            <Table style={{width: "400px", scrollX: "auto"}} data={this.state.tableData} data_part={this.state.data_part} count={this.state.count} columns={this.state.columns} />
                        </div>
                }
                <Toaster position="bottom-right" />
            </div>
        )
    }

}
