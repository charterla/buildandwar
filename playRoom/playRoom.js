var playBoard = document.getElementById("playBoard");
var context = playBoard.getContext("2d");
var block = new Array(), bx = 0;

function hexagon(nowx, nowy, addx, addy, radius) {
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

window.onload = function (){
    var radius = 20;

    for(let i=0;i<12;i++)
    {
        for(let j=0;j<13;j++){hexagon(j, i, radius, radius*0.875, radius);}
        for(let j=0;j<13;j++){hexagon(j, i, radius*5/2, radius*1.75, radius);}
    }
}