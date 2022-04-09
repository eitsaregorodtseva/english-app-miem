import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { Button, Col, Form, Input, Label } from "reactstrap";
import '../style.css';

export default class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: { video_link: null },

        }
    }

    componentDidMount() {
        //console.log(this.props);
        //console.log("mounted");
        if (this.props.video.video_link) {
            let newVideo = { ...this.state.video, video_link: this.props.video.video_link };
            //console.log(newVideo);
            this.setState({ video: newVideo });
        }
        else {
            let newVideo = { ...this.state.video, video_link: null };
            //console.log(newVideo);
            this.setState({ video: newVideo });
        }
        //prevProps = { ...this.state.video, video_link: this.props.video.video_link };
        //console.log(this.props);
        //console.log(this.props.video.video_link);
    }
    /*componentDidUpdate(prevProps, prevState) {
        //console.log(this.props.video.video_link);
        //console.log(prevState.video.video_link);
        if (this.props.video.video_link !== prevState.video.video_link ) {
            let newVideo = { video_link: null }; 
            if (this.props.video.video_link) {
                newVideo = { video_link: this.props.video.video_link };
            }
            //console.log(prevState);
            //console.log(this.props.video);
            
            this.setState({
                video: newVideo
            });
            console.log(newVideo);
            this.forceUpdate();
            /*return fetchData({
                newVideo : { video_link: this.props.video.video_link }
            }).then(newVideo => {
                    this.setState({
                    video: newVideo
                });
            });
        }
        //console.log("video:");
        //console.log(this.props);
        //this.setState({ video: this.props.video });
    }*/
    
    handleChange = (event) => {
        let newVideo = { ...this.state.video, video_link: event.target.value };
        /*console.log(newVideo);
        let video = this.state.video;
        video[newVideo.id] = newVideo;
        console.log(video);
        this.setState({
            current_video: newVideo,
            video: video,
            [event.target.name]: event.target.value
        });*/
        //let video = event.target.value;
        this.setState({
            video: newVideo,
        });
        this.passPropsToParent();
    }

    /*addNewVideo() {
        let newVideo = { id: this.state.video.length, video_link: ""};
        let video = this.state.video;
        video[newVideo.id] = newVideo;
        this.setState({
            video: video,
        });
        this.passPropsToParent();
    }*/

    /*showCurrentVideo(id) {
        this.setState({
            current_video: this.state.video[id],
            video_link: this.state.video[id].video_link,
        });
        this.passPropsToParent();
    }*/

    /*deleteElement = (id) => {
        let video = this.state.video;
        video.splice(id, 1);
        for (var i = 0; i < video.length; i++) {
            video[i].id = i;
        }
        let newVideo = { id: null, video_link: "" };
        this.setState({
            video: video,
            current_video: newVideo,
        });
        this.passPropsToParent();
    }*/

    passPropsToParent() {
        this.props.parentCallback(this.state.video);
    }


    render() {
        return (
            <div class="row" style={{ marginTop: "3%", marginBottom: "3%" }}>
                {/*<div class="col-sm-3" style={{ marginTop: "1%", overflowY: "scroll", minHeight: "5px", height: "300px" }}>
                    <Col sm={10}>
                        <Button style={{ width: "190px" }} onClick={() => this.addNewVideo()}>Добавить</Button>
                        {this.state.video.map((obj, i) =>
                            <Button key={i} style={{ width: "190px" }} color={this.state.current_video.id === i ? "primary" : "secondary"} onClick={() => this.showCurrentVideo(i)}>Видео {i + 1}</Button>)}
                    </Col>
                        </div>*/}
                {/*{this.state.video.length === 0 || this.state.current_video.id === null ? <div></div> :
                    <div class="col" style={{ marginTop: "1%" }}>
                <Button color="danger" onClick={() => this.deleteElement(this.state.current_video.id)}>Удалить</Button>*/}
                <Form>
                    <Label>Ссылка на видео:</Label>
                    <Input type="textarea" rows="3" name="video_link" value={this.state.video.video_link} onChange={this.handleChange}></Input>
                </Form>
                {/*</div>}*/}
            </div>)
    }
}