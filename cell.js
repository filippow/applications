import config from './config.js';
import {
    NODE_TYPE_START,
    NODE_TYPE_END,
    NODE_TYPE_BRICK,
    NODE_TYPE_USUAL,
    NODE_TYPE_FRONT,
    NODE_TYPE_CHECK,
    NODE_TYPE_PATH,
} from './const.js';

export default class Cell {
    constructor(y, x) {
        this.x = x;
        this.y = y;
        this.id = '';
        this.dist = Infinity;
        this.parent = {};
        this._type = '';
        this.visited = false;

        this.element = document.createElement('td');
        this.element.dataset.x = x;
        this.element.dataset.y = y;
        this.element.addEventListener('click', this.onCellClick.bind(this));

        this.initCellConfig();
    }

    initCellConfig() {
        if (this.x === config.start.x && this.y === config.start.y) {
            this.type = NODE_TYPE_START;
            this.visited = true;
            this.dist = 0;
        } else if (this.x === config.end.x && this.y === config.end.y) {
            this.type = NODE_TYPE_END;
        } else {
            this.type = NODE_TYPE_USUAL;
        }
    }

    isValidForAdd() {
        return !(this.visited || this.type === NODE_TYPE_BRICK);
    }

    set type(type) {
        if (type == NODE_TYPE_BRICK && (this.type == NODE_TYPE_CHECK || this.type == NODE_TYPE_FRONT)) {
            return
        } else if (!(this.type === NODE_TYPE_START || this.type === NODE_TYPE_END)) {
            this._type = type;
            this.setClassList(type);
        }
    }

    get type() {
        return this._type;
    }

    setClassList(name) {
        this.element.className = 'cell' + (name ? ' ' + name : '');
    }

    clearBrick() {
        if (this.type === NODE_TYPE_BRICK) {
            this.type = NODE_TYPE_USUAL;
        }
    }

    animate() {
        if (this.type === NODE_TYPE_USUAL) {
            this.type = NODE_TYPE_FRONT
        } else if (this.type === NODE_TYPE_FRONT) {
            this.type = NODE_TYPE_CHECK
        } else if (this.type === NODE_TYPE_CHECK) {
            this.type = NODE_TYPE_PATH
        }
    }

    setDefaultOptions() {
        this.parent = {};
        this.visited = false;

        if (this.type === NODE_TYPE_START) {
            this.visited = true;
        } else if (this.type === NODE_TYPE_FRONT || this.type === NODE_TYPE_CHECK || this.type === NODE_TYPE_PATH) {
            this.type = NODE_TYPE_USUAL;
        }
    }

    onCellClick() {
        debugger;
        if (this.type === NODE_TYPE_BRICK) {

            this.type = NODE_TYPE_USUAL;
        } else if (this.type === NODE_TYPE_USUAL) {
            this.type = NODE_TYPE_BRICK;
        }
    }
}