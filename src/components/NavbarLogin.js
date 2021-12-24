import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from "react";
import { Navbar, Nav } from "reactstrap";

const NavbarStyle = {
    backgroundColor: '#84C7AE',
    height: "54px"
}


export default class NavbarLogin extends Component {
    render() {
        return (
            <div>
                <Navbar container expand="md" fixed="top" style={NavbarStyle}>
                    <Nav className="ms-auto"
                        navbar style={{ marginRight: "-3%" }}>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}