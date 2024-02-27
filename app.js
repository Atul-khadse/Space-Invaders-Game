let body = document.querySelector("body");

const grid = document.querySelector(".grid");
const results = document.querySelector(".results");
const button = document.querySelector(".BTN");
let currentShooterIndex = 202;
const width = 15;
const alienRemoved = [];
let invadersId;
let isGoingRight = true;
let direction = 1
let score = 0;



for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.id = i;
    grid.appendChild(square);
}
const square = Array.from(document.querySelectorAll(".grid div"));
console.log(square);
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!alienRemoved.includes(i)) {
            square[alienInvaders[i]].classList.add("invader");
        }
    }
}
draw();

square[currentShooterIndex].classList.add("shooter")
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        square[alienInvaders[i]].classList.remove("invader");
    }

}

function moveShooter(e) {
    square[currentShooterIndex].classList.remove("shooter")
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break

        case "ArrowRight":
            if (currentShooterIndex % width < width - 1)
                currentShooterIndex += 1
            break
    }
    square[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();
    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            isGoingRight = false;
        }
    }
    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            isGoingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }
    draw();
    if (square[currentShooterIndex].classList.contains("invader")) {
       
        results.innerHTML = "GAME OVER!";
        clearInterval(invadersId);
    }

    if (alienRemoved.length === alienInvaders.length) {
        body.classList.add("body");
        results.innerHTML = "YOU WIN";
        clearInterval(invadersId);
    }

}
invadersId = setInterval(moveInvaders, 600);

function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        square[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        square[currentLaserIndex].classList.add("laser");

        if (square[currentLaserIndex].classList.contains('invader')) {
            square[currentLaserIndex].classList.remove("laser");
            square[currentLaserIndex].classList.remove('invader');
            square[currentLaserIndex].classList.add("boom");

            setInterval(() => square[currentLaserIndex].classList.remove("boom"), 200)
            clearInterval(laserId);

            const aliensRemoved = alienInvaders.indexOf(currentLaserIndex);
            alienRemoved.push(aliensRemoved);
            score++;
            results.innerHTML = score;

        }
    }
    if (e.key === 'ArrowUp') {
        laserId = setInterval(moveLaser, 100);
    }


}
document.addEventListener("keydown", shoot)


button.addEventListener("click", () => {
    window.location.reload();
});