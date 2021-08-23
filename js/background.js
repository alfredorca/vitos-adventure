// set up the backgroundCanvas and context
var backgroundCanvas = document.getElementById("background-canvas");
var backgroundCtx = backgroundCanvas.getContext("2d");
    

function setupStars() {
    // constants
    const COLOR_SPACE = "black";
    const COLOR_STARS = "white";
    const STAR_NUM = 200; // number of stars in the starfield
    const STAR_SIZE = 0.005; // max star size as a fraction of screen width
    const STAR_SPEED = 0.05; // fraction of screen width per second
    
    // set up the stars
    var stars = [];
    var starSpeed = STAR_SPEED * backgroundCanvas.width;
    var xv = starSpeed * randomSign() * Math.random();
    // Using Pythagoras' theorem, yv = sqrt(starSpeed^2 - xv^2)
    var yv = Math.sqrt(Math.pow(starSpeed, 2) - Math.pow(xv, 2)) * randomSign();
    for (let i = 0; i < STAR_NUM; i++) {
        let speedMult = Math.random() * 1.5 + 0.5;
        stars[i] = {
            r: Math.random() * STAR_SIZE * backgroundCanvas.width / 2, // check if window is active
            x: Math.floor(Math.random() * backgroundCanvas.width),
            y: Math.floor(Math.random() * backgroundCanvas.height),
            xv: xv * speedMult,
            yv: yv * speedMult
        }
    }

    // set up the animation loop
    var timeDelta, timeLast = 0;
    requestAnimationFrame(loop);

    function loop (timeNow) {
    
        // calculate the time difference
        timeDelta = timeNow - timeLast;
        timeLast = timeNow;
        
        // space background
        backgroundCtx.fillStyle = COLOR_SPACE;
        backgroundCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        
        // draw the stars
        backgroundCtx.fillStyle = COLOR_STARS;
        for (let i = 0; i < STAR_NUM; i++) {
            backgroundCtx.beginPath();
            backgroundCtx.arc(stars[i].x, stars[i].y, stars[i].r, 0, Math.PI * 2);
            backgroundCtx.fill();
        
            // update the star's x position
            stars[i].x += stars[i].xv * timeDelta * 0.001;
        
            // reposition the star to the other side if it goes off screen
            if (stars[i].x < 0 - stars[i].r) {
                    stars[i].x = backgroundCanvas.width + stars[i].r;
                } else if (stars[i].x > backgroundCanvas.width + stars[i].r) {
                    stars[i].x = 0 - stars[i].r;
                }
                
            // update the star's y position
            stars[i].y += stars[i].yv * timeDelta * 0.001;
        
            // reposition the star to the other side if it goes off screen
            if (stars[i].y < 0 - stars[i].r) {
                    stars[i].y = backgroundCanvas.height + stars[i].r;
                } else if (stars[i].y > backgroundCanvas.height + stars[i].r) {
                    stars[i].y = 0 - stars[i].r;
                }
            }
        
            // call the next frame
            if (window.hidden) {
                cancelAnimationFrame(loop);
            } else {
                requestAnimationFrame(loop);

            }
        }
        
        function randomSign() {
            return Math.random() >= 0.5 ? 1 : -1;
        }
    }
    
    function checkWindow () {
        if (window.open) {
            requestAnimationFrame(setupStars)
        } else {
            cancelAnimationFrame(setupStars)
        }
    }

    // setInterval(checkWindow, 10);
    setupStars();   
   
