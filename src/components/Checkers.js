import { Component } from "react";

export default class Checkers extends Component {
    
    checkTypes = () => {
        let mistakes = 0;
        for (var i = 0; i < this.state.lesson.lex.length; i++) {
            if (this.state.lesson.lex[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Буквы-слова " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        for (var i = 0; i < this.state.lesson.rules.length; i++) {
            if (this.state.lesson.rules[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Правило " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        for (var i = 0; i < this.state.lesson.phr.length; i++) {
            if (this.state.lesson.phr[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Фраза " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        for (var i = 0; i < this.state.lesson.dialog.length; i++) {
            if (this.state.lesson.dialog[i].type_ex === 0) {
                mistakes += 1;
                toast.error("Для Диалог " + (i + 1) + " не выбран тип задания. Заполните задание или удалите его.")
            }
        }
        return mistakes;
    }
    
    checkOrder = () => {
        let order = [];
        let mistakes = 0;
        for (var i = 0; i < this.state.lesson.lex.length; i++) {
            if (this.state.lesson.lex[i].num_ex === 0 && this.state.lesson.lex[i].type_ex !== 0) {
                mistakes += 1;
                toast.error("Для Буквы-слова " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.lex[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Буквы-слова " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.lex[i].num_ex)
                }
            }
        }
        for (var i = 0; i < this.state.lesson.phr.length; i++) {
            if (this.state.lesson.phr[i].num_ex === 0 && this.state.lesson.phr[i].type_ex !== 0) {
                mistakes += 1;
                toast.error("Для Фраза " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.phr[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Фраза " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.phr[i].num_ex)
                }
            }
        }
        for (var i = 0; i < this.state.lesson.dialog.length; i++) {
            if (this.state.lesson.dialog[i].num_ex === 0 && this.state.lesson.dialog[i].type_ex !== 0) {
                mistakes += 1;
                toast.error("Для Диалог " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.dialog[i].num_ex)) {
                    mistakes += 1;
                    toast.error("Для Диалог " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.dialog[i].num_ex)
                }
            }
        }
        for (var i = 0; i < this.state.lesson.rules.length; i++) {
            if (this.state.lesson.rules[i].num_ex === 0 && this.state.lesson.rules[i].type_ex !== 0 && this.state.lesson.rules[i].type_ex !== 23) {
                mistakes += 1;
                toast.error("Для Правило " + (i + 1) + " не указан порядковый номер в уроке.")
            }
            else {
                if (order.includes(this.state.lesson.rules[i].num_ex) && this.state.lesson.rules[i].type_ex !== 23) {
                    mistakes += 1;
                    toast.error("Для Правило " + (i + 1) + " указан уже существующий порядковый номер.")
                }
                else {
                    order.push(this.state.lesson.rules[i].num_ex)
                }
            }
        }
        return mistakes;
    }
    
    checkStatuses = () => {
        let mistakes = 0;
        mistakes = mistakes + this.checkTypes();
        mistakes = mistakes + this.checkOrder();
        console.log(mistakes);
        if ((this.state.video.id_video === null || this.state.video.id_video === "") && this.state.statuses.video_st !== statuses[0]) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Видео.");
        }
        if ((this.state.video.id_video !== null && this.state.video.id_video !== "") && (this.state.statuses.video_st === statuses[0] || this.state.statuses.video_st === "")) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Видео.");
        }
        if ((this.state.lesson.lex.length + 0 === 0) && (this.state.statuses.lex_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Буквы-слова.");
        }
        if ((this.state.lesson.lex.length + 0 > 0) && (this.state.statuses.lex_st === statuses[0] || this.state.statuses.lex_st === "")) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Буквы-слова.");
        }
        if ((this.state.lesson.phr.length + 0 === 0) && (this.state.statuses.phr_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Фразы.");
        }
        if ((this.state.lesson.phr.length + 0 > 0) && (this.state.statuses.phr_st === statuses[0] || this.state.statuses.phr_st === "")) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Фразы.");
        }
        if ((this.state.lesson.dialog.length + 0 === 0) && (this.state.statuses.dialog_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Диалоги.");
        }
        if ((this.state.lesson.dialog.length + 0 > 0) && (this.state.statuses.dialog_st === statuses[0] || this.state.statuses.dialog_st === "")) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Диалоги.");
        }
        if ((this.state.lesson.rules.length + 0 === 0) && (this.state.statuses.rules_st !== statuses[0])) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Правила.");
        }
        if ((this.state.lesson.rules.length + 0 > 0) && (this.state.statuses.rules_st === statuses[0] || this.state.statuses.rules_st === "")) {
            mistakes = mistakes + 1;
            toast.error("Ошибка в заполнении статуса Правила.");
        }
    
        return mistakes;
    }
}
