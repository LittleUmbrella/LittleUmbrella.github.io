
function Point(x, y) {
    this.x = x;
    this.y = y;
}

// Contour object
function Polygon(points) {
    this.pts = points || []; // an array of Point objects defining the contour
}


Polygon.prototype.area = function () {
    var area = 0;
    var pts = this.pts;
    var nPts = pts.length;
    var j = nPts - 1;
    var p1; var p2;

    for (var i = 0; i < nPts; j = i++) {
        p1 = pts[i]; p2 = pts[j];
        area += p1.x * p2.y;
        area -= p1.y * p2.x;
    }
    area /= 2;

    return area;
};

Polygon.prototype.center = function () {
    var pts = this.pts;
    var nPts = pts.length;
    var x = 0; var y = 0;
    var f;
    var j = nPts - 1;
    var p1; var p2;

    if (nPts === 1) {
        return new Point(0, 0);
    }

    if (nPts === 2) {
        return new Point((pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
    }

    for (var i = 0; i < nPts; j = i++) {
        p1 = pts[i]; p2 = pts[j];
        f = p1.x * p2.y - p2.x * p1.y;
        x += (p1.x + p2.x) * f;
        y += (p1.y + p2.y) * f;
    }

    f = this.area() * 6;

    return new Point(x / f, y / f);
};

Polygon.prototype.radius = function (offsetX, offsetY) {
    //alert('x: ');
    var printArr = this.pts;
    //var nPts = pts.length;
    //alert('x: ');
    var maxDist = 0;
    var dist;
    var outerPoint;
    var innterPoint;
    var side1;
    var side2;

    for (var o = 0; o < printArr.length; o++) {
        outerPoint = printArr[o];
        for (var b = 0; b < printArr.length; b++) {
            innterPoint = printArr[b];
            if (innterPoint === outerPoint)
                continue;

            side1 = Math.abs(innterPoint.x - outerPoint.x) + (offsetX || 0); // + ((num/5) * diameter);//
            side2 = Math.abs(innterPoint.y - outerPoint.y) + (offsetX || 0); // + ((num/5) * diameter);//

            dist = (side1 * side1) + (side2 * side2);

            if (dist > maxDist)
                maxDist = dist;
        }
    }
    return Math.sqrt(maxDist) / 2;
};
   

  