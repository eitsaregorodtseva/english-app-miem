import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { FormGroup, Badge, Col, List, Label, Spinner } from "reactstrap";
import { Link, Redirect } from 'react-router-dom';
import CustomNavbar from './Navbar';
import Editing from './Editing';
import '../style.css';
import axios from 'axios';

const BadgePills = {
  padding: "1% 5% 1% 5%"
}
const statuses = ["Пусто     ", "В процессе", "Не требуется", "Готово"];
const getBlocksUrl = 'http://172.18.130.45:5052/api/lessonblocks/';

export default class Cabinet extends Component {
  constructor() {
    super();
    this.state = {
      blocks: null
    }
    this.getBlocks = this.getBlocks.bind(this);
  };

  componentDidMount() {
    fetch(getBlocksUrl)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          blocks: data
        });
      })
    this.intervalGetBlocks = setInterval(this.getBlocks, 5000);
  }

  async getBlocks() {
    const response = await fetch(getBlocksUrl);
    const blocks = await response.json();
    console.log(blocks);
    this.setState({
      blocks: blocks
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalGetBlocks);
  };

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
          {this.state.blocks === null ? 
          <div class="CenterContainer"><Spinner color="secondary"/></div> : this.state.blocks.map((obj_b, i) => (
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseArea" aria-expanded="false" aria-controls="collapseArea">
                  Блок {obj_b.id_lb}
                </button>
              </h2>
              <div id="collapseArea" class="accordion-collapse collapse" aria-labelledby="heading" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  {obj_b.lesson_info.map((obj_l, j) => (
                    <div class="LessonDiv">
                      <button disabled class="GreyBox">Урок {obj_l.id_les}: {obj_l.name_les}</button>
                      <div style={{ marginTop: "5%" }}>
                        <Link to={{
                          pathname: "/editing",
                          state: { id_lb: obj_b.id_lb, id_les: obj_l.id_les, blocks: this.state.blocks }
                        }}>
                          <button type="button" class="EditLesson">
                            Редактировать урок</button></Link>
                        <button class="ViewLesson">Предпросмотр</button>
                      </div>
                      <div style={{ marginTop: "5%" }}>
                        <List>
                          <FormGroup row>
                            <Label sm={3}>Видео</Label>
                            <Col sm={9}>
                              <Badge pill color={obj_l.video_st === statuses[0] ? "danger" : obj_l.video_st === statuses[1] ? "warning" : obj_l.video_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj_l.video_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Буквы-слова</Label>
                            <Col sm={9}>
                              <Badge pill color={obj_l.lex_st === statuses[0] ? "danger" : obj_l.lex_st === statuses[1] ? "warning" : obj_l.lex_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj_l.lex_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Правила</Label>
                            <Col sm={9}>
                              <Badge pill color={obj_l.rules_st === statuses[0] ? "danger" : obj_l.rules_st === statuses[1] ? "warning" : obj_l.rules_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj_l.rules_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Фразы</Label>
                            <Col sm={9}>
                              <Badge pill color={obj_l.phr_st === statuses[0] ? "danger" : obj_l.phr_st === statuses[1] ? "warning" : obj_l.phr_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj_l.phr_st}</Badge>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label sm={3}>Диалоги</Label>
                            <Col sm={9}>
                              <Badge pill color={obj_l.dialog_st === statuses[0] ? "danger" : obj_l.dialog_st === statuses[1] ? "warning" : obj_l.dialog_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj_l.dialog_st}</Badge>
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
