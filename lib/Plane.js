/* global Point Shape */

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