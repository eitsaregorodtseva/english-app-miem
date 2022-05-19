import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { Button, FormGroup, Badge, Col, List, Label } from "reactstrap";
import { Link } from 'react-router-dom';
import '../../style.css';

const statuses = ["Пусто     ", "В процессе", "Готов     "];

const BadgePills = {
    padding: "1% 5% 1% 5%"
}

const Accordion = ({ header, content, blocks, lexemes, replicas, videos }) => {
    const [isActive, setActive] = useState(false);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button class="accordion-button collapsed" onClick={() => setActive(!isActive)}>
                    Блок {header}
                </button>
            </h2>
            {isActive && <div className="accordion-content">
                {content.map((obj) => (
                    <div className="LessonDiv">
                        <h5>Урок {obj.id_les}: {obj.name_les}</h5>
                        <div style={{ marginTop: "5%" }}>
                            <Link to={{
                                pathname: "/editing", state: {
                                    id_lb: header,
                                    id_les: obj.id_les,
                                    blocks: blocks,
                                    lexemes: lexemes,
                                    replicas: replicas,
                                    videos: videos
                                }}}
                                style={{ textDecoration: 'none' }}>
                                <Button outline color="primary" block>Редактировать</Button>
                            </Link>
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            <List>
                                <FormGroup row>
                                    <Label sm={2}>Видео</Label>
                                    <Col sm={7}>
                                        <Badge pill color={obj.video_st === statuses[0] ? "danger" : obj.video_st === statuses[1] ? "warning" : obj.video_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.video_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Буквы-слова</Label>
                                    <Col sm={7}>
                                        <Badge pill color={obj.lex_st === statuses[0] ? "danger" : obj.lex_st === statuses[1] ? "warning" : obj.lex_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.lex_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Правила</Label>
                                    <Col sm={7}>
                                        <Badge pill color={obj.rules_st === statuses[0] ? "danger" : obj.rules_st === statuses[1] ? "warning" : obj.rules_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.rules_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Фразы</Label>
                                    <Col sm={7}>
                                        <Badge pill color={obj.phr_st === statuses[0] ? "danger" : obj.phr_st === statuses[1] ? "warning" : obj.phr_st === statuses[2] ? "secondary" : "success"} style={BadgePills}>{obj.phr_st}</Badge>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Диалоги</Label>
                                    <Col sm={7}>
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
