import 'bootstrap/dist/css/bootstrap.min.css';
import { React, Component } from 'react';
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link, Redirect } from 'react-router-dom';
import CustomNavbar from './Navbar';
import screen from '../static/icons/screen.svg';
import tasks from '../static/icons/tasks.svg';
import profile from '../static/icons/profile.svg';
import analytics from '../static/icons/analytics.svg';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import new_admin from '../static/icons/new_admin.svg';
import '../style.css';

const getBlocksUrl = 'https://api.unolingua.flareon.ru/lessonblocks/';
const getPhrasesUrl = 'https://api.unolingua.flareon.ru/showinfoaboutphrase/';
const getTypesUrl = 'https://api.unolingua.flareon.ru/typesex/';
const getLexemesUrl = 'https://api.unolingua.flareon.ru/lexemes/';
const getReplicasUrl = 'https://api.unolingua.flareon.ru/replicas/';
const getWordsLettersUrl = 'https://api.unolingua.flareon.ru/showinfoaboutwordsletters/';
const getRulesUrl = 'https://api.unolingua.flareon.ru/showinfoaboutrules';

const MenuContainer = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '150px'
}

const MenuItems = {
    border: "none",
    lineHeight: "45px"
}
export default class Menu extends Component {
    constructor() {
        super();
        this.state = {
            blocks: [],
            types_ex: [],
            lexemes: [],
            replicas: []
        }
    }

