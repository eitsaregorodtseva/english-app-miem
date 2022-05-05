import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { React, Component } from 'react';
import { Spinner } from "reactstrap";
import { Link } from 'react-router-dom';
import CustomNavbar from './Navbar';
import Accordion from './Accordion';
import '../style.css';

export default class Cabinet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      lexemes: [],
      replicas: [],
      videos: []
    }
  }

  componentDidMount() {
    this.setState({
      blocks: this.props.location.state.blocks,
      lexemes: this.props.location.state.lexemes,
      replicas: this.props.location.state.replicas,
      videos: this.props.location.state.videos
    });
  }

  render() {
    return (
      <div class="Container">
        <header><CustomNavbar /></header>
        <div style={{ marginTop: "100px" }}>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/menu">Меню</a></li>
              <li class="breadcrumb-item active" aria-current="page">Уроки</li>
            </ol>
          </nav>
        </div>
        {this.state.blocks === null ?
          <div class="CenterContainer"><Spinner color="secondary" /></div> :
          <div class="accordion" style={{ marginTop: "5%" }}>
            {this.state.blocks.map((obj, i) => (
              <Accordion key={i}
                header={obj.id_lb}
                content={obj.lesson_info}
                blocks={this.state.blocks}
                lexemes={this.state.lexemes}
                replicas={this.state.replicas}
                videos={this.state.videos} />
            ))}
          </div>
        }
        {this.state.blocks === null ? <div></div> :
          <div style={{ marginTop: "5%", marginLeft: "35%" }}>
            <Link to={{
              pathname: "/new_block",
              state: {
                lexemes: this.state.lexemes,
                replicas: this.state.replicas,
                blocks: this.state.blocks,
                videos: this.state.videos
              }
            }}
              style={{ textDecoration: 'none' }}>
              <button style={{ padding: "2% 9% 2% 9%", backgroundColor: "#C4C4C4", color: "#000000", border: "none", borderRadius: "4px" }}>
                Новый блок
              </button>
            </Link>
          </div>
        }
      </div >
    )
  }
}
