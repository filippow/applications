// import '../css/main.scss
import Model from './MVC/model.js';
import View from './MVC/view.js';
import Controller from './MVC/controller.js';
import yandexMap from './modules/yandexMap.js';

let map = new yandexMap();
let model = new Model();
let view = new View();
let controller = new Controller(model, view, map);


        // this.data = [{
        //     id: 'review-1',
        //     place: "Москва, Москоречье д 2 к 2 кв 194",
        //     feedback: [
        //         {
        //             name: 'Игорь',
        //             date: this.formatDate(new Date()),
        //             target_place: 'Кафе АнтуанПердун',
        //             impression: 'Хаебись, вообще чоткое место, рекомендую'
        //         },
        //         {
        //             name: 'Василий Пупкин',
        //             date: this.formatDate(new Date()),
        //             target_place: 'Кафе Зашкваримся Вместе',
        //             impression: 'Место так себе, я бы сюда больше не приходил'
        //         }, 
        //         {
        //             name: 'Игорь',
        //             date: this.formatDate(new Date()),
        //             target_place: 'Кафе АнтуанПердун',
        //             impression: 'Хаебись, вообще чоткое место, рекомендую'
        //         }
        //     ]
        // }]