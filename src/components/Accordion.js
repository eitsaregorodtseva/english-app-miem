import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { FormGroup, Badge, Col, List, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import '../style.css';

const statuses = ["Пусто     ", "В процессе", "Готов     "];

const BadgePills = {
    padding: "1% 5% 1% 5%"
}

const Accordion = ({ header, content, blocks, lexemes, replicas }) => {
    const [isActive, setActive] = useState(false);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button class="accordion-button collapsed" type="button" onClick={() => setActive(!isActive)}>
                    Блок {header}
                </button>
            </h2>
            {isActive && <div className="accordion-content">
                {content.map((obj) => (
                    <div class="LessonDiv">
                        <button disabled class="GreyBox">Урок {obj.id_les}: {obj.name_les}</button>
                        <div style={{ marginTop: "5%" }}>
                            <Link to={{
                                pathname: "/editing", state: {
                                    id_lb: header,
                                    id_les: obj.id_les,
                                    blocks: blocks,
                                    lexemes: lexemes,
                                    replicas: replicas
                                }
                            }}>
                                <button type="button" class="EditLesson">Редактировать урок</button>
                            </Link>
                            <button class="ViewLesson">Просмотр</button>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            <List>
                                <FormGroup row>
                                    <Label sm={3}>Видео</Label>
                                    <Col sm={9}>
                                        <Badge pill color={obj.video_st === statuses[0] ? "danger" : obj.video_st === statuses[1] ? "warning" : obj.video_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.video_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Буквы-слова</Label>
                                    <Col sm={9}>
                                        <Badge pill color={obj.lex_st === statuses[0] ? "danger" : obj.lex_st === statuses[1] ? "warning" : obj.lex_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.lex_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Правила</Label>
                                    <Col sm={9}>
                                        <Badge pill color={obj.rules_st === statuses[0] ? "danger" : obj.rules_st === statuses[1] ? "warning" : obj.rules_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.rules_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Фразы</Label>
                                    <Col sm={9}>
                                        <Badge pill color={obj.phr_st === statuses[0] ? "danger" : obj.phr_st === statuses[1] ? "warning" : obj.phr_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.phr_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Диалоги</Label>
                                    <Col sm={9}>
                                        <Badge pill color={obj.dialog_st === statuses[0] ? "danger" : obj.dialog_st === statuses[1] ? "warning" : obj.dialog_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.dialog_st}</Badge>
                                    </Col>
                                </FormGroup>
                            </List>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
};
export default Accordion;
