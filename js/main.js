

// import quotes from "./quotes.js";
const mainCanvas = document.getElementById('main-canvas');
let mainCtx = mainCanvas.getContext('2d');

let prompt1 = 'Hello adventurer! Vito is a 3-lbs chihuahua. Chihuahuas need to eat several times a day because their ';
let prompt2 = 'stomach is really small. Vito\'s owner has been working all day and hasn\'t been able to feed him :(';
let prompt3 = 'your mission is to help Vito get to the food by the typing the words on the screen as fast as you can!';
let prompt4 = 'Are you READY?';
let prompt5 = 'Press ENTER to Start.';
let countDown = 3;
let counter = 0;

const  getRandomQuote = array => {
    let randomIndex = Math.floor(Math.random() * (array.length - 1));
    return array[randomIndex].quote;
}

// console.log(getRandomQuote(quotes));

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
        
    }
})

function drawHouse () {
    const house = new Image();
    house.src = '/images/vitos path.png';
    house.addEventListener('load', () => {
        mainCtx.drawImage(house, 100, 470);
        drawVito();
        drawFood();
    })
}

function drawVito() {
    const vito = new Image();
    vito.src = '/images/Vitoready.png';
    vito.addEventListener('load', () => {
        mainCtx.drawImage(vito, 130, 580, 100, 100)
    }) 
}

function drawFood() {
    const food = new Image();
    food.src = '/images/foodReady.png';
    food.addEventListener('load', () => {
        mainCtx.drawImage(food, 1120, 520, 100, 100)
    })
}

function drawTitle() {
    mainCtx.fillStyle = 'yellow';
    mainCtx.font = '50px monospace';
    mainCtx.fillText('Vito\'s Adventure!', 400, 50);
}

function drawPrompt() {
    mainCtx.fillStyle = 'yellow';
    mainCtx.font = '30px calibri';
    mainCtx.fillText(prompt1, 100, 120, 1100);
    mainCtx.fillText(prompt2, 100, 200, 1100);
    mainCtx.fillText(prompt3, 100, 280, 1100);
    mainCtx.fillText(prompt4, 100, 320, 1100);
    mainCtx.fillText(prompt5, 100, 400, 1100);
}
    
document.getElementById('start').onclick = () => {
    document.getElementById('start').style.display = 'none';
    document.getElementById('clickHere').style.display = 'none';

    drawHouse();
    drawTitle();
    drawPrompt();

}

const clearScreen = () => mainCtx.clearRect(0, 0, 1300, 400);

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        clearScreen();

        let timer = setInterval(() => {
            clearScreen();
            mainCtx.font = '50px calibri';
            mainCtx.fillText(countDown, 600, 300);
            countDown--;
            if (countDown < 0){
                clearScreen();
                countDown = 'GO!'
                mainCtx.fillText(countDown, 600, 300);
                clearInterval(timer);
                setTimeout(function() {
                    clearScreen();
                }, 1000)
            }
           
        }, 1000);

    } else {
        return;
    }
})  


