var block = new Array(), bx = 0;

function hexagon(nowx, nowy , addx, addy, radius) {
        let angle = Math.PI*2/6;
        beginShape();
        for(let nowAngle=0;nowAngle<Math.PI*2;nowAngle+=angle) {
            let tx = addx + nowx * radius * 3 + Math.cos(nowAngle) * radius;
            let ty = addy + nowy * radius * 1.75 + Math.sin(nowAngle) * radius;
            vertex(tx,ty);
        }
        endShape(CLOSE);
        pop();
}

function setup() {
    var radius = 5;
    createCanvas(1580,875);

    for(let i=0;i<12;i++)
    {
        for(let j=0;j<13;j++){block[bx] = new Array();hexagon(j, i, radius, radius*0.875, radius);bx++;}
        for(let j=0;j<13;j++){block[bx] = new Array();hexagon(j, i, radius*5/2, radius*1.75, radius);bx++;}
    }
}

function draw() {
    
}