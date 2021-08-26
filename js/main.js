const mainCanvas = document.getElementById("main-canvas");
let mainCtx = mainCanvas.getContext("2d");

let clickButton = false;
let enterPressed = false;
let timeLeft = 0;
startTime = 0;
let countDown = 3;
let counter = 0;
let levelFinished = false;
let startDrawingTimer = false;
let ableToStart = false;

const music = new Audio("/POL-treasure-match-short.wav")
const vito = new Image();
vito.src = "/images/Vitoready.png";
const house = new Image();
house.src = "/images/vitos path.png";
const food = new Image();
food.src = "/images/foodReady.png";
const vitoFront = new Image();
vitoFront.src = '/images/VitoFront.png';
const vitoSteady = new Image();
vitoSteady.src = '/images/VitoSteady.png';
const madDog = new Image();
madDog.src = '/images/MadDog.png';
const vitoStart = new Image();
vitoStart.src = '/images/VitoStart.png'

let completedVito = new Image();
completedVito.src = "/images/VitoGoodJob-removebg-preview.png";
let completed = new Image();
completed.src = "/images/Mission-completed.png";

const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
quoteInputElement.style.display = 'none';
quoteDisplayElement.style.display = 'none';


let prompt1 =
  "Hello adventurer! Vito is a 3-lbs chihuahua. Chihuahuas need to eat several times a day because their ";
let prompt2 =
  "stomach is really small. Vito's owner has been working all day and hasn't been able to feed him :(";
let prompt3 =
  "your mission is to help Vito get to the food by the typing the words on the screen as fast as you can!";
let prompt4 = "Are you READY?";
let prompt5 = "Press ENTER to Start.";

    mainCtx.font = "40px calibri";
    mainCtx.fillStyle = "yellow";

const getRandomQuote = (array) => {
  let randomIndex = Math.floor(Math.random() * (array.length - 1));
  return array[randomIndex].quote;
};

 
function callIntro() {
  let startx = 300;
  let starty = 200;
  let finalWidth = 800;
  let finalHeight = 250;
  const vitosAdventure = new Image();
  vitosAdventure.src = '/images/vitos.png';
  const vitosAdventure1 = new Image();
  vitosAdventure1.src = '/images/adventure.png';
  let vitosInterval = setInterval(() => {
    finalWidth -= 1
    finalHeight -= 1
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
    mainCtx.drawImage(vitosAdventure, startx, starty, finalWidth, finalHeight);
    mainCtx.drawImage(vitosAdventure1, startx - 100, starty + 100, finalWidth + 200, finalHeight)
    if (finalHeight === 100) clearInterval(vitosInterval)
    // mainCtx.drawImage(vitosAdventure1, );
  }, 10);
  
  setTimeout(() => {
    let counter1 = 0;
    let movingPrompts = setInterval(() => {
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
      mainCtx.drawImage(vitosAdventure, startx, starty - counter1, finalWidth, finalHeight)
      mainCtx.drawImage(vitosAdventure1, startx - 100, (starty + 100) - counter1, finalWidth + 200, finalHeight)
      mainCtx.fillText(prompt1, 100, (starty + 500) - counter1, 1100)
      counter1 += 2
      if (counter1 > 600) {
        clearInterval(movingPrompts);
        introduction();
      }
    }, 30);
  }, 3500);
  // let drawFirstBackground = setInterval(() => {
  //   mainCtx.clearRect(0,0, mainCanvas.width, mainCanvas.height)
  //   mainCtx.drawImage(vitoStart, 500, y, 300, 500)
  //   y += 8
  //   if (y > mainCanvas.height) {
  //     clearInterval(drawFirstBackground)
  //   }
  // }, 70);
  
  // setTimeout(() => {
  //     mainCtx.drawImage()
  // }, 1500);
  
}

function drawFirstHouse () {
    let y = 0;
    let houseAnimation = setInterval(  () => {
        clearScreen();
        mainCtx.drawImage(house, 100, y - 110)
        mainCtx.drawImage(vitoFront, 130, y, 100, 100)
        mainCtx.drawImage(food, 1120, y-60, 100, 100)
        mainCtx.drawImage(madDog, 130, y-100, 100, 100)
        if(y < 580) {
            y += 6;
        } else {
            mainCtx.clearRect(200, 400, 1200, 60);
            clearInterval(houseAnimation)
            drawFirstPrompts1()
        }
    }, 20);
    // music.play()
}

function drawFirstTitle() {
    let y = 0;
    let titleAnimation = setInterval( () => {
        mainCtx.clearRect(400, 0, 600, y)
        mainCtx.fillText(`Vito's Adventure`, 490, y)
        if (y < 50) {
            y += 2;
        } else {
            mainCtx.fillText(`Vito's Adventure`, 490, y)
            clearInterval(titleAnimation)
        }
    }, 20);

    ableToStart = true;

}

