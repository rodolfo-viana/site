function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('elbow-container'); // Attach the canvas to a specific div
    background('#1f1f1f');
    drawElbowGraph();
  }
  
  function drawElbowGraph() {
    let points = [
      { x: 1, y: 9000 },
      { x: 2, y: 4000 },
      { x: 3, y: 2000 },
      { x: 4, y: 1500 },
      { x: 5, y: 1300 },
      { x: 6, y: 1200 },
      { x: 7, y: 1100 }
    ];
    
    let padding = 100;
    let graphWidth = width - 1.5 * padding;
    let graphHeight = height;
    
    textFont('monospace');
    fill('#f0f0f0');
    strokeWeight(0);
    
    // Draw Axes
    stroke('#f0f0f0');
    strokeWeight(1);
    line(padding, height - padding, width - 0.5 * padding, height - padding); // X-axis
    line(padding, height - padding, padding, 0.5 * padding); // Y-axis
    
    // Draw X-axis Labels
    textSize(14);
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    for (let i = 1; i <= 7; i++) {
      let x = map(i, 1, 7, padding, padding + graphWidth);
      text(i, x, height - padding + 20);
    }
    
    // Draw Y-axis Labels
    let yValues = [10000, 8000, 6000, 4000, 2000];
    for (let i = 0; i < yValues.length; i++) {
      let y = map(yValues[i], 0, 10000, height - padding, 0.5 * padding);
      text(yValues[i], padding - 30, y);
    }
    
    // Scale points
    let maxY = 10000;
    let scaledPoints = points.map(p => {
      return {
        x: map(p.x, 1, 7, padding, padding + graphWidth),
        y: map(p.y, 0, maxY, height - padding, 0.5 * padding)
      };
    });
    
    // Draw Line Chart
    stroke('#ababab');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let p of scaledPoints) {
      vertex(p.x, p.y);
    }
    endShape();
    
    // Draw Points
    fill('#ababab');
    noStroke();
    for (let p of scaledPoints) {
      ellipse(p.x, p.y, 10, 10);
    }
    
    // Highlight Elbow Point
    let elbowPoint = scaledPoints[2];
    stroke('#ef5350');
    noFill();
    strokeWeight(2);
    ellipse(elbowPoint.x, elbowPoint.y, 20, 20);
    
    // Dotted Line to Annotation
    stroke('#ef5350');
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    line(elbowPoint.x + 10, elbowPoint.y - 10, elbowPoint.x + 60, elbowPoint.y - 60);
    drawingContext.setLineDash([]);
    
    // Annotation
    noStroke();
    fill('#f0f0f0');
    textSize(12);
    text("Cotovelo", elbowPoint.x + 70, elbowPoint.y - 70);
    
    // X and Y Labels
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Quantidade de clusters", width / 2, height - 50);
    push();
    rotate(-PI / 2);
    text("Soma do quadrado das distâncias", -height / 2, 20);
    pop();
  }