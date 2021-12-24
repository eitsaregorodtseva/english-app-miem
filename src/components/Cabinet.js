import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { FormGroup, Breadcrumb, BreadcrumbItem, Button, Badge, Col, List, Label } from "reactstrap";
import CustomNavbar from './Navbar';
import '../style.css';

const BadgePills = {
  padding: "1% 5% 1% 5%"
}
const GreyBox = {
    width: "94%",
    padding: "1% 7% 1% 7%",
    backgroundColor: "#C4C4C4",
    color: "#000000",
    border: "none"
}
const EditLesson = {
  backgroundColor: "rgba(235, 87, 87, 0.5)",
  color: "#000000",
  border: "none",
  padding: "1% 5% 1% 5%"
}
const ViewLesson = {
  marginLeft: "10%",
  backgroundColor: "rgba(45, 156, 219, 0.48)",
  color: "#000000",
  border: "none",
  padding: "1% 5% 1% 5%"
}
const LessonDiv = {
  marginLeft: "3%",
  marginTop: "3%",
  marginBottom: "5%"
}

export default class Cabinet extends Component {

  render() {
    return (
      <div class="Container">
        <header><CustomNavbar /></header>
        <div style={{ marginTop: "10%" }}>
          <Breadcrumb listTag="div">
            <BreadcrumbItem
              href="/menu"
              tag="a">
              Меню
            </BreadcrumbItem>
            <BreadcrumbItem
              active
              tag="span">
              Уроки
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="accordion" id="accordion" style={{ marginTop: "5%" }}>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Блок 1
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div style={LessonDiv}>
                  <Button disabled style={GreyBox}>Урок 1</Button>
                  <div style={{ marginTop: "5%" }}>
                    <Button style={EditLesson}>Редактировать урок</Button>
                    <Button style={ViewLesson}>Предпросмотр</Button>
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    <List>
                      <FormGroup row>
                        <Label sm={3}>Видео</Label>
                        <Col sm={9}>
                          <Badge pill color="warning" style={BadgePills}>В процессе</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Буквы-слова</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Фразы</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Диалог</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Правила</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                    </List>
                  </div>
                </div>
                <div style={LessonDiv}>
                  <Button disabled style={GreyBox}>Урок 2</Button>
                  <div style={{ marginTop: "5%" }}>
                    <Button style={EditLesson}>Редактировать урок</Button>
                    <Button style={ViewLesson}>Предпросмотр</Button>
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    <List>
                      <FormGroup row>
                        <Label sm={3}>Видео</Label>
                        <Col sm={9}>
                          <Badge pill color="warning" style={BadgePills}>В процессе</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Буквы-слова</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Фразы</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Диалог</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Правила</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Блок 2
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div style={LessonDiv}>
                  <Button disabled style={GreyBox}>Урок 1</Button>
                  <div style={{ marginTop: "5%" }}>
                    <Button style={EditLesson}>Редактировать урок</Button>
                    <Button style={ViewLesson}>Предпросмотр</Button>
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    <List>
                      <FormGroup row>
                        <Label sm={3}>Видео</Label>
                        <Col sm={9}>
                          <Badge pill color="warning" style={BadgePills}>В процессе</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Буквы-слова</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Фразы</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Диалог</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Правила</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                    </List>
                  </div>
                </div>
                <div style={LessonDiv}>
                  <Button disabled style={GreyBox}>Урок 2</Button>
                  <div style={{ marginTop: "5%" }}>
                    <Button style={EditLesson}>Редактировать урок</Button>
                    <Button style={ViewLesson}>Предпросмотр</Button>
                  </div>
                  <div style={{ marginTop: "5%" }}>
                    <List>
                      <FormGroup row>
                        <Label sm={3}>Видео</Label>
                        <Col sm={9}>
                          <Badge pill color="warning" style={BadgePills}>В процессе</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Буквы-слова</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Фразы</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Диалог</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label sm={3}>Правила</Label>
                        <Col sm={9}>
                          <Badge pill color="danger" style={BadgePills}>Пусто</Badge>
                        </Col>
                      </FormGroup>
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "7%", marginLeft: "37%" }}>
          <Button href="/new_block" style={{ padding: "2% 9% 2% 9%", backgroundColor: "#C4C4C4", color: "#000000", border: "none" }}>
            Добавить новый блок
          </Button>
        </div>
      </div>
    )
  }
}