function drawFirstPrompts1 () {
  let y = 0;
  let prompt5Animation =  setInterval(() => {
    clearScreen()
    mainCtx.fillText(prompt5, 100, y, 1100)
    if (y < 420) {
      y+=7;
    } else {
      mainCtx.fillText(prompt5, 100, y)
       clearInterval(prompt5Animation)
      drawFirstPrompts2();
    }
  }, 20);
  
}

function drawFirstPrompts2() {
  let y = 0;
  let prompt4Animation = setInterval(() => {
    mainCtx.clearRect(0, 0, 1100, 350)
    mainCtx.fillText(prompt4, 100, y, 1100);
    if (y < 350) {
      y += 8;
    } else {
      mainCtx.fillText(prompt4, 100, y);
      clearInterval(prompt4Animation);
      drawFirstPrompts3()
    }
  }, 20);
}

function drawFirstPrompts3() {
  let y = 0;
  let prompt3Animation = setInterval(() => {
    mainCtx.clearRect(0, 0, 1200, 320);
    mainCtx.fillText(prompt3, 100, y, 1100);
    if (y < 280) {
      y += 9;
    } else {
      // mainCtx.fillText(prompt3, 100, y);
      clearInterval(prompt3Animation);
      drawFirstPrompts4()
    }
  }, 20);
}

function drawFirstPrompts4() {
  let y = 0;
  let prompt4Animation = setInterval(() => {
    mainCtx.clearRect(0, 0, 1200, 250);
    mainCtx.fillText(prompt2, 100, y, 1100);
    if (y < 200) {
      y += 10;
    } else {
      // mainCtx.fillText(prompt3, 100, y);
      clearInterval(prompt4Animation);
      drawFirstPrompts5()
    }
  }, 20);
}

function drawFirstPrompts5() {
  let y = 0;
  let prompt5Animation = setInterval(() => {
    mainCtx.clearRect(0, 0, 1200, 140);
    mainCtx.fillText(prompt1, 100, y, 1100);
    if (y < 120) {
      y += 11;
    } else {
      // mainCtx.fillText(prompt3, 100, y);
      clearInterval(prompt5Animation);
      drawFirstTitle()
    }
  }, 20);
}


function drawHouse() {

  
    mainCtx.drawImage(house, 100, 470);
 

}

function drawVito() {

mainCtx.drawImage(vito, 130, 580, 100, 100);

}

function drawFood() {
  
    mainCtx.drawImage(food, 1120, 520, 100, 100);
 
}

function drawMadDog () {
  mainCtx.drawImage(madDog, 130, 480, 100, 100)
}

function drawTitle() {
  mainCtx.fillStyle = "yellow";
  mainCtx.font = "50px calibri";
  mainCtx.fillText("Vito's Adventure!", 400, 50);
}

function drawPrompt() {
  mainCtx.fillStyle = "yellow";
  mainCtx.font = "30px";
  mainCtx.fillText(prompt1, 100, 120, 1100);
  mainCtx.fillText(prompt2, 100, 200, 1100);
  mainCtx.fillText(prompt3, 100, 280, 1100);
  mainCtx.fillText(prompt4, 100, 350, 1100);
  mainCtx.fillText(prompt5, 100, 420, 1100);
  ableToStart = true;
}

async function drawTimer() {
  mainCtx.fillStyle = "yellow";
  mainCtx.font = "40px calibri";
  let startTime = 1;
  let typingTime = setInterval( () => {
    mainCtx.fillText(startTime, 1200, 50);
     mainCtx.clearRect(1100, 00, 1250, 100);
    startTime = startTime < 10 ? "0" + startTime : startTime;
    mainCtx.fillText(startTime, 1200, 50);
    startTime++;
    if (levelFinished) {
      timeLeft = startTime - 1;
      timeLeft = timeLeft < 10 ? "0" + timeLeft : timeLeft;
      clearInterval(typingTime);
    }
  }, 1000);
}

function levelCompletionAnimation () {
  quoteInputElement.style.display = 'none';
  quoteDisplayElement.style.display = 'none';
  let completedVito = new Image();
  completedVito.src = "/images/VitoGoodJob-removebg-preview.png";
  let completed = new Image();
  completed.src = "/images/Mission-completed.png";
}

function levelCompletion() {
    quoteInputElement.style.display = 'none';
    quoteDisplayElement.style.display = 'none';

    // completedVito.addEventListener("load", () => {
      mainCtx.drawImage(completedVito, 200, 10, 600, 250);
      mainCtx.drawImage(completed, 400, 150, 700, 300);
    // });

    setTimeout(() => {
        clearScreen();
        levelCompletionPrompt(timeLeft)
    }, 4000);
  }

