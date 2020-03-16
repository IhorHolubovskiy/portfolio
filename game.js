var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBottom = new Image(); // Создание объекта

bird.src = "../game/img/bird.png"; // Указание нужного изображения
bg.src = "../game/img/bg.png"; // Аналогично
fg.src = "../game/img/fg.png"; // Аналогично
pipeUp.src = "../game/img/pipeUp.png"; // Аналогично
pipeBottom.src = "../game/img/pipeBottom.png"; // Аналогично


var fly = new Audio();
var score_audio = new Audio();

fly.src = "../game/petia2.aac";
score_audio.src = "../game/petia1.aac";
var gap = 100;

document.addEventListener("touch", moveUp);
document.addEventListener("click", moveUp);
document.addEventListener("keydown", moveUp);
function moveUp(){
	yPos -= 25;

	fly.play();
}

var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 1;


function draw() {
 // Какой-либо код
 ctx.drawImage(bg, 0, 0); // Вызов функции постоянно


  for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

pipe[i].x--;
if(pipe[i].x == 125) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
 location.reload(); // Перезагрузка страницы
 }

if(pipe[i].x ==5 ) {
	score++;
	score_audio.play();
}
}


 ctx.drawImage(fg, 0, cvs.height - fg.height);

 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Рахунок:" + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

pipeBottom.onload=draw;


