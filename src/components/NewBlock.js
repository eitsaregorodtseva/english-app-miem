import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const Container = {
    marginLeft: '20%',
    marginRight: '15%',
    justifyContent: 'left',
    alignItems: 'left',
    display: 'block'
}

export default class Profile extends Component {
    render() {
        return (
            <div style={Container}>
                <header><CustomNavbar /></header>
                <div style={{ marginTop: "100px" }}>
                    <Breadcrumb listTag="div">
                        <BreadcrumbItem
                            href="/menu"
                            tag="a"
                        >
                            Меню
                        </BreadcrumbItem>
                        <BreadcrumbItem
                            active
                            tag="span"
                        >
                            Новый блок
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
        )
    }
}