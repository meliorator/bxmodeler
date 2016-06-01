/* global Plane Board */

function Shape(initId){

    'use strict';
    var id = initId, mainPlane, board, height = 40, width = 40;

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
        board.svg().rect(width, height).cx(x).cy(y);
    };

    this._crop = function(){

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