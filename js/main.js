/*
  TODO: 
  - Check other quotes selection
  - Clear rect from the screen after typing (bug seen in after second iteration normally)
*/

const mainCanvas = document.getElementById("main-canvas"); // Set Canvas element
let mainCtx = mainCanvas.getContext("2d"); // Define Canvas as 2-dimensional

//General Variables and Flag Declarations
let clickButton = false;
let enterPressed = false;
let timeLeft = 0;
startTime = 0;
let counter = 0;
let levelFinished = false;
let startDrawingTimer = false;
let ableToStart = false;
let enterKeyCounter = 0;
let quoteLength = 0;

// Music and Images Declarations
const music = new Audio("./sounds/POL-treasure-match-short.wav");
const introMusic = new Audio("./sounds/StarWars.mp3");
const vito = new Image();
vito.src = "./images/Vitoready.png";
const house = new Image();
house.src = "./images/vitos path.png";
const food = new Image();
food.src = "./images/foodReady.png";
const vitoFront = new Image();
vitoFront.src = "./images/VitoFront.png";
const vitoSteady = new Image();
vitoSteady.src = "./images/VitoSteady.png";
const madDog = new Image();
madDog.src = "./images/MadDog.png";
const vitoStart = new Image();
vitoStart.src = "./images/VitoStart.png";
let completedVito = new Image();
completedVito.src = "./images/VitoGoodJob-removebg-preview.png";
let completed = new Image();
completed.src = "./images/Mission-completed.png";

//Quote Elements Declarations
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
quoteInputElement.style.display = "none";
quoteDisplayElement.style.display = "none";

//Prompt Declarations
let prompt1 =
  "Hello adventurer! Vito is a 3-lbs chihuahua. Chihuahuas need to eat several times a day because their ";
let prompt2 =
  "stomach is really small. Vito's owner has been working all day and hasn't been able to feed him :(";
let prompt3 =
  "your mission is to help Vito get to the food by the typing the words on the screen as fast as you can!";
let prompt4 = "Are you READY?";
let prompt5 = "Press ENTER to Start.";

//Setting Global Font
mainCtx.font = "40px Candara";
mainCtx.fillStyle = "yellow";

//Get Random Quote from Array
const getRandomQuote = (array) => {
  let randomIndex = Math.floor(Math.random() * (array.length - 1));
  return array[randomIndex].quote;
};

//Draw Introduction
function callIntro() {
  // introMusic.play()
  let startx = 300; //Initial Position X for Title
  let starty = 200; // Initial Position Y for Title
  let finalWidth = 800;
  let finalHeight = 250;
  const vitosAdventure = new Image();
  vitosAdventure.src = "./images/vitos.png";
  const vitosAdventure1 = new Image();
  vitosAdventure1.src = "./images/adventure.png";
  let vitosInterval = setInterval(() => {
    finalWidth -= 1;
    finalHeight -= 1;
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.drawImage(vitosAdventure, startx, starty, finalWidth, finalHeight);
    mainCtx.drawImage(
      vitosAdventure1,
      startx - 100,
      starty + 100,
      finalWidth + 200,
      finalHeight
    );
    if (finalHeight === 100) clearInterval(vitosInterval);
  }, 10);

  setTimeout(() => {
    let counter1 = 0;
    let movingPrompts = setInterval(() => {
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCtx.drawImage(
        vitosAdventure,
        startx,
        starty - counter1,
        finalWidth,
        finalHeight
      );
      mainCtx.drawImage(
        vitosAdventure1,
        startx - 100,
        starty + 100 - counter1,
        finalWidth + 200,
        finalHeight
      );
      mainCtx.fillText(prompt1, 100, starty + 500 - counter1, 1100);
      counter1 += 2;
      if (counter1 > 80) {
        mainCtx.fillText(prompt2, 100, starty + 580 - counter1, 1100);
      }
      if (counter1 > 160) {
        mainCtx.fillText(prompt3, 100, starty + 660 - counter1, 1100);
      }
      if (counter1 > 240) {
        mainCtx.fillText(prompt4, 100, starty + 740 - counter1, 1100);
      }
      if (counter1 > 320) {
        mainCtx.fillText(prompt5, 100, starty + 820 - counter1, 1100);
      }

      if (counter1 > 370) {
        mainCtx.drawImage(house, 100, starty + 870 - counter1);
        mainCtx.drawImage(vitoFront, 140, starty + 980 - counter1, 100, 100);
        mainCtx.drawImage(madDog, 130, starty + 870 - counter1, 100, 100);
        mainCtx.drawImage(food, 1120, starty + 920 - counter1, 100, 100);
      }

      if (counter1 > 600) {
        clearInterval(movingPrompts);
        ableToStart = true;
      }
    }, 10);
  }, 2000);
}

function drawHouse() {
  mainCtx.drawImage(house, 100, 468);
}

function drawVito() {
  mainCtx.drawImage(vito, 130, 578, 100, 100);
}

function drawFood() {
  mainCtx.drawImage(food, 1120, 518, 100, 100);
}

function drawMadDog() {
  mainCtx.drawImage(madDog, 130, 470, 100, 100);
}

