import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import { Col } from "reactstrap";
import Select from 'react-select';
import '../style.css';

export default function Videos(props) {
    const [id_video, setVideo] = useState(props.video.id_video);
    const [videos, setVideos] = useState(props.videos);

    useEffect(() => {
        setVideo(props.video.id_video);
        setVideos(props.videos);
    }, [props])

    useEffect(() => {
        props.video.id_video = id_video;
    })

    return (
        <div class="row StructureFields" style={{ marginTop: "3%", marginBottom: "3%" }}>
                <Col sm={7}>
                    <Select
                        options={videos}
                        name="colors"
                        value={videos.filter(video => video.value === id_video)}
                        className="basic-single"
                        classNamePrefix="select"
                        onChange={(e) => setVideo(e.value)}
                        placeholder="Выберите видео"
                    />
                </Col>
        </div>)
}
