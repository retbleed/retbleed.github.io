let madridOffset = 0;
let newYorkOffset = -6;
let buenosAiresOffset = -3;

let hourOffset = 0;
let minuteOffset = 0;

let updateTimeFlag = false;

function setup() {
  createCanvas(800, 400);

  inputTime = createInput("00:00");
  inputTime.position(20, height + 20);
  inputTime.size(100);

  button = createButton("Actualizar");
  button.position(inputTime.x + inputTime.width + 10, height + 20);
  button.size(100);
  button.mousePressed(updateTime);
}

function draw() {
  background(255);
  if (updateTimeFlag) {
    hourOffset = parseInt(inputTime.value().substring(0, 2));
    minuteOffset = parseInt(inputTime.value().substring(3));
    updateTimeFlag = false;
  }

  let madridTime = new Date().toLocaleTimeString("es-ES", { timeZone: "Europe/Madrid" });
  let madridHour = parseInt(madridTime.substring(0, 2));
  let madridMinutes = parseInt(madridTime.substring(3, 5));
  let madridSeconds = parseInt(madridTime.substring(6));

  let newYorkTime = (madridHour + newYorkOffset + hourOffset) % 24;
  let buenosAiresTime = (madridHour + buenosAiresOffset + hourOffset) % 24;

  drawClock(width / 4, height / 2, newYorkTime, madridMinutes, madridSeconds, "New York");
  drawClock(width / 2, height / 2, buenosAiresTime, madridMinutes, madridSeconds, "Buenos Aires");
  drawClock(3 * width / 4, height / 2, madridHour, madridMinutes, madridSeconds, "Madrid");
}

function drawClock(x, y, hour, minute, second, cityName) {
  let radius = 80;
  drawCircle(x, y, radius);

  let hourAngle = map((hour % 12) * 60 + minute, 0, 720, 0, TWO_PI) - HALF_PI;
  let hourLength = 0.5 * radius;
  let hourX = x + cos(hourAngle) * hourLength;
  let hourY = y + sin(hourAngle) * hourLength;

  let minuteAngle = map(minute, 0, 60, 0, TWO_PI) - HALF_PI;
  let minuteLength = 0.8 * radius;
  let minuteX = x + cos(minuteAngle) * minuteLength;
  let minuteY = y + sin(minuteAngle) * minuteLength;

  let secondAngle = map(second, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondLength = 0.9 * radius;
  let secondX = x + cos(secondAngle) * secondLength;
  let secondY = y + sin(secondAngle) * secondLength;

  line(x, y, hourX, hourY);
  line(x, y, minuteX, minuteY);
  line(x, y, secondX, secondY);

  fill(0);
  circle(x, y, 5);

  textAlign(CENTER, TOP);
  textSize(14);
  text(cityName, x, y + radius + 10);
  text(nf(hour, 2) + ":" + nf(minute, 2) + ":" + nf(second, 2), x, y + radius + 30);
}

function updateTime() {
    updateTimeFlag = true;
    let inputHour = parseInt(inputTime.value().substring(0, 2));
    madridOffset = inputHour - new Date().getHours();
  }
  

function drawCircle(xc, yc, r) {
  let x = r;
  let y = 0;
  let P = 1 - r;
  noFill();
  stroke(10);
  ellipse(xc, yc, 2 * r);

  while (x > y) {
    point(x + xc, y + yc);
    point(-x + xc, y + yc);
    point(x + xc, -y + yc);
    point(-x + xc, -y + yc);
    point(y + xc, x + yc);
    point(-y + xc, x + yc);
    point(y + xc, -x + yc);
    point(-y + xc, -x + yc);

    y++;

    if (P <= 0) P = P + 2 * y + 1;
    else {
      x--;
      P = P
    }
  }
}

function functionDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;
  let x = x1;
  let y = y1;

  for (let i = 0; i <= steps; i++) {
    point(x, y);
    x += xIncrement;
    y += yIncrement;
  }
}

function functionBresenham(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let p = 2 * dy - dx;
  let x = x1;
  let y = y1;

  while (x <= x2) {
    point(x, y);
    x++;

    if (p < 0) p += 2 * dy;
    else {
      p += 2 * (dy - dx);
      y++;
    }
  }
}
