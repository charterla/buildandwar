var playBoard = document.getElementById("playBoard");
var context = playBoard.getContext("2d");
var radius = 20, OstX, OstY, EstX, EstY;
var isMove = false, MlastX, MlastY;
var block = new Array(), bx = 0;

function hexagon(nowx, nowy, addx, addy) {
        let angle = Math.PI/3;
        context.beginPath();
        for(let nowAngle=0; nowAngle<Math.PI*2; nowAngle+=angle) {
            let tx = addx + nowx * radius * 3 + Math.cos(nowAngle) * radius;
            let ty = addy + nowy * radius * 1.75 + Math.sin(nowAngle) * radius;
            if(nowAngle==0)context.moveTo(tx, ty);
            else context.lineTo(tx, ty);
            context.stroke();
        }
        context.closePath();
}

function drawMap() {
    for(let i=0; i<800/radius/3; i++) {
        for(let j=0; j<450/radius/1.75; j++) {
            hexagon(i, j, OstX, OstY);
            hexagon(i, j, EstX, EstY);
        }
    }
}

playBoard.onmouseup = function(e) {
    isMove = false;
}

playBoard.onmousedown = function(e) {
    MlastX = e.offsetX;
    MlastY = e.offsetY;
    isMove = true;
}

playBoard.onmousemove = function(e) {
    if(!isMove)return;

    var MdifX = e.offsetX-MlastX, MdifY = e.offsetY-MlastY;

    OstX += MdifX; EstX += MdifX;
    if(OstX<EstX){if(OstX>radius*0.5)EstX=OstX-(radius*1.5);if(OstX<radius*0.5)OstX=OstX+(radius*3);}
    if(EstX<OstX){if(EstX>radius*0.5)OstX=EstX-(radius*1.5);if(EstX<radius*0.5)EstX=EstX+(radius*3);}
    context.clearRect(0, 0, 800, 450);
    drawMap();

    MlastX = e.offsetX, MlastY = e.offsetY;
}

window.onload = function (){
    OstX = radius; OstY = radius*0.875;
    EstX = radius*2.5; EstY = radius*1.75;

    drawMap();
}