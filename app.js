export default class App {
    constructor(element) {
        this.element = element;
        this.coordinates = [];
        this.snakeCoordinates = [[4,5],[3,5]];
        this.currentLength = 2;
        this.currentDirection = '';
        this.headX = 4;
        this.headY = 5;
        this.gameOver = false;
        this.isAddNewChain = false;

        this.some = 1;
        this.init(element);  
    }
   
    init() {
        let rows = document.querySelectorAll('.row');
        this.createMassiv(rows);
        this.createApple();

        this.display = document.querySelector('.display');
        this.display.textContent = 'Текущая длина змейки:  '+ this.currentLength;
        
        document.addEventListener('keyup', this.keyPress.bind(this));
        
        this.snakeCoordinates.forEach( (item,index) => {
            if (index) {
                this.colorize(item[0],item[1]);
            } else {
                this.colorizeHead(item[0],item[1]);
            }
        });
    }

    keyPress({keyCode}) {
        if (this.some == 1) {
            this.tick();
            this.some++;
        }

        switch (keyCode) {
            case 37:
                if (this.currentDirection !== 'right') {
                    this.currentDirection = 'left';
                }
                break;
            case 38:
                if (this.currentDirection !== 'down') {
                    this.currentDirection = 'up';
                }
                break;
            case 39:
                if (this.currentDirection !== 'left' ) {
                    this.currentDirection = 'right';
                }
                break;
            case 40:
                if (this.currentDirection !== 'up') {
                    this.currentDirection = 'down';
                }
                break;
            default:
        }
    }

    tick() {
        this.id = setInterval(this.move.bind(this),200);
    }

    reset() {
        clearInterval(this.id);
    }

    move() {
       
        this.gameOver = this.checkThisGame();
        if (this.gameOver) {
            this.reset(this.id);
            alert('Игра окончена');
        }
        
        if (this.appleX == this.headX && this.appleY == this.headY) {
            this.currentLength+=1;
            this.uncolorizeApple(this.appleX,this.appleY);
            this.createApple();
            this.display.textContent = 'Текущая длина змейки:  '+ this.currentLength;
            this.isAddNewChain = true;
        }
        
        if (this.isAddNewChain) {
            this.snakeCoordinates.push([this.headX, this.headY]);
            this.isAddNewChain = false;
        }

        this.snakeCoordinates.forEach( (item,index) => {
            if (index) {
                this.uncolorize(item[0],item[1]);
            } else {
                this.uncolorizeHead(item[0],item[1]);
            }
        });

        if (this.currentLength == 2) {
            this.snakeCoordinates[1] = this.snakeCoordinates[0];
        } else {
            let first = this.snakeCoordinates[0];
            for (let i = 0; i<this.snakeCoordinates.length - 1; i++) {
                let second = this.snakeCoordinates[i+1];
                this.snakeCoordinates[i+1]=first;
                first = second;
            }
        }
        
        switch(this.currentDirection) {
            case 'left': 
           this.headX-=1;
                break;
            case 'up':
                 this.headY-=1;
                break;
            case 'right':
               this.headX+=1; 
                break;
            case 'down':
                 this.headY+=1;
                break;
        }
        
        if (this.headX ==10  || this.headX == -1 || this.headY == -1 || this.headY == 10) {
            this.gameOver = true;
            this.reset(this.id);
            alert('Игра окончена');
        }
       
        this.snakeCoordinates[0] = [this.headX,this.headY];

        this.snakeCoordinates.forEach( (item,index) => {
            if (index) {
                this.colorize(item[0],item[1])
            } else {
                this.colorizeHead(item[0],item[1]);
            }
        });
       
        
    }

    // Инициалиация элементов html таблицы с двуменрынм массивом - координатами
    createMassiv(rows) {
        let coord = [];
        let temporary = [];
        for (let i=0; i<rows.length; i++) {
           for (let j=0; j<rows.length; j++) {
               temporary.push(rows[i].children[j]);  
           }
           coord.push(temporary);
           temporary = [];
        }
        this.coordinates = coord;
    }

    colorize(x,y) {
        this.coordinates[y][x].classList.add('selected');
    }

    uncolorize(x,y) {
        this.coordinates[y][x].classList.remove('selected');
    }

    colorizeApple(x,y) {
        this.coordinates[y][x].classList.add('me');
    }

    uncolorizeApple(x,y) {
        this.coordinates[y][x].classList.remove('me');
    }

    colorizeHead(x,y) {
        if (x>=0 && x<=9 && y>=0 && y<=9) {
            this.coordinates[y][x].classList.add('snakeHead');
        }
    }

    uncolorizeHead(x,y) {
        if (x>=0 && x<=9 && y>=0 && y<=9) {
            this.coordinates[y][x].classList.remove('snakeHead');
        }
    }

    createApple() {
        this.createAppleCoordinates();
        this.colorizeApple(this.appleX,this.appleY);
    }

    createAppleCoordinates() {
        this.appleX = Math.floor(Math.random()*10);
        this.appleY = Math.floor(Math.random()*10); 
        
        if (this.compareForApple() == true) {
            this.createAppleCoordinates();
        }
    }

    compareForApple() {
        for (let i =0; i< this.snakeCoordinates.length; i++) {
            if (this.appleX == this.snakeCoordinates[i][0] && this.appleY == this.snakeCoordinates[i][1]) {
                return true
            }
        }

        return false
    }

    checkThisGame() {
        let arr = this.snakeCoordinates;
        
        for ( let i=0; i<arr.length -1; i++) {
            for (let j=i+1; j< arr.length; j++) {
                if (arr[i][0]==arr[j][0] && arr[i][1]==arr[j][1] ) {
                    return true;
                }
            }
        }
        return false;
    }
}