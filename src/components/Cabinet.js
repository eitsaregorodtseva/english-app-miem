import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component, useState, useEffect } from 'react';
import { FormGroup, Badge, Col, List, Label, Spinner } from "reactstrap";
import { Link, Redirect } from 'react-router-dom';
import CustomNavbar from './Navbar';
import Editing from './Editing';
import Accordion from './Accordion';
import '../style.css';
import axios from 'axios';


export default class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      lexemes: [],
      replicas: []
    }
  }
  /*const [blocks, setBlocks] = useState(props.location.state.blocks);
  const [lexemes, setLexemes] = useState(props.location.state.lexemes);
  const [replicas, setReplicas] = useState(props.location.state.replicas);

  useEffect(() => {
    console.log(blocks);
    console.log(typeof (blocks));
  })*/

  componentDidMount() {
    console.log(this.props);
    this.setState({
      blocks: this.props.location.state.blocks,
      lexemes: this.props.location.state.lexemes,
      replicas: this.props.location.state.replicas
    });
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
        {this.state.blocks === null ?
          <div class="CenterContainer"><Spinner color="secondary" /></div> :
          <div class="accordion" style={{marginTop: "5%"}}>
            {this.state.blocks.map((obj, i) => (
              <Accordion header={obj.id_lb}
                content={obj.lesson_info}
                blocks={this.state.blocks}
                lexemes={this.state.lexemes}
                replicas={this.state.replicas} />
              /*<div className="accordion-item">
                <h2 className="accordion-header">
                  <button class="accordion-button collapsed" type="button" onClick={() => setActive(!isActive)}>
                    Блок {obj_b.id_lb}
                  </button>
                </h2>
                {isActive && <div className="accordion-content">
                  {obj_b.lesson_info.map((obj_l, j) => (
                    <div class="LessonDiv">
                      <button disabled class="GreyBox">Урок {obj_l.id_les}: {obj_l.name_les}</button>
                      <div style={{ marginTop: "5%" }}>
                        <Link to={{
                          pathname: "/editing", state: {
                            id_lb: obj_b.id_lb,
                            id_les: obj_l.id_les,
                            blocks: this.state.blocks,
                            lexemes: this.state.lexemes,
                            replicas: this.state.replicas
                          }
                        }} >
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
                }
              </div>*/
            ))}</div>
        }
        {this.state.blocks === null ? <div></div> :
          <div style={{ marginTop: "7%", marginLeft: "37%" }}>
            <a href="/new_block">
              <Link to={{
                pathname: "/new_block",
                state: {
                  lexemes: this.state.lexemes,
                  replicas: this.state.replicas,
                  blocks: this.state.blocks
                }
              }}
                style={{ textDecoration: 'none' }}>
                <button style={{ padding: "2% 9% 2% 9%", backgroundColor: "#C4C4C4", color: "#000000", border: "none", borderRadius: "4px" }}>
                  Добавить новый блок
                </button></Link>
            </a>
          </div>
        }
      </div >
    )
  }


}
