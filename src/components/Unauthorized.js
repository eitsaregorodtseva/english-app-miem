import { useHistory } from "react-router-dom";
import { Button} from "reactstrap";
import CustomNavbar from './Fragments/Navbar';
import '../style.css';

const Unauthorized = () => {
    const history = useHistory();

    function pushToLogin() {
        history.push("/");
    }

    return (
        <div>
            <header><CustomNavbar login={true} /></header>
            <div style={{ textAlign: 'center', verticalAlign: 'middle', marginTop: '120px' }}>
                <h1>Вы не авторизованы, чтобы просматривать данную страницу!</h1>
                <Button style={{ marginTop: '50px' }} onClick={pushToLogin}>
                    Перейти к авторизации</Button>
            </div>
        </div>
    )
}

export default Unauthorized;