/* global SVG, Plane */
/**
 * Основной класс доски инициализирует остальных.
 * @constructor
 */
function Board(boardId) {

    'use strict';
    var planes = [], drawDoc, definePlanes = ['p1', 'p2', 'p3'],
        halfSpaceBetween = 5,
        spaceBetween = halfSpaceBetween * 2,
        halfPlaneBorder = 1,
        planeBorder = halfPlaneBorder * 2,
        shapeBorder = 1,
        boardHeight = 600,
        boardWidth = 600,
        planHeight = (boardHeight >> 1) - spaceBetween,
        planWidth = (boardWidth >> 1) - spaceBetween,
        shapeCounter = 1;

    //var onClick = function (plane, e) {
    //    console.log(plane);
    //    console.log(e);
    //    alert('rfer');
    //};

    this.getSpaceBetweenPlans = function(){
        return spaceBetween;
    };

    this.getHalfPlaneBorder = function(){
        return halfPlaneBorder;
    };

    this.svg = function(){
        return drawDoc;
    };

    this.getNextShapeId = function(){
        shapeCounter++;
        return shapeCounter;
    };

    this._init = function () {
        //var that = this;
        drawDoc = SVG(boardId).size(boardWidth, boardHeight);
        for (var i = 0; i < definePlanes.length; i++) {
            var planeName = definePlanes[i],
                settings = {name: planeName, board: this, planHeight: planHeight, planWidth: planWidth};
            var plane = new Plane(settings);
            //plane.subscribe(onClick);
            planes.push(plane);
        }

        drawDoc.click(function (e) {
            planes.forEach(function (item, i) {
                item.onClick(e);
            });
        });
    };


    if (SVG.supported) {
        this._init();
    } else {
        alert('SVG not supported');
    }
}