function drawTitle() {
  mainCtx.fillStyle = "yellow";
  mainCtx.font = "50px Candara";
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
  mainCtx.font = "40px Candara";
  let startTime = 1;
  let typingTime = setInterval(() => {
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

function levelCompletionAnimation() {
  quoteInputElement.style.display = "none";
  quoteDisplayElement.style.display = "none";
  let completedVito = new Image();
  completedVito.src = "/images/VitoGoodJob-removebg-preview.png";
  let completed = new Image();
  completed.src = "/images/Mission-completed.png";
}

function levelCompletion() {
  quoteInputElement.style.display = "none";
  quoteDisplayElement.style.display = "none";
  mainCtx.drawImage(completedVito, 200, 10, 600, 250);
  mainCtx.drawImage(completed, 400, 150, 700, 300);


  setTimeout(() => {
    clearScreen();
    levelCompletionPrompt(timeLeft);
  }, 4000);
}

function levelCompletionPrompt(time) {
  let completionPrompt = "Congratulations!";
  let completionPrompt2 =
    "You typed all the letters correctly and got Vito to his food!";
  let completionPrompt3 = `You took ${time} seconds`;
  let completionPrompt4 = `Press ENTER To Continue`;
  let completionPrompt5 = `OR`;
  let completionPrompt6 = `Press ESC To End Game.`;
  let totalWords = quoteInputElement.value.split(' ')
  console.log("Total Words", totalWords);
  let averageWords = Math.round(Number((totalWords.length / timeLeft) * 60));
  console.log(quoteInputElement.value)
  console.log(timeLeft)
  let awpm = `Your Average WPM: ${averageWords}`;

  mainCtx.fillStyle = "yellow";
  mainCtx.font = "50px Candara";
  mainCtx.fillText(completionPrompt, 490, 80);
  mainCtx.fillText(completionPrompt2, 120, 200, 1100);
  mainCtx.fillText(completionPrompt3, 120, 300, 1100);
  mainCtx.font = "25px Candara";
  mainCtx.fillText("(press ENTER to continue...)", 490, 370);

  ableToStart = false;
  enterPressed = true;

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 && ableToStart == false && enterPressed == true && levelFinished == true) {
      clearScreen();
      let hello = awpm;
      console.log(hello)
      mainCtx.font = "70px Candara";
      mainCtx.fillText(awpm, 200, 180, 900)
      mainCtx.font = "50px Candara";
      mainCtx.fillText(completionPrompt4, 100, 320);
      mainCtx.fillText(completionPrompt5, 650, 370);
      mainCtx.fillText(completionPrompt6, 750, 420);
      ableToStart = true;
      enterPressed = false;
      enterKeyCounter++;
      setTimeout(() => {
        levelFinished = false;
        startDrawingTimer = false;
      }, 30);
      // document.addEventListener('keydown', (e) => {
        // if (e.keyCode === 13 && ableToStart == true && enterPressed == false && levelFinished == true) {
          
          
        // }
      // })

      // startDrawingTimer = false;
      // enterPressed = false;
      // levelFinished = false;
      // document.addEventListener("keydown", (e) => {
      //   if (e.keyCode === 13 && ableToStart == true && enterPressed == false){
      //     alert('This is being fired')
      //     levelFinished = false;
      //     ableToStart = false;
          
      //     timer()
      //     setTimeout(function () {
      //       renderNewQuote();
      //       // return;
      //     }, 5000);
      //     enterKeyCounter = 0;
      //   }
          
      //   });
    }
  });

  
  
  
}



document.getElementById("start").onclick = () => {
  document.getElementById("start").style.display = "none";
  document.getElementById("clickHere").style.display = "none";
  clickButton = true;

  callIntro();
  //  drawFirstHouse()
  // drawHouse();
  // drawVito();
  // drawFood();
  // drawTitle();
  // drawPrompt();
};

const clearScreen = () => mainCtx.clearRect(0, 0, 1300, 469);

//Draw new Quote onto the Screen.
function renderNewQuote() {
  clearScreen();
  quoteDisplayElement.style.display = "block";
  quoteInputElement.style.display = "block";
  mainCtx.font = "50px Candara";
  mainCtx.fillText("00", 1200, 50);
  let quote = getRandomQuote(quotes);
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
    quoteInputElement.focus();
    quoteInputElement.select();
  });
  quoteInputElement.value = null;
  // ableToStart = false;
  // enterPressed = true;
}

function timer() {
  let countDown = 3;
  let beginningTimer = setInterval(() => {
    clearScreen();
    mainCtx.font = "150px Candara";
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
  if (
    e.keyCode === 13 &&
    clickButton == true &&
    enterPressed == false &&
    ableToStart == true &&
    levelFinished == false
  ) {
    enterPressed = true;
    ableToStart = false;
    introMusic.pause();

    timer();

    setTimeout(function () {
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
        let vitosPathx = 130; //Math.floor(1300/5);
        let vitosPathy = 578;
        let vitosPosition = 0;
        for (let i = 0; i < arrayValue.length -1; i++) {
          mainCtx.clearRect(0, 0, 1200, mainCanvas.height);
          drawHouse();
          drawFood();
          drawMadDog();
          if (quoteDisplayElement.childNodes[i].classList.contains('correct')) {
            vitosPathx += 960 / arrayQuote.length;
            vitosPathy -= 60 / arrayQuote.length;
            vitosPosition++;

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
