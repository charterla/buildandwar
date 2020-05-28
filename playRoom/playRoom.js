var playBoard = document.getElementById("playBoard");
var context = playBoard.getContext("2d");
var radius = 20, OstX, OstY, EstX, EstY;
var isMove = false, MlastX, MlastY;
var numX = Math.floor(800/radius/3), numY = Math.floor(450/radius/1.75);
var OarBlock = {X:{top:0,down:numX,array:new Array()}, Y:{top:0,down:numY,array:new Array()}};
var EarBlock = {X:{top:0,down:numX,array:new Array()}, Y:{top:0,down:numY,array:new Array()}};

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

function leftMove(moveBlock, size) {
    let temp=moveBlock.array[0];
    for(let i=1;i<=size;i++)moveBlock.array[i-1]=moveBlock.array[i];
    moveBlock.array[size]=temp;

    moveBlock.top==size?moveBlock.top=0:moveBlock.top++;
    moveBlock.down==size?moveBlock.down=0:moveBlock.down++;

    return moveBlock;
}

function rightMove(moveBlock, size) {
    let temp=moveBlock.array[size];
    for(let i=size;i>0;i--)moveBlock.array[i]=moveBlock.array[i-1];
    moveBlock.array[0]=temp;

    moveBlock.top==0?moveBlock.top=size:moveBlock.top--;
    moveBlock.down==0?moveBlock.down=size:moveBlock.down--;

    return moveBlock;
}

playBoard.onmousedown = function(e) {
    MlastX = e.offsetX;
    MlastY = e.offsetY;
    isMove = true;
}

playBoard.onmouseup = function(e) {
    isMove = false;
}

playBoard.onmousemove = function(e) {
    if(!isMove)return;

    var MdifX = e.offsetX-MlastX, MdifY = e.offsetY-MlastY;

    OstX += MdifX; EstX += MdifX;
    if(OstX<EstX) {
        if(OstX>radius*0.5){EstX=OstX-(radius*1.5);EarBlock.X=rightMove(EarBlock.X, numX);}
        if(OstX<radius*0.5){OstX=OstX+(radius*3);OarBlock.X=leftMove(OarBlock.X, numX);}
    }
    if(EstX<OstX) {
        if(EstX>radius*0.5){OstX=EstX-(radius*1.5);OarBlock.X=rightMove(OarBlock.X, numX);}
        if(EstX<radius*0.5){EstX=EstX+(radius*3);EarBlock.X=leftMove(EarBlock.X, numX);}
    }


    /*OstY += MdifY; EstY += MdifY;
    if(OstY<EstY) {

    }
    if(EstY<OstY) {

    }*/

    context.clearRect(0, 0, 800, 450);
    drawMap();

    MlastX = e.offsetX, MlastY = e.offsetY;
}

window.onload = function (){
    OstX = radius; OstY = radius*0.875;
    EstX = radius*2.5; EstY = radius*1.75;
    drawMap();

    for(let i=0;i<=numX;i++){OarBlock.X.array[i]=i;EarBlock.X.array[i]=i;}
    for(let i=0;i<=numY;i++){OarBlock.Y.array[i]=i;EarBlock.Y.array[i]=i;}
}