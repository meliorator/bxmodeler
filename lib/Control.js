/**
 * Created by meliorator on 25.03.15.
 */
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