import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { FormGroup, Badge, Col, List, Label } from "reactstrap";
import { Link, Redirect } from 'react-router-dom';
import CustomNavbar from './Navbar';
import Editing from './Editing';
import '../style.css';
import axios from 'axios';

const BadgePills = {
  padding: "1% 5% 1% 5%"
}

export default class Cabinet extends Component {
  constructor() {
    super();
    this.state = {
      blocks: [
        {
          id: 1,
          lessons_info: [
            { id: 1, video_st: 'В процессе', leks_st: 'Пусто', phr_st: 'Пусто', dialog_st: 'Пусто', rules_st: 'Пусто' },
            { id: 2, video_st: 'В процессе', leks_st: 'В процессе', phr_st: 'Готов', dialog_st: 'Пусто', rules_st: 'Пусто' }]
        },
        {
          id: 2,
          lessons_info: [
            { id: 1, video_st: 'В процессе', leks_st: 'Пусто', phr_st: 'Пусто', dialog_st: 'Пусто', rules_st: 'Пусто' }]
        }
      ],
      new_blocks: null,
    }
    this.sendPostRequest = this.sendPostRequest.bind(this);
  };

  componentDidMount() {
    /*fetch('http://172.18.130.45:5052/api/lessonblocks/')
      .then((response) => {
        //console.log(response);
        return response.json();
    }) 
      .then((data) => {
        console.log(data);
      })*/
  }

  sendPostRequest() {
    axios.post('http://172.18.130.45:5052/api/lessons/',
      { 'name_les': "урок 1", "id_lb": 3 },
      {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

    fetch('http://172.18.130.45:5052/api/lessons/')
      .then((response) => {
        console.log(response.json())
      })
  }

  render() {
    return (
      <div class="Container">
        <header><CustomNavbar /></header>
        <div style={{ marginTop: "100px" }}>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
              <li class="breadcrumb-item active" aria-current="page">Уроки</li>
            </ol>
          </nav>
        </div>
        <div class="accordion" id="accordion" style={{ marginTop: "5%" }}>
          {this.state.blocks === null ? <p>данные загружаются</p> : this.state.blocks.map((obj, i) => (
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseArea" aria-expanded="false" aria-controls="collapseArea">
                  Блок {i + 1}
                </button>
              </h2>
              <div id="collapseArea" class="accordion-collapse collapse" aria-labelledby="heading" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  {obj.lessons_info.map((obj, j) => (
                    <div class="LessonDiv">
                      <button disabled class="GreyBox">Урок {j + 1}</button>
                      <div style={{ marginTop: "5%" }}>
                        <Link to={{
                          pathname: "/editing",
                          state: { block_id: i, lesson_id: j, blocks: this.state.blocks }
                        }}>
                          <button type="button" class="EditLesson" /*href="/editing"*/>
                            Редактировать урок</button></Link>
                        <button class="ViewLesson">Предпросмотр</button>
                      </div>
                      <div style={{ marginTop: "5%" }}>
                        <List>
                          <FormGroup row>
                            <Label sm={3}>Видео</Label>
                            <Col sm={9}>
                              <Badge pill color={obj.video_st === 'Пусто' ? "danger" : obj.video_st === 'В процессе' ? "warning" : "success"} style={BadgePills}>{obj.video_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Буквы-слова</Label>
                            <Col sm={9}>
                              <Badge pill color={obj.leks_st === 'Пусто' ? "danger" : obj.leks_st === 'В процессе' ? "warning" : "success"} style={BadgePills}>{obj.leks_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Фразы</Label>
                            <Col sm={9}>
                              <Badge pill color={obj.phr_st === 'Пусто' ? "danger" : obj.phr_st === 'В процессе' ? "warning" : "success"} style={BadgePills}>{obj.phr_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Диалог</Label>
                            <Col sm={9}>
                              <Badge pill color={obj.dialog_st === 'Пусто' ? "danger" : obj.dialog_st === 'В процессе' ? "warning" : "success"} style={BadgePills}>{obj.dialog_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Правила</Label>
                            <Col sm={9}>
                              <Badge pill color={obj.rules_st === 'Пусто' ? "danger" : obj.rules_st === 'В процессе' ? "warning" : "success"} style={BadgePills}>{obj.rules_st}</Badge>
                            </Col>
                          </FormGroup>
                        </List>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "7%", marginLeft: "37%" }}>
          <a href="/new_block">
            <button style={{ padding: "2% 9% 2% 9%", backgroundColor: "#C4C4C4", color: "#000000", border: "none", borderRadius: "4px" }}>
              Добавить новый блок
            </button>
          </a>
        </div>
      </div>
    )
  }
}