    componentDidMount() {
        fetch(getBlocksUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.length !== null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].lesson_info) {
                            for (var j = 0; j < data[i].lesson_info.length; j++) {
                                data[i].lesson_info[j].lesson = { lex: [], rules: [], phr: [], dialog: [] }
                            }
                        }
                    }
                }

                this.setState({ blocks: data });
            });
        fetch(getTypesUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    types_ex: data
                });
            });
        fetch(getReplicasUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    replicas: data
                });
            });
        fetch(getLexemesUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    lexemes: data
                });
            });
        setTimeout(this.getLessonsInfo, 2500);
    }

    getLessonsInfo = () => {
        fetch(getPhrasesUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let phrases = [];
                let dialogs = [];
                let num = [];
                for (var i = 0; i < data.length; i++) {
                    let type_ex = this.findTypeEx(data[i]);
                    switch (type_ex) {
                        case 4:
                            phrases[phrases.length] = {
                                id: phrases.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [this.findId(data[i].replica, "rep")]
                            };
                            break;
                        case 19:
                            num = this.findIdArrays(data[i].miss, "num");
                            phrases[phrases.length] = {
                                id: phrases.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [this.findId(data[i].replica, "rep")],
                                id_miss: num
                            };
                            break;
                        case 20:
                            let variant_split = data[i].variant.replaceAll(',', '').split(' ');
                            let variant = this.findIdArrays(variant_split, "lex");
                            num = this.findIdArrays(data[i].miss.replaceAll(',', '').split(' '), "num");
                            phrases[phrases.length] = {
                                id: phrases.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [this.findId(data[i].replica, "rep")],
                                id_var: variant,
                                id_miss: num
                            };
                            break;
                        case 21:
                            let id_rep = this.findId(data[i].replica, "lex");
                            dialogs[dialogs.length] = {
                                id: dialogs.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [id_rep],
                                //pic_video: data[i].pic_video
                            };
                            break;
                        case 22:
                            let replica_split = data[i].replica.split(';');
                            let reps = this.findIdArrays(replica_split, "rep");
                            let nums = this.findIdArrays(data[i].miss.replaceAll(',', '').split(' '), "num")
                            dialogs[dialogs.length] = {
                                id: dialogs.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: reps,
                                id_miss: nums
                            };
                            break;
                    }
                }
                let blocks = this.state.blocks;
                for (var i = 0; i < phrases.length; i++) {
                    let place = this.findLesLb(phrases[i].name_les);
                    let block = this.state.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.phr[lesson.phr.length] = phrases[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                for (var i = 0; i < dialogs.length; i++) {
                    let place = this.findLesLb(dialogs[i].name_les);
                    let block = this.state.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.dialog[lesson.dialog.length] = dialogs[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                this.setState({ blocks: blocks });
            });
        fetch(getWordsLettersUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                let lex = [];
                for (var i = 0; i < data.length; i++) {
                    let type_ex = this.findTypeEx(data[i]);
                    let id_lex = [];
                    id_lex.push(this.findId(data[i].mean_lex1, "lex"));
                    lex[lex.length] = {
                        id: i,
                        name_les: data[i].name_les,
                        type_ex: type_ex,
                        num_ex: parseInt(data[i].id_ex),
                        id_lex: id_lex
                    };
                    let lex_split = "";
                    switch (type_ex) {
                        case 2:
                            id_lex = [data[i].mean_lex1, data[i].mean_lex2];
                            id_lex = this.findIdArrays(id_lex, "lex");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_lex: id_lex };
                            break;
                        case 7:
                            lex_split = data[i].mean_lex1.replaceAll(',', '').split(' ');
                            id_lex = [lex_split[0], lex_split[4], lex_split[8], lex_split[12]];
                            id_lex = this.findIdArrays(id_lex, "lex");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_lex: id_lex };
                            break;
                        case 5:
                        case 15:
                            lex_split = data[i].variant.replaceAll(',', '').split(' ');
                            id_lex = this.findIdArrays(lex_split, "lex");
                            let nums = data[i].miss.replaceAll(',', '').split(' ');
                            nums = this.findIdArrays(nums, "num");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_var: id_lex, id_miss: nums };
                            break;
                        case 6:
                            lex_split = data[i].variant.replaceAll(',', '').split(' ');
                            id_lex = this.findIdArrays(lex_split, "lex");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_var: id_lex };
                            break;
                    }
                }
                let blocks = this.state.blocks;
                for (var i = 0; i < lex.length; i++) {
                    let place = this.findLesLb(lex[i].name_les);
                    let block = this.state.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.lex[lesson.lex.length] = lex[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                this.setState({ blocks: blocks });
            });
        fetch(getRulesUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                let rules = [];
                let type_ex = 0;
                let lex_split = null;
                let var_lex = null;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].mean_type_ex === 'правило') {
                        type_ex = 23;
                    }
                    else {
                        type_ex = this.findTypeEx(data[i]);
                    }
                    switch (type_ex) {
                        case 23:
                            lex_split = data[i].var_lex.split(',');
                            var_lex = this.findIdArrays(lex_split, "lex");
                            rules[rules.length] = {
                                id: i,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_var: var_lex,
                                side: data[i].side,
                                picture: data[i].picture,
                                sound_rule: data[i].sound_rule
                            };
                            break;
                        case 17:
                            lex_split = data[i].var_lex.split(',');
                            var_lex = this.findIdArrays(lex_split, "lex");
                            let id_lex = [];
                            id_lex.push(this.findId(data[i].mean_lex, "lex"));
                            rules[rules.length] = {
                                id: i,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_lex: id_lex,
                                id_var: var_lex,
                                picture: data[i].picture,
                                sound_rule: data[i].sound_rule
                            };
                            break;
                    }
                }
                //console.log(rules);
                let blocks = this.state.blocks;
                for (var i = 0; i < rules.length; i++) {
                    let place = this.findLesLb(rules[i].name_les);
                    let block = this.state.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.rules[lesson.rules.length] = rules[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                this.setState({ blocks: blocks });
                console.log(blocks);
            });
    }

    findLesLb = (name_les) => {
        for (var i = 0; i < this.state.blocks.length; i++) {
            for (var j = 0; j < this.state.blocks[i].lesson_info.length; j++) {
                if (name_les === this.state.blocks[i].lesson_info[j].name_les) {
                    return [i, j];
                }
            }
        }
    }

    findTypeEx = (ex) => {
        for (var i = 0; i < this.state.types_ex.length; i++) {
            if (this.state.types_ex[i].mean_type_ex === ex.mean_type_ex) {
                return this.state.types_ex[i].type_ex;
            }
        }
    }

    findId = (word, word_type) => {
        if (word_type === "lex") {
            for (var i = 0; i < this.state.lexemes.length; i++) {
                if (this.state.lexemes[i].mean_lex === word) {
                    return this.state.lexemes[i].id_lex;
                }
            }
        }
        else {
            if (word_type === "rep") {
                for (var i = 0; i < this.state.replicas.length; i++) {
                    if (this.state.replicas[i].lexeme.mean_lex + this.state.replicas[i].symbol === word) {
                        return this.state.replicas[i].id_rep;
                    }
                }
            }
            else {
                return 0
            }

        }

    }

    findIdArrays = (words, word_type) => {
        let id_words = [];
        if (word_type === "lex") {
            id_words.push(this.findId(words[0], "lex"));
            for (var i = 1; i < words.length; i++) {
                id_words.push(this.findId(words[i].replace(' ', ''), "lex"))
            }
            return id_words;
        }
        else {
            if (word_type === "rep") {
                id_words.push(this.findId(words[0], "rep"));
                for (var i = 1; i < words.length; i++) {
                    id_words.push(this.findId(words[i].replace(' ', ''), "rep"));
                }
                return id_words;
            }
            else {
                id_words.push(parseInt(words[0]));
                for (var i = 1; i < words.length; i++) {
                    id_words.push(parseInt(words[i].replace(' ', '')));
                }
                return id_words;
            }
        }

    }

    render() {
        return (
            <div>
                <header><CustomNavbar /></header>
                <div style={MenuContainer}>
                    <ListGroup style={{
                        border: "1px solid rgba(217, 244, 234, 0.4)",
                        borderRadius: "40px",
                        backgroundColor: "rgba(217, 244, 234, 1)",
                        fontSize: "20px"
                    }}>
                        <ListGroupItem
                            style={{
                                lineHeight: "45px",
                                backgroundColor: "rgba(217, 244, 234, 0.4)",
                                border: "1px solid rgba(217, 244, 234, 0.4)",
                                textAlign: "center"
                            }}>
                            Меню
                        </ListGroupItem>
                        <Link to={{
                            pathname: "/cabinet",
                            state: {
                                lexemes: this.state.lexemes,
                                replicas: this.state.replicas,
                                blocks: this.state.blocks
                            }
                        }}
                            style={{ textDecoration: 'none' }}>
                            <ListGroupItem
                                action
                                href="/cabinet"
                                tag="a"
                                style={MenuItems}>
                                <img src={tasks} alt="" />
                                Уроки
                            </ListGroupItem>
                        </Link>
                        {/*<ListGroupItem
                            action
                            href=""
                            tag="a"
                            style={MenuItems}>
                            <img src={screen} alt="" />
                            Банк экранов
                    </ListGroupItem>*/}
                        <Link to={{
                            pathname: "/editing",
                            state: {
                                lexemes: this.state.lexemes,
                                replicas: this.state.replicas,
                                blocks: this.state.blocks
                            }
                        }}
                            style={{ textDecoration: 'none' }}>
                            <ListGroupItem
                                action
                                href="/editing"
                                tag="a"
                                style={MenuItems}>
                                <img src={edit} alt="" />
                                Редактирование
                            </ListGroupItem>
                        </Link>
                        <ListGroupItem
                            action
                            href="/statistics"
                            tag="a"
                            style={MenuItems}>
                            <img src={analytics} alt="" />
                            Статистика
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/profile"
                            tag="a"
                            style={MenuItems}>
                            <img src={profile} alt="" />
                            Личные данные
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/history"
                            tag="a"
                            style={MenuItems}>
                            <img src={history} alt="" />
                            История изменений
                        </ListGroupItem>
                        <ListGroupItem
                            action
                            href="/new_admin"
                            tag="a"
                            style={MenuItems}>
                            <img src={new_admin} alt="" />
                            <span style={{ paddingRight: "20px" }}>
                                Новый администратор</span>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        )
    }
}
