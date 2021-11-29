import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Login.css';

const authError = "Неверный логин или пароль!";
const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

export default function LoginForm() {
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: login,
      password: password
    };

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    axios.post(baseAPIUrl + '/users/login/', { user }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      const token = res.data.user.token;
      const group = res.data.user.group;
      localStorage.setItem('token', token);
      localStorage.setItem('group', group);
      history.push("/cabinet");
      //console.log(res);
      //console.log(res.user.token);
      //console.log(res.user.group);

    })
    .catch((error) => {
      console.log(error.response.data.errors.error[0]);
      setErrorMessage(authError);
      //
    })
}
    
    return (
      <div className="App-login">
        <header className="App-header">
          </header>
          <main className="App-main">
            <div className="App-InputForm">
              <p className="Title">Панель администратора</p>
              <h5 style={{ textAlign: 'center', color: 'red' }}>{ errorMessage }</h5>
            <form onSubmit={handleSubmit}>
              <label>
                <input className="App-Input" 
                type="text" 
                name="login" 
                placeholder="Логин"
                value={login}
                required="required"
                onChange={(e) => setLogin(e.target.value)}/>
              </label>
              <label>
                <input className="App-Input" 
                type="password" 
                name="password" 
                placeholder="Пароль"
                value={password}
                required="required"
                onChange={(e) => setPassword(e.target.value)}/>
              </label>
              <button className="App-ButtonLogin" type="submit"> Войти
                </button>
            </form>
            <a className="Link-Password" href="url"> Забыли пароль?</a>
            </div>
          </main>
          <footer></footer>
        </div>
    );
  }