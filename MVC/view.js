
export default class View {
    constructor() {
        this.tpl = Handlebars.compile(document.getElementById("review").innerHTML);
        this.baloonTpl = Handlebars.compile(document.getElementById("baloonContent").innerHTML);
        this.modal = document.querySelector('.frame');       
    }
 
    closeModal() {
        this.modal.style.width = 0;
    }

    renderModal(data) {
        let html = 'Отзывов пока что нет...';

        if (data.feedbacks && data.feedbacks.length > 0) {
            html = '';
            for (let i=0; i< data.feedbacks.length; i++) {
                html += this.tpl(data.feedbacks[i]);
            }
        }

        this.clearValue();
        this.modal.style.width = '400px';
        this.modal.querySelector('.content').innerHTML = html;
        this.modal.querySelector('.adress').textContent = data.adress;
    }

    clearValue() {
        let inputs = document.querySelector('.form').children;

        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '';
    }

    getBaloonContent(feedback) {
        return this.baloonTpl(feedback);
    }

    changeMenu(element) {
        let visibility, classList, buttons;

        if (element.classList.contains('fa-arrow-left')) {
            classList = 'fas fa-arrow-right';
            visibility = 'none';
        } else {
            classList = 'fas fa-arrow-left';
            visibility = 'block';
        }

        element.classList = classList;
        buttons = document.querySelectorAll('.menu_button');
        buttons[0].style.display = visibility;
        buttons[1].style.display = visibility;
    }
}

/**
 * Структура данных отзыва (review)
 * {
 *  adress: 'string'
 *  coords: 'array'
 *  id: 'number'
 *  feedbacks: [
 *      {
 *          name: inputs[0].value,
 *          target_place: inputs[1].value,
 *          impression: inputs[2].value,
 *          id_review: 'number' 
 *          date: 'datetime'      
 *      }
 *  ]
 * }
 */