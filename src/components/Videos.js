import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Form, Input, Label } from "reactstrap";
import '../style.css';

export default function Videos(props) {
    const [video_link, setVideo] = useState(props.video.video_link);

    useEffect(() => {
        setVideo(props.video.video_link);
    }, [props])

    useEffect(() => {
        props.video.video_link = video_link;
    })

    return (
        <div class="row" style={{ marginTop: "3%", marginBottom: "3%" }}>
            <Form>
                <Label>Ссылка на видео:</Label>
                <Input type="textarea" rows="3" key={video_link} name="video_link" value={video_link} onChange={(e) => setVideo(e.target.value)}/*onChange={this.handleChange}*/></Input>
            </Form>
        </div>)
}
