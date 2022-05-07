import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import exit from '../static/icons/logout.svg';

const NavbarStyle = {
    backgroundColor: '#84C7AE',
    height: "54px"
}

const NavbarStyleExit = {
    backgroundColor: '#84C7AE'
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
                            <Button style={ButtonStyle} onClick={logout} href="/">
                                <img src={exit} alt="" style={{ height: "24px", paddingRight: "10px", paddingLeft: "5px" }} />
                                <span style={{ paddingRight: "10px" }}>Выйти</span>
                            </Button>
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