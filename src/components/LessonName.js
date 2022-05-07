import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Col, Input, Label } from 'reactstrap';
import '../style.css';

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
                <Label sm={2}>Название урока:</Label>
                <Col sm={4}>
                    <Input type="text" name="name_les" value={name_les} onChange={(e) => setName(e.target.value)} required></Input>
                </Col>
            </div>
        </div>)
}