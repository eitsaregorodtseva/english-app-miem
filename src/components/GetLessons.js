import { useState } from "react";

const getPhrasesUrl = 'https://api.unolingua.flareon.ru/showinfoaboutphrase/';
const getWordsLettersUrl = 'https://api.unolingua.flareon.ru/showinfoaboutwordsletters/';
const getRulesUrl = 'https://api.unolingua.flareon.ru/showinfoaboutrules';

export const GetLessons = (props) => {
    const [blocks, setBlocks] = useState("");
    const [flag, setFlag] = useState(false);

    const GetLessonsInfo = () => {
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
                    let type_ex = findTypeEx(data[i]);
                    switch (type_ex) {
                        case 4:
                            phrases[phrases.length] = {
                                id: phrases.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [findId(data[i].replica, "rep")]
                            };
                            break;
                        case 19:
                            num = findIdArrays(data[i].miss, "num");
                            phrases[phrases.length] = {
                                id: phrases.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [findId(data[i].replica, "rep")],
                                id_miss: num
                            };
                            break;
                        case 20:
                            let variant_split = data[i].variant.replaceAll(',', '').split(' ');
                            let variant = findIdArrays(variant_split, "lex");
                            num = findIdArrays(data[i].miss.replaceAll(',', '').split(' '), "num");
                            phrases[phrases.length] = {
                                id: phrases.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [findId(data[i].replica, "rep")],
                                id_var: variant,
                                id_miss: num
                            };
                            break;
                        case 21:
                            let id_rep = findId(data[i].replica, "lex");
                            dialogs[dialogs.length] = {
                                id: dialogs.length,
                                name_les: data[i].name_les,
                                type_ex: type_ex,
                                num_ex: parseInt(data[i].id_ex),
                                id_rep: [id_rep]
                            };
                            break;
                        case 22:
                            let replica_split = data[i].replica.split(';');
                            let reps = findIdArrays(replica_split, "rep");
                            let nums = findIdArrays(data[i].miss.replaceAll(',', '').split(' '), "num")
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
                let blocks = props.blocks;
                for (var i = 0; i < phrases.length; i++) {
                    let place = findLesLb(phrases[i].name_les);
                    let block = props.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.phr[lesson.phr.length] = phrases[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                for (var i = 0; i < blocks.length; i++) {
                    for (var j = 0; j < blocks[i].lesson_info.length; j++) {
                        for (var k = 0; k < blocks[i].lesson_info[j].lesson.phr.length; k++) {
                            blocks[i].lesson_info[j].lesson.phr[k].id = k;
                        } 
                    }
                }
                for (var i = 0; i < dialogs.length; i++) {
                    let place = findLesLb(dialogs[i].name_les);
                    let block = props.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.dialog[lesson.dialog.length] = dialogs[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }for (var i = 0; i < blocks.length; i++) {
                    for (var j = 0; j < blocks[i].lesson_info.length; j++) {
                        for (var k = 0; k < blocks[i].lesson_info[j].lesson.dialog.length; k++) {
                            blocks[i].lesson_info[j].lesson.dialog[k].id = k;
                        } 
                    }
                }
                setBlocks(blocks);
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
                    let type_ex = findTypeEx(data[i]);
                    let id_lex = [];
                    id_lex.push(findId(data[i].mean_lex1, "lex"));
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
                            id_lex = findIdArrays(id_lex, "lex");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_lex: id_lex };
                            break;
                        case 7:
                            lex_split = data[i].mean_lex1.replaceAll(',', '').split(' ');
                            id_lex = [lex_split[0], lex_split[4], lex_split[8], lex_split[12]];
                            id_lex = findIdArrays(id_lex, "lex");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_lex: id_lex };
                            break;
                        case 5:
                        case 15:
                            lex_split = data[i].variant.replaceAll(',', '').split(' ');
                            id_lex = findIdArrays(lex_split, "lex");
                            let nums = data[i].miss.replaceAll(',', '').split(' ');
                            nums = findIdArrays(nums, "num");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_var: id_lex, id_miss: nums };
                            break;
                        case 6:
                            lex_split = data[i].variant.replaceAll(',', '').split(' ');
                            id_lex = findIdArrays(lex_split, "lex");
                            lex[lex.length - 1] = { ...lex[lex.length - 1], id_var: id_lex };
                            break;
                    }
                }
                let blocks = props.blocks;
                for (var i = 0; i < lex.length; i++) {
                    let place = findLesLb(lex[i].name_les);
                    let block = props.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.lex[lesson.lex.length] = lex[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                for (var i = 0; i < blocks.length; i++) {
                    for (var j = 0; j < blocks[i].lesson_info.length; j++) {
                        for (var k = 0; k < blocks[i].lesson_info[j].lesson.lex.length; k++) {
                            blocks[i].lesson_info[j].lesson.lex[k].id = k;
                        } 
                    }
                }
                setBlocks(blocks);
            });
        fetch(getRulesUrl)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let rules = [];
                let type_ex = 0;
                let lex_split = null;
                let var_lex = null;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].mean_type_ex === 'правило') {
                        type_ex = 23;
                    }
                    else {
                        type_ex = findTypeEx(data[i]);
                    }
                    switch (type_ex) {
                        case 23:
                            lex_split = data[i].var_lex.split(',');
                            var_lex = findIdArrays(lex_split, "lex");
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
                            var_lex = findIdArrays(lex_split, "lex");
                            let id_lex = [];
                            id_lex.push(findId(data[i].mean_lex, "lex"));
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
                let blocks = props.blocks;
                for (var i = 0; i < rules.length; i++) {
                    let place = findLesLb(rules[i].name_les);
                    let block = props.blocks[place[0]];
                    let lesson = block.lesson_info[place[1]].lesson;
                    lesson.rules[lesson.rules.length] = rules[i];
                    block.lesson_info[place[1]].lesson = lesson;
                    blocks[place[0]] = block;
                }
                for (var i = 0; i < blocks.length; i++) {
                    for (var j = 0; j < blocks[i].lesson_info.length; j++) {
                        for (var k = 0; k < blocks[i].lesson_info[j].lesson.rules.length; k++) {
                            blocks[i].lesson_info[j].lesson.rules[k].id = k;
                        } 
                    }
                }
                setBlocks(blocks);
                setFlag(true);
                console.log(blocks);
            });
    }

    const findLesLb = (name_les) => {
        for (var i = 0; i < props.blocks.length; i++) {
            for (var j = 0; j < props.blocks[i].lesson_info.length; j++) {
                if (name_les === props.blocks[i].lesson_info[j].name_les) {
                    return [i, j];
                }
            }
        }
    }

    const findTypeEx = (ex) => {
        for (var i = 0; i < props.types_ex.length; i++) {
            if (props.types_ex[i].mean_type_ex === ex.mean_type_ex) {
                return props.types_ex[i].type_ex;
            }
        }
    }

    const findId = (word, word_type) => {
        if (word_type === "lex") {
            for (var i = 0; i < props.lexemes.length; i++) {
                if (props.lexemes[i].mean_lex === word) {
                    return props.lexemes[i].id_lex;
                }
            }
        }
        else {
            if (word_type === "rep") {
                for (var i = 0; i < props.replicas.length; i++) {
                    if (props.replicas[i].lexeme.mean_lex + props.replicas[i].symbol === word) {
                        return props.replicas[i].id_rep;
                    }
                }
            }
            else {
                return 0
            }
        }
    }

    const findIdArrays = (words, word_type) => {
        let id_words = [];
        if (word_type === "lex") {
            id_words.push(findId(words[0], "lex"));
            for (var i = 1; i < words.length; i++) {
                id_words.push(findId(words[i].replace(' ', ''), "lex"))
            }
            return id_words;
        }
        else {
            if (word_type === "rep") {
                id_words.push(findId(words[0], "rep"));
                for (var i = 1; i < words.length; i++) {
                    id_words.push(findId(words[i].replace(' ', ''), "rep"));
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
    return (
        GetLessonsInfo()
    )
}
