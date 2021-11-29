import 'bootstrap/dist/css/bootstrap.min.css';
import './Cabinet.css'
import { useState } from 'react';
import Menu from './Menu.js'
import { useHistory } from "react-router-dom";
import logout from '../static/icons/logout.svg'

export default function Cabinet() {
  const [newLessonVisible, setNewLessonVisibility] = useState(false);
  let history = useHistory();

  function handleClick() {
    localStorage.removeItem('token');
    history.push("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-admin">
          <button onClick={handleClick} className="Admin-button"><img src={logout} alt="" height="32px" width="32px" style={{ paddingRight: '10px' }}/>Выйти  </button>
        </div>
      </header>
      
      <main className="App-main">
      <div>
        <Menu />
      </div>
        <div className="App-NewLesson">
          <div>
          <button className="Button-NewLesson" /*onClick={setNewLessonVisibility(true)}*/>
            {/*<img src={} alt="" height="24px" width="24px" />*/}  Добавить новый урок</button>
            </div>
          <div className={newLessonVisible === true ? "NewLesson" : "NewLessonHidden"}>
            <form className="NewLessonInput">
              <label>
                <input className="Input"
                  type="text"
                  name="number"
                  placeholder="Номер" />
              </label>
              <label>
                <input className="Input"
                  type="text"
                  name="theme"
                  placeholder="Тема" />
              </label>
              <label>
                <input className="Input"
                  type="text"
                  name="video"
                  placeholder="Видео" />
              </label>
              <label>
                <textarea className="Input"
                  type="text"
                  name="description"
                  placeholder="Пояснение"
                  rows="3" />
              </label>
              <label>
                <textarea className="Input"
                  type="text"
                  name="task"
                  placeholder="Задание"
                  rows="3" />
              </label>
              <label>
                <input className="Input"
                  type="text"
                  name="answer"
                  placeholder="Ответ" />
              </label>
              <div className="Buttons">
                <button className="App-Button">
                  {/*<img src={} alt="" height="24px" width="24px" />*/}  Сохранить</button>
                <button className="App-Button">
                  {/*<img src={} alt="" height="24px" width="24px" />*/}  Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  )
}