function levelCompletionPrompt(time) {
  let completionPrompt = "Congratulations!";
  let completionPrompt2 = "You typed all the letters correctly and got Vito to his food!"
  let completionPrompt3 = `You took ${time} seconds`;
  let completionPrompt4 = `Press ENTER To Continue`;
  let completionPrompt5 = `OR`;
  let completionPrompt6 = `Press ESC To End Game.`

  mainCtx.fillStyle = "yellow";
  mainCtx.font = "50px calibri";
  mainCtx.fillText(completionPrompt, 490, 80);
  mainCtx.fillText(completionPrompt2, 120, 200, 1100);
  mainCtx.fillText(completionPrompt3, 120, 300, 1100);
  mainCtx.font = '25px Calibri'
  mainCtx.fillText("(press ENTER to continue...)", 490, 370)

  document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        clearScreen();
        mainCtx.font = "50px calibri"
        mainCtx.fillText(completionPrompt4, 110, 180);
        mainCtx.fillText(completionPrompt5, 620, 250);
        mainCtx.fillText(completionPrompt6, 690, 320);
        document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        levelFinished = false;
        renderNewQuote();
    }
})
      }
  })
}

document.getElementById("start").onclick =  () => {
  document.getElementById("start").style.display = "none";
  document.getElementById("clickHere").style.display = "none";
  clickButton = true;

  // callIntro();
  //  drawFirstHouse()
  drawHouse();
  drawVito();
  drawFood();
  drawTitle();
  drawPrompt();
};

const clearScreen = () => mainCtx.clearRect(0, 0, 1200, 469);

function renderNewQuote() {
    clearScreen();
    quoteDisplayElement.style.display = 'block'
    quoteInputElement.style.display = 'block'
    mainCtx.font = "40px calibri";
    mainCtx.fillText("00", 1200, 50);
    const quote = getRandomQuote(quotes);
    quoteDisplayElement.innerHTML = "";
    quote.split("").forEach((character) => {
      const characterSpan = document.createElement("span");
      characterSpan.innerText = character;
      quoteDisplayElement.appendChild(characterSpan);
      quoteInputElement.focus();
      quoteInputElement.select();
    });
    quoteInputElement.value = null;
  }

function timer () {
    let beginningTimer = setInterval(() => {
        clearScreen();
        mainCtx.font = "150px calibri";
        mainCtx.fillText(countDown, 600, 270);
        countDown--;
        if (countDown < 0) {
          clearScreen();
          countDown = "GO!";
          mainCtx.fillText(countDown, 540, 270);
          clearInterval(beginningTimer);
 
        }
      }, 1000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && clickButton == true && enterPressed == false && ableToStart == true) {
      enterPressed = true;
    clearScreen();

     timer();

     setTimeout(function () {
        clearScreen();
        renderNewQuote();
      }, 5000);



    quoteInputElement.addEventListener("input", () => {
      const arrayQuote = quoteDisplayElement.querySelectorAll("span");
      const arrayValue = quoteInputElement.value.split("");

      if (!startDrawingTimer) {
        drawTimer();
        startDrawingTimer = true;
      }

      let correct = true;
      arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
          characterSpan.classList.remove("correct");
          characterSpan.classList.remove("incorrect");
          correct = false;
        } else if (character === characterSpan.innerText) {
          characterSpan.classList.add("correct");
          characterSpan.classList.remove("incorrect");
        } else {
          characterSpan.classList.remove("correct");
          characterSpan.classList.add("incorrect");
          correct = false;
        }
      });

      function updateVito() {
        let vitosPathx = 130//Math.floor(1300/5);
        let vitosPathy = 580;
        let vitosPosition = 0;
        for (let i = 0; i < arrayValue.length; i++){    
            mainCtx.clearRect(0, 0, 1200, mainCanvas.height)
            drawHouse();
            drawFood();
            drawMadDog();
            console.log(quoteDisplayElement)
            if (quoteDisplayElement.childNodes[i].className === 'correct') {
            vitosPathx += (960/arrayQuote.length); 
            vitosPathy -= (60/arrayQuote.length);
            vitosPosition++

            if (vitosPosition % 2 == 0) {
              mainCtx.drawImage(vito, vitosPathx, vitosPathy, 100, 100);
            } else {
              mainCtx.drawImage(vitoSteady, vitosPathx, vitosPathy, 100, 100);
            }
            } else {
                mainCtx.drawImage(vito, vitosPathx, vitosPathy, 100, 100);
            }
        }
    }

    updateVito();

      if (correct) {
        levelFinished = true;
        setTimeout(() => {
          quoteDisplayElement.innerText = "";
          levelCompletion();
        }, 500);
      }
    });
  } else {
    return;
  }
});

