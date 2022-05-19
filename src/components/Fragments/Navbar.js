import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import exit from '../../static/icons/logout.svg';

const NavbarStyle = {
    height: "41px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"
}

const NavbarStyleExit = {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"
}

const ButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "#000000",
    borderRadius: "20px",
    border: "none"
}

export default function CustomNavbar(props) {
    let history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('group');
        localStorage.removeItem('email');
        history.push("/");
    }

    return (
        <div>
            {props.login === false ?
                <Navbar container expand="md" fixed="top" style={NavbarStyleExit}>
                    <Nav className="ms-auto"
                        navbar style={{ marginRight: "-3%" }}>
                        <NavItem>
                            <img src={exit} alt="" onClick={logout} style={{ height: "24px", paddingRight: "10px", paddingLeft: "5px", cursor: "pointer" }} />
                        </NavItem>
                    </Nav>
                </Navbar> : 
                <Navbar container expand="md" fixed="top" style={NavbarStyle}>
                    <Nav className="ms-auto"
                        navbar style={{ marginRight: "-3%" }}>
                    </Nav>
                </Navbar>
            }
        </div>
    )
}