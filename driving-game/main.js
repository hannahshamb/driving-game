var car = {
  direction: 'East',
  location: {
    x: 8,
    y: 8
  },
  start: false
};

var leftScreenX = document.documentElement.clientWidth - 15 - 150;
var topScreenY = document.documentElement.clientHeight - 15 - 150;

var $enemyCar1 = document.querySelector('.enemy-car1-img');
var $finishLine = document.querySelector('.finish-line');
$enemyCar1.style.left = leftScreenX.toString() + 'px';
$finishLine.style.left = leftScreenX.toString() + 'px';
$finishLine.style.top = topScreenY.toString() + 'px';

var $carImg = document.querySelector('.car-img');
var myInt;

document.addEventListener('keydown', moveCar);
function moveCar(event) {
  if (event.key === 'ArrowRight') {
    car.direction = 'East';
    $carImg.className = 'car-img east';
  } else if (event.key === 'ArrowLeft') {
    car.direction = 'West';
    $carImg.className = 'car-img west';
  } else if (event.key === 'ArrowUp') {
    car.direction = 'North';
    $carImg.className = 'car-img north';
  } else if (event.key === 'ArrowDown') {
    car.direction = 'South';
    $carImg.className = 'car-img south';
  }
  if (event.key === ' ') {
    if (car.start === false) {
      myInt = setInterval(startCar, 16);
    } else if (car.start === true) {
      clearInterval(myInt);

      car.location.x = parseInt($carImg.style.left);
      if (isNaN(parseInt($carImg.style.left))) {
        car.location.x = 0;
      }
      car.location.y = parseInt($carImg.style.top);
      if (isNaN(parseInt($carImg.style.top))) {
        car.location.y = 0;
      }

      car.start = false;
    }

  }

  function startCar() {
    car.start = true;
    var pixelsToMove;
    var newValue;
    var movementSpeed = 10;

    if (car.direction === 'East') {
      pixelsToMove = parseInt($carImg.style.left) + movementSpeed;
      if (isNaN(pixelsToMove)) {
        pixelsToMove = movementSpeed;
      }
      newValue = pixelsToMove.toString();
      car.location.x = newValue;
      $carImg.style.left = (newValue + 'px');
    } else if (car.direction === 'West') {
      pixelsToMove = parseInt($carImg.style.left) - movementSpeed;
      if (isNaN(pixelsToMove)) {
        pixelsToMove = -movementSpeed;
      }
      newValue = pixelsToMove.toString();
      car.location.x = newValue;
      $carImg.style.left = (newValue + 'px');
    } else if (car.direction === 'South') {
      pixelsToMove = parseInt($carImg.style.top) + movementSpeed;
      if (isNaN(pixelsToMove)) {
        pixelsToMove = movementSpeed;
      }
      newValue = pixelsToMove.toString();
      car.location.y = newValue;
      $carImg.style.top = (newValue + 'px');
    } else if (car.direction === 'North') {
      pixelsToMove = parseInt($carImg.style.top) - movementSpeed;
      if (isNaN(pixelsToMove)) {
        pixelsToMove = -movementSpeed;
      }
      newValue = pixelsToMove.toString();
      car.location.y = newValue;
      $carImg.style.top = (newValue + 'px');
    }

    var $crash = document.querySelector('.crash');
    if (car.location.x <= -1 || car.location.y <= -1 || car.location.x >= leftScreenX + 15 || car.location.y >= topScreenY + 15) {
      $crash.classList.remove('hidden');
      clearInterval(myInt);
      setTimeout(resetGame, 1500);
    }
  }

}

function resetGame() {
  var $crash = document.querySelector('.crash');
  $crash.classList.add('hidden');
  car = {
    direction: 'East',
    location: {
      x: 8,
      y: 8
    },
    start: false
  };
  $carImg.style.left = '8px';
  $carImg.style.top = '8px';
  $carImg.className = 'car-img east';
}
