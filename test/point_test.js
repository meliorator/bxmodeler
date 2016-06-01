/**
 * Created by meliorator on 22.03.15.
 */

var point = require('../lib/Point.js');

/* global Point */

exports.group = {
    testPoint: function(test){
        'use strict';
        test.expect(1);

        //point = new Point();
        var relate = point.relateCoordinates();
        test.ok(relate.x, "Test x coordinate");
        test.ok(relate.y, "Test y coordinate");
        test.done();
    }
};
