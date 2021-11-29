import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from "react";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import logout from '../static/icons/logout.svg';

const NavbarStyle = {
    backgroundColor: '#84C7AE'
}

const ButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#000000",
    borderRadius: "20px",
    border: "none"
}

export default class CustomNavbar extends Component {
    render() {
        return (
            <div>
                <Navbar container expand="md" fixed="top" style={NavbarStyle}>
                    <Nav className="ms-auto"
                        navbar style={{ marginRight: "1%" }}>
                        <NavItem>
                            <Button style={ButtonStyle}>
                                <img src={logout} alt="" style={{ height: "24px", paddingRight: "10px", paddingLeft: "5px" }} />
                                <span style={{ paddingRight: "10px" }}>Выйти</span>
                            </Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}