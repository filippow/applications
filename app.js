import Grid from './grid.js';


class App {
    constructor(grid) {
        this.grid = grid;
        this.mode = '';

        this.startBtn = document.querySelector('.start-btn');
        this.continueBtn = document.querySelector('.continue-btn');
        this.stopBtn = document.querySelector('.stop-btn');
        this.clearBrickBtn = document.querySelector('.clearBrick-btn')
        this.resetBtn = document.querySelector('.reset-btn');
        this.inputRange = document.querySelector('.range');
        this.algoList = document.querySelector('.algo_list');

        this.startBtn.addEventListener('click', this.onStartBtnClick.bind(this));
        this.continueBtn.addEventListener('click', this.onContinueBtnClick.bind(this));
        this.stopBtn.addEventListener('click', this.onStopBtnClick.bind(this));
        this.clearBrickBtn.addEventListener('click', this.onClearBrickBtnClick.bind(this));
        this.resetBtn.addEventListener('click', this.onResetBtnClick.bind(this));
        this.inputRange.addEventListener('input', this.onChangeRange.bind(this));
        this.algoList.addEventListener('change', this.onAlgoListSelect.bind(this));
        this.setMode('init');
    }

    onStartBtnClick() {
        this.setMode('start');
        this.grid.reset();
        this.grid.executeAlgorithm(this.onFinishedAlgorithm.bind(this));
    }

    onStopBtnClick() {
        this.setMode('stop');
        this.grid.stop();
    }

    onContinueBtnClick() {
        this.setMode('continue');
        this.grid.animate(this.onFinishedAlgorithm.bind(this));
    }

    onClearBrickBtnClick() {
        this.grid.clearCell(true);
    }

    onResetBtnClick() {
        this.setMode('reset');
        this.grid.stop();
        this.grid.reset();
    }

    onFinishedAlgorithm() {
        this.setMode('finished');
    }
    onChangeRange({target}) {
        let value = target.value;

        this.grid.speed = value;
        document.querySelector('.result_time').textContent = `${value} ms`;
    }

    onAlgoListSelect({target}) {
        
    }

    setMode(mode) {
        this.mode = mode;

        this.startBtn.disabled = !(mode == 'init' || mode == 'finish' || mode == 'reset');
        this.continueBtn.disabled = !(mode == 'stop');
        this.stopBtn.disabled = !(mode == 'start' || mode == 'continue');
        this.resetBtn.disabled = !(mode == 'start' || mode == 'continue' || mode == 'stop' || mode == 'finished');
        this.clearBrickBtn.disabled = !(mode == 'init' || mode == 'reset' || mode == 'finished');
    }
}



var grid = new Grid();
var app = new App(grid);