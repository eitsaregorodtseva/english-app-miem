import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useEffect, useState } from "react";
import { Col, Input, Label } from "reactstrap";
import Videos from './Videos';
import Vocabulary from './Vocabulary';
import Phrases from './Phrases';
import Rules from './Rules';
import Dialogs from './Dialogs';
import Statuses from './Statuses';
import '../style.css';

export default class Lesson extends Component {
    constructor(props) {
        super();
        this.state = {
            lexemes: [],
            replicas: [],
            videos: [],
            name_les: "",
            lesson: {lex: [],
                phr: [],
                dialog: [],
                rules: []},
            video: { video_link: null },
            statuses: {},
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            lesson: this.props.lesson,
            statuses: this.props.statuses,
            lexemes: this.props.lexemes,
            replicas: this.props.replicas,
            videos: this.props.videos,
            name_les: this.props.name_les,
            videos: this.props.videos,
            video: this.props.video
        });
    }

    componentDidUpdate() {
        console.log(this.props);
    }
    /*const [lesson, setLesson] = useState(props.lesson);
    const [statuses, setStatuses] = useState(props.statuses);
    const [name_les, setNameLes] = useState(props.name_les);
    const [lexemes, setLexemes] = useState(props.lexemes);
    const [replicas, setReplicas] = useState(props.replicas);
    const [videos, setVideos] = useState(props.videos);
    const [video, setVideo] = useState(props.video);

    useEffect(() => {
        setLesson(props.lesson);
        setStatuses(props.statuses);
        setNameLes(props.name_les);
        setLexemes(props.lexemes);
        setReplicas(props.replicas);
        setVideos(props.videos);
        setVideo(props.video);
    }, [props])*/

    handleCallbackVoc = (props) => {
        console.log(props);
        let newLesson = this.state.lesson;
        newLesson.lex = props;
        this.setState({ lesson: newLesson });
    }

    /*handleCallbackPhr = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].phr = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackDialog = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].dialog = props;
        this.setState({ lesson: newLesson });
    }

    handleCallbackRule = (props) => {
        let newLesson = this.state.lesson;
        newLesson[0].rules = props;
        this.setState({ lesson: newLesson });
    }*/
    render() {
        return (
            <div>
                <div style={{ marginTop: "7%" }}>
                    <button disabled className="GreyBox">Урок 1</button>
                    <div style={{ marginTop: "5%", marginBottom: "5%" }}>
                        <div className="row">
                            <Label sm={2}>Название урока:</Label>
                            <Col sm={4}>
                                <Input type="text" name="name_les" value={this.state.name_les} /*onChange={(e) => setNameLes(e.target.name)}*/ required></Input>
                            </Col>
                        </div>
                    </div>
                    <div style={{ marginTop: "5%", marginLeft: "3%", width: "90%" }} >
                        <nav>
                            <div className="nav nav-pills" id="myTab" role="tablist">
                                <button className="nav-link active" id="video-tab" data-bs-toggle="tab" data-bs-target="#video" type="button" role="tab" aria-controls="video" aria-selected="true">Видео</button>
                                <button className="nav-link" id="letter-tab" data-bs-toggle="tab" data-bs-target="#letter" type="button" role="tab" aria-controls="letter" aria-selected="false">Буквы-слова</button>
                                <button className="nav-link" id="rule-tab" data-bs-toggle="tab" data-bs-target="#rule" type="button" role="tab" aria-controls="rule" aria-selected="false">Правила</button>
                                <button className="nav-link" id="phrase-tab" data-bs-toggle="tab" data-bs-target="#phrase" type="button" role="tab" aria-controls="phrase" aria-selected="false">Фразы</button>
                                <button className="nav-link" id="dialog-tab" data-bs-toggle="tab" data-bs-target="#dialog" type="button" role="tab" aria-controls="dialog" aria-selected="false">Диалоги</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="myTabContent" style={{ display: 'flex', flexDirection: 'column' }} >
                            <div className="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                                <Videos video={this.state.video} videos={this.state.videos} />
                            </div>
                            <div className="tab-pane fade" id="letter" role="tabpanel" aria-labelledby="letter-tab">
                                <Vocabulary lex={Object.assign(this.state.lesson.lex)} lexemes={this.state.lexemes} parentCallback={this.handleCallbackVoc} />
                            </div>
                            <div className="tab-pane fade" id="rule" role="tabpanel" aria-labelledby="rule-tab">
                                <Rules rule={Object.assign(this.state.lesson.rules)} lexemes={this.state.lexemes} /*parentCallback={this.handleCallbackRule}*/ />
                            </div>
                            <div className="tab-pane fade" id="phrase" role="tabpanel" aria-labelledby="phrase-tab">
                                <Phrases phr={Object.assign(this.state.lesson.phr)} lexemes={this.state.lexemes} replicas={this.state.replicas} /*parentCallback={this.handleCallbackPhr}*/ />
                            </div>
                            <div className="tab-pane fade" id="dialog" role="tabpanel" aria-labelledby="dialog-tab">
                                <Dialogs dialog={Object.assign(this.state.lesson.dialog)} lexemes={this.state.lexemes} replicas={this.state.replicas} /*parentCallback={this.handleCallbackDialog}*/ />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <button disabled className="GreyBox">Статусы</button>
                    <div style={{ marginTop: "5%", marginLeft: "25%" }}>
                        <Statuses statuses={this.state.statuses} />
                    </div>
                </div>
            </div>
        )
    }
}