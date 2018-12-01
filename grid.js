import Cell from './cell.js';
import config from './config.js';
import {
    NODE_TYPE_END,
    NODE_TYPE_CHECK,
    NODE_TYPE_BRICK,
    NODE_TYPE_PATH,
    NODE_TYPE_START
} from './const.js';


export default class Grid {
    constructor() {
        this.grid = [];
        this.startCell = {};
        this.endCell = {};
        this.queue = [];
        this.animationQueue = [];
        this.speed = config.defaultSpeed;
        this.container = document.querySelector('.app');

        this.initGrid();
        this.initDomGrid();
        this.initStartEndCell();

        this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.container.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

    onMouseDown() {
        this.container.onmousemove = ({ target }) => {
            let coords = {
                x: target.dataset.x,
                y: target.dataset.y
            }
            if (coords.x >= 0 && coords.y >= 0) {
                this.grid[coords.y][coords.x].type = NODE_TYPE_BRICK;
            }
        }
    }

    onMouseUp() {
        this.container.onmousemove = null;
    }

    stop() {
        clearInterval(this.timeout);
    }

    clearCell(clearBrick) {
        for (let j = 0; j < config.size_height; j++) {
            for (let i = 0; i < config.size_width; i++) {

                if (clearBrick) {
                    this.grid[j][i].clearBrick();
                } else {
                    this.grid[j][i].setDefaultOptions();
                }
            }
        }
    }

    reset() {
        this.queue = [];
        this.animationQueue = [];
        this.clearCell();
    }

    startBFS() {
        if (this.queue.length == 0) {
            this.queue.push(this.startCell);
        }

        let executeBFS = () => {
            while (this.queue.length) {
                let currentNode = this.queue.shift();

                this.animationQueue.push(currentNode);
                this.getNeighborCells(currentNode).every(node => {
                    node.visited = true;
                    node.dist = currentNode.dist + 1;
                    node.parent = currentNode;
                    this.queue.push(node);
                    this.animationQueue.push(node);

                    if (node.type === NODE_TYPE_END) {
                        this.queue = [];
                        return false;
                    } else {
                        return true;
                    }
                });
            }
        };

        executeBFS();
    }

    startDFS() {
        let executeDFS = (currentNode) => {
            this.animationQueue.push(currentNode);
            this.getNeighborCells(currentNode).forEach((node) => {

                node.parent = currentNode;
                node.dist = currentNode.dist + 1;
                this.animationQueue.push(node);

                executeDFS(node);
            });
        }

        executeDFS(this.startCell);
    }

    executeAlgorithm() {
        this.startBFS();
        this.animate();
    }

    animate() {
        let animateCell = () => {
            this.animationQueue.shift().animate();

            if (this.animationQueue.length) {
                this.timeout = setTimeout(() => {
                    animateCell();
                }, this.speed);
            } else {
                this.buildPath();
            }
        };

        animateCell();
    }

    buildPath() {
        let pathQueue = this.getPathQueue();

        let animateCell = () => {
            pathQueue.pop().animate();
            if (pathQueue.length) {
                setTimeout(() => {
                    animateCell();
                }, 25);
            }
        }

        animateCell();
    }

    getPathQueue() {
        let pathQueue = [],
            node = this.endCell;

        while (node.type !== NODE_TYPE_START) {
            pathQueue.push(node.parent);
            node = node.parent;
        }

        return pathQueue;
    }

    finishedAlgorithm(callback) {
        this.isStop = true;
        callback();

    }

    getNeighborCells(cell) {
        let list = [],
            coordsList = [
                { x: cell.x + 1, y: cell.y },
                { x: cell.x, y: cell.y - 1 },
                { x: cell.x - 1, y: cell.y },
                { x: cell.x, y: cell.y + 1 },
            ];

        coordsList.forEach(item => {
            let checkCell = this.grid[item.y] ? this.grid[item.y][item.x] : null;

            if (checkCell && checkCell.isValidForAdd()) {
                list.push(checkCell);
            }
        })

        return list
    }

    initGrid() {
        let row = [];

        for (let i = 0; i < config.size_height; i++) {
            for (let j = 0; j < config.size_width; j++) {
                row.push(new Cell(i, j));
            }

            this.grid.push(row);
            row = [];
        }
    }

    initDomGrid() {
        let table = document.createElement('table');

        table.classList.add('table');
        this.grid.forEach(row => {
            table.appendChild(this.createDomRow(row));
        });

        this.container.insertBefore(table, document.querySelector('.control'));
    }

    createDomRow(row) {
        let displayRow = document.createElement('tr');
        for (let i = 0; i < row.length; i++) {
            displayRow.appendChild(row[i].element);
        }

        return displayRow;
    }

    initStartEndCell() {
        this.startCell = this.grid[config.start.y][config.start.x];
        this.endCell = this.grid[config.end.y][config.end.x];
    }
}