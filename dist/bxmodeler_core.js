/*! bxmodeler - v0.0.1 - 2015-04-02
* https://github.com/meliorator/bxmodeler
* Copyright (c) 2015 Laba Mykola; Licensed MIT */
function Control() {
    'use strict';

    var $board;
    /**
     *
     * @param {MouseEvent} e
     */
    this.onClick = function (e) {
        console.log('x=' + e.clientX + ' y=' + e.clientY);
    };

    /**
     *
     * @param {MouseEvent} e
     */
    this.getX = function (e) {
        var pos, targetId = e.target.id;
        if($board === undefined){
            $board = $('#' + targetId);
        }
        if (e.offsetX == undefined) // this works for Firefox
        {
            pos = e.pageX - $board.offset().left;
        }
        else                     // works in Google Chrome
        {
            pos = e.offsetX;
        }
        return pos;
    };

    /**
     *
     * @param {MouseEvent} e
     */
    this.getY = function (e) {
        var pos, targetId = e.target.id;
        if($board === undefined){
            $board = $('#' + targetId);
        }
        if (e.offsetY == undefined) // this works for Firefox
        {
            pos = e.pageY - $board.offset().top;
        }
        else                     // works in Google Chrome
        {
            pos = e.offsetY;
        }
        return pos;
    };
}
/**
 *
 * @constructor
 */
function Point(x, y) {

    'use strict';
    var relateX = 0, relateY = 0;


    this.abstractCoordinates = function () {

    };

    this.relateCoordinates = function () {

    };
}

Point.prototype = new Control();
function Shape(initId){

    'use strict';
    var id = initId, mainPlane, board;

    /**
     *
     * @param {Plane} plane
     */
    this.setMainPlane = function(plane){
        mainPlane = plane;
        board = plane.getBoard();
    };

    this.show = function(e){
        var x = this.getX(e), y = this.getY(e);
        board.svg().rect(40, 40).cx(x).cy(y);
    };

    this._init = function(){

    };

    this._init();
    //var fromPoint = 0, toPoint = 0, id = initId;
    //
    //this.getFromPoint = function(){
    //    return fromPoint;
    //};
    //
    //this.getToPoint = function(){
    //    return toPoint;
    //};
}

/* global Control*/
Shape.prototype = new Control();
function Rectangle(){
    'use strict';
    var shape = new Shape();
}

/**
 *
 * @constructor
 */
function Circle(){
    'use strict';
    var shape = new Shape();
}

/**
 *
 * @param options
 * @constructor
 */
function Plane(options) {
    'use strict';
    var plane,
        name = options.name,
        board = options.board,
        width = options.planWidth,
        height = options.planHeight,
        topLeft, bottomRight,
        border, offsetLeft, offsetTop, shapes = [],
        spaceBetween = board.getSpaceBetweenPlans();

    this.getName = function () {
        return name;
    };

    /**
     *
     * @returns {Board}
     */
    this.getBoard = function(){
        return board;
    };

    this._init = function () {
        switch (name) {
            case 'p1':
                offsetTop = height + spaceBetween;
                offsetLeft = 0;
                //topLeft = new Point(0, offsetTop);
                //bottomRight = new Point(width, (height * 2) + spaceBetween);
                break;
            case 'p2':
                offsetTop = 0;
                offsetLeft = 0;
                //topLeft = new Point(0, 0);
                //bottomRight = new Point(width, height);
                break;
            case 'p3':
                offsetTop = 0;
                offsetLeft = width + spaceBetween;
                //topLeft = new Point(width + spaceBetween, 0);
                //bottomRight = new Point((width * 2) + spaceBetween, height);
                break;
        }

        showBorder();
    };

    /**
     *
     * @param {int} shapeId
     * @param {MouseEvent} e
     */
    this.addShape = function (shapeId, e) {
        var shape = new Shape(shapeId);
        shape.setMainPlane(this);
        shape.show(e);
        shapes.push(shape);
    };

    this.removeShape = function (shapeId) {

    };

    /**
     *
     * @param {MouseEvent} e
     */
    this.isActive = function (e) {
        var left = offsetLeft, top = offsetTop, right = left + width, bottom = top + height;
        if (this.getX(e) > left && this.getX(e) < right) {
            if (this.getY(e) > top && this.getY(e) < bottom) {
                return true;
            }
        }
        return false;
    };
    /**
     * Переводит координаты абсолютные(точка клика мышкой, например) в координаты относительные(проекционных плоскостей)
     * @param   {Object} absolute обьект, содержащий свойства x, y
     * @returns {Object} coordinates обьект, содержащий свойства x, y или z для указанной плоскости
     */
    this.toRelations = function (absolute) {
        var halfPlaneBorder = board.getHalfPlaneBorder();
        if (name === 'p1') {
            return {
                x: width - (absolute.x + halfPlaneBorder),
                y: absolute.y - (height + spaceBetween + halfPlaneBorder)
            };
        }
        if (name === 'p2') {
            return {
                x: width - (absolute.x + halfPlaneBorder),
                z: height - (absolute.y + halfPlaneBorder)
            };
        }
        if (name === 'p3') {
            return {
                y: absolute.x - (width + spaceBetween + halfPlaneBorder),
                z: height - (absolute.y + halfPlaneBorder)
            };
        }
    };

    //function expandRelationCoordinates(planName, coordinates, random){
    //    if (planName == 'p1') {
    //        coordinates.z = random;
    //    } else if (planName = 'p2') {
    //        coordinates.y = random;
    //    } else if (planName == 'p3') {
    //        coordinates.x = random;
    //    }
    //    return coordinates;
    //}

    /**
     *
     * @param {MouseEvent} e
     */
    this.onClick = function (e) {
        if(this.isActive(e)){
            this.addShape(0, e);
        //console.log('plane: ' + name + ' offsetX: ' + this.getX(e)+ ' offsetY: ' + this.getY(e));
        //var relations = this.toRelations({x: this.getX(e), y: this.getY(e)});
        //console.log(relations);
        }
    };

    function showBorder() {
        plane = board.svg()
            .rect(width, height)
            .y(offsetTop)
            .x(offsetLeft)
            .fill('none')
            .stroke({color: '#000', width: 1});
    }

    this._init();
}
/* global Control */
Plane.prototype = new Control();
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
