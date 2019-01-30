let data = []
let circleSize = 10
let m = 1;
let b = 0;
function setup() {
    createCanvas(800,600)
    background(50)
}
function mousePressed() {
    //console.log(mouseX,mouseY)
    let x = map(mouseX,0,width,0,1)
    let y = map(mouseY,0,height,1,0)
    let point = createVector(x,y)
    data.push(point)

}

function draw() {
    background(50)
    for(let i = 0; i < data.length; i++) {
        let x = map(data[i].x,0,1,0,width)
        let y = map(data[i].y,0,1,height,0)
        fill(255)
        stroke(255)
        ellipse(x,y,circleSize,circleSize)
    }
    linearRegression()
    drawLine()
}

function drawLine() {
    let x1 = 0;
    let x2 = 1;
    let y1 = m * x1 + b;
    let y2 = m * x2 + b;
    //根据画框比例缩放
    x1 = map(x1,0,1,0,width)
    x2 = map(x2,0,1,0,width)
    y1 = map(y1,0,1,height,0)
    y2 = map(y2,0,1,height,0)
    stroke(255)
    line(x1,y1,x2,y2)
}
//计算斜律
function linearRegression() {
    let sumOfX = 0
    let sumOfY = 0
    for(let i = 0; i < data.length; i++) { 
        sumOfX += data[i].x
        sumOfY += data[i].y
    }
    let averageX = sumOfX / data.length
    let averageY = sumOfY / data.length

    let above = 0
    let below = 0
    for(let i = 0; i < data.length; i++) {
        above += (data[i].x - averageX) * (data[i].y - averageY)
        below += (data[i].x - averageX) * (data[i].x - averageX) 
    }


    m = above / below
    b = averageY - m * averageX
}