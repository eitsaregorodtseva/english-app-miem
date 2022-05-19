import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Col, Input, Label } from 'reactstrap';
import '../../style.css';

export default function LessonName(props) {
    const [name_les, setName] = useState(props.name_les.les);

    useEffect(() => {
        setName(props.name_les.les);
    }, [props])

    useEffect(() => {
        props.name_les.les = name_les;
    })

    return (
        <div style={{ marginTop: "5%", marginBottom: "5%" }}>
            <div className="row">
                <Label sm={3}>Введите название:</Label>
                <Col sm={5}>
                    <Input type="text" name="name_les" value={name_les} 
                    placeholder="Название урока"
                    onChange={(e) => setName(e.target.value)} required></Input>
                </Col>
            </div>
        </div>)
}