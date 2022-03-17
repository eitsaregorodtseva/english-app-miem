import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Pagination, PaginationItem, PaginationLink, Table, Spinner } from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import CustomNavbar from './Navbar';
import '../style.css';

const getDataUrl = "";
const rows = 10;
const data = null;
const data_1 = [{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 },
{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 },
{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 },
{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 },
{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 },
{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 },
{ ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }, { ch_date: 1, ch_desc: 2 }];

export default class History extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            data_part: null,
            page: null,
            count: null,
            firstButton: true,
            prevButton: true,
            nextButton: false,
            lastButton: false
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
        this.setState({ data: data });
        toast.success("Данные получены.");
        this.intervalGetData = setInterval(this.getData, 10000);
    }

    async getData() {
        /*const response = await fetch(getDataUrl);
        const data = await response.json();
        console.log(data);*/
        let data_part = data_1.slice(0, rows);
        let count = Math.ceil(data_1.length/rows);
        this.setState({
            data: data_1,
            data_part: data_part,
            page: 0,
            count: count,
            firstButton: true,
            prevButton: true,
            nextButton: false,
            lastButton: false
        });
        toast.success("Данные получены.");
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalGetData);
    };

    firstPage = () => {
        let data_part = this.state.data.slice(0, rows);
        this.setState({
            data_part: data_part,
            page: 0,
            firstButton: true,
            prevButton: true,
            nextButton: false,
            lastButton: false
        });
    }

    previousPage = () => {
        let data_part = this.state.data.slice((this.state.page - 1) * rows, (this.state.page - 1) * rows + rows);
        let page = this.state.page - 1;
        let firstState = page === 0 ? true : false;
        this.setState({
            data_part: data_part,
            page: page,
            firstButton: firstState,
            prevButton: firstState,
            nextButton: false,
            lastButton: false
        });
    }

    nextPage = () => {
        let data_part = this.state.data.slice((this.state.page + 1) * rows, (this.state.page + 1) * rows + rows);
        let page = this.state.page + 1;
        let lastState = this.state.count === page + 1 ? true : false;
        this.setState({
            data_part: data_part,
            page: page,
            firstButton: false,
            prevButton: false,
            nextButton: lastState,
            lastButton: lastState
        });
    }

    lastPage = () => {
        let pages = this.state.data.length % rows;
        if (pages === 0) {
            pages = -rows;
        }
        else {
            pages = -pages;
        }
        let data_part = this.state.data.slice(pages);
        let count = this.state.count;
        this.setState({
            data_part: data_part,
            page: count,
            firstButton: false,
            prevButton: false,
            nextButton: true,
            lastButton: true
        });
    }

    render() {
        return (
            <div class="Container">
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
                            <li class="breadcrumb-item active" aria-current="page">История изменений</li>
                        </ol>
                    </nav>
                </div>
                <div style={{ marginTop: "5%", textAlign: "center" }}>
                    {this.state.data === null ? <div class="CenterContainer"><Spinner color="secondary" /></div> :
                        this.state.data.length === 0 ? <div>Нет данных</div> :
                            <div>
                                <Table hover responsive bordered>
                                    <thead>
                                        <tr>
                                            <th>
                                                Имя администратора
                                            </th>
                                            <th>
                                                Дата изменения
                                            </th>
                                            <th>
                                                Описание
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data_part.map((obj, i) =>
                                            <tr>
                                                <td>
                                                    {obj.ch_date}
                                                </td>
                                                <td>
                                                    {obj.ch_desc}
                                                </td>
                                                <td>
                                                    {obj.ch_desc}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <Pagination>
                                    <PaginationItem disabled={this.state.firstButton}>
                                        <PaginationLink first onClick={this.firstPage} />
                                    </PaginationItem>
                                    <PaginationItem disabled={this.state.prevButton} >
                                        <PaginationLink previous onClick={this.previousPage} />
                                    </PaginationItem>
                                    <PaginationItem disabled={this.state.lastButton}>
                                        <PaginationLink next onClick={this.nextPage} />
                                    </PaginationItem>
                                    <PaginationItem disabled={this.state.lastButton}>
                                        <PaginationLink last onClick={this.lastPage} />
                                    </PaginationItem>
                                    <div>Страница {this.state.page + 1 } из {this.state.count}</div>
                                </Pagination>
                            </div>
                    }
                </div>
                <Toaster position="bottom-right" />
            </div>
        )
    }
}