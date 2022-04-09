import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import '../style.css';

const status = ["Пусто     ", "В процессе", "Не требуется", "Готово"];

export default function Statuses(props) {
    const [video_st, setVideoStatus] = useState(props.statuses.video_st);
    const [lex_st, setLexStatus] = useState(props.statuses.lex_st);
    const [phr_st, setPhrStatus] = useState(props.statuses.phr_st);
    const [dialog_st, setDialogStatus] = useState(props.statuses.dialog_st);
    const [rules_st, setRulesStatus] = useState(props.statuses.rules_st);

    useEffect(() => {
        props.statuses.video_st = video_st;
        props.statuses.lex_st = lex_st;
        props.statuses.phr_st = phr_st;
        props.statuses.dialog_st = dialog_st;
        props.statuses.rules_st = rules_st;
    });

    return (
        <Form>
            <FormGroup row>
                <Label sm={3}>Видео</Label>
                <Col sm={3}>
                    <Input type="select" data-key="video_st" value={status.indexOf(video_st)} onChange={(e) => setVideoStatus(status[e.target.value])}>
                        <option>Выберите статус</option>
                        {status.map((obj, i) =>
                            <option value={i} key={i}>{status[i]}</option>
                        )}
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                    <Label sm={3}>Буквы-слова</Label>
                    <Col sm={3}>
                        <Input type="select" data-key="lex_st" value={status.indexOf(lex_st)} onChange={(e) => setLexStatus(status[e.target.value])}>
                            <option>Выберите статус</option>
                            {status.map((obj, i) =>
                                <option value={i} key={i}>{status[i]}</option>
                            )}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Правила</Label>
                    <Col sm={3}>
                        <Input type="select" data-key="rules_st" value={status.indexOf(rules_st)} onChange={(e) => setRulesStatus(status[e.target.value])}>
                            <option>Выберите статус</option>
                            {status.map((obj, i) =>
                                <option value={i} key={i}>{status[i]}</option>
                            )}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Фразы</Label>
                    <Col sm={3}>
                        <Input type="select" data-key="phr_st" value={status.indexOf(phr_st)} onChange={(e) => setPhrStatus(status[e.target.value])}>
                            <option>Выберите статус</option>
                            {status.map((obj, i) =>
                                <option value={i} key={i}>{status[i]}</option>
                            )}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Диалоги</Label>
                    <Col sm={3}>
                        <Input type="select" data-key="dialog_st" value={status.indexOf(dialog_st)} onChange={(e) => setDialogStatus(status[e.target.value])}>
                            <option>Выберите статус</option>
                            {status.map((obj, i) =>
                                <option value={i} key={i}>{status[i]}</option>
                            )}
                        </Input>
                    </Col>
                </FormGroup>
        </Form>
    )
}
