/*
 * @Author: Antoine YANG 
 * @Date: 2019-07-25 15:53:54 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-08-01 22:29:23
 */
class Box {
    static count: number = 0;
    static ready: boolean = false;
    div = null;

    constructor() {
        $('body').append('<div></div>');
        this.div = $('body div:last');
        this.div.css('background', '#44444488')
            .css('border', '1px solid black')
            .css('position', 'absolute')
            .css('left', `${((Box.count++) * 80) % 600 + 100}px`)
            .css('top', `${((Box.count++) * 40) % 600 + 40}px`)
            .css('width', '180px')
            .css('height', '120px')
            .css('min-width', '40px')
            .css('min-height', '30px')
            .addClass('parentbox')
            .addClass('fixed')
            .mousedown(function (event) {
                let dx: number = event.pageX - parseFloat($(this).css('left'));
                let dy: number = event.pageY - parseFloat($(this).css('top'));
                $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
            })
            .mouseover(function (event) {
                let dx: number = event.pageX - parseFloat($(this).css('left'));
                let dy: number = event.pageY - parseFloat($(this).css('top'));
                if (!Box.ready || dx < 0 || dx > parseFloat($(this).css('width')) ||
                    dy < 0 || dy > parseFloat($(this).css('height')))
                    return;
                $(this).addClass('ready').css('background', '#bbbbbb88');
            })
            .mouseout(() => {
                if ($(this.div).hasClass('ready'))
                    $(this.div).removeClass('ready').css('background', '#44444488');
            })
            .dblclick(() => {
                this.div.remove();
            });
    }
}

$(document).ready(() => {
    $('body').append('<div></div>');
    $('body div:last').css('background', '#bbbbbb')
        .css('border', '1px solid black')
        .css('border-radius', '3px 12px 4px 16px')
        .css('position', 'absolute')
        .css('top', `${$('body').css('margin-top')}`)
        .css('left', `${$('body').css('margin-left')}`)
        .css('width', 'auto')
        .css('height', 'auto')
        .css('padding', '4px 6px 4px 26px')
        .css('-webkit-user-select', 'none')
        .css('-moz-user-select', 'none')
        .css('-o-user-select', 'none')
        .css('user-select', 'none')
        .addClass('fixed')
        .attr('id', 'boxtoolstrip')
        .mousedown(function (event) {
            let dx: number = event.pageX - parseFloat($(this).css('left'));
            dx = dx + parseFloat($(this).css('width')) > parseFloat($('body').css('width'))
                ? parseFloat($('body').css('width')) - parseFloat($(this).css('width')) : dx;
            let dy: number = event.pageY - parseFloat($(this).css('top'));
            dy = dy + parseFloat($(this).css('height')) > parseFloat($('body').css('height'))
                ? parseFloat($('body').css('height')) - parseFloat($(this).css('height')) : dy;
            $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
            document.body.style.cursor = "move";
        });
    $('body div:last').append('<button></button>');
    $('body div:last button:last').attr('type', 'button')
        .text('Add...')
        .css('margin-right', '6px')
        .css('width', '70px')
        .css('border-radius', '4px')
        .click(() => {
            new Box();
        });
    $('body div:last').append('<button></button>');
    $('body div:last button:last').attr('type', 'button')
        .text('Hide all')
        .css('width', 'auto')
        .css('margin-right', '2px')
        .css('border-radius', '4px')
        .click(function () {
            if ($(this).text() == 'Hide all') {
                $('.parentbox').hide();
                $(this).text('Show all');
            }
            else {
                $('.parentbox').show();
                $(this).text('Hide all');
            }
        });
    $('body div:last').append('<button></button>');
    $('body div:last button:last').attr('type', 'button')
        .text('Clear')
        .css('width', 'auto')
        .css('border-radius', '4px')
        .click(function () {
            $('.parentbox').remove();
            Box.count = 0;
        });
    $('body').mouseup(function () {
            this.style.cursor = "auto";
            if (Box.ready) {
                Box.ready = false;
                $('div.ready').append($('.cloning').clone(true));
                $('div.ready').css('width', 'auto').css('height', 'auto').css("opacity", 0.8);
                $('.cloning').removeClass('cloning').addClass('still');
                $('div.ready').unbind();
                $('div.ready').children().unbind();
                $('div.ready').mouseover(function () {
                    $(this).css('opacity', 1.0);
                })
                .mouseout(function () {
                    $(this).css('opacity', 0.8);
                })
                .dblclick(function () {
                    $(this).remove();
                })
                .mousedown(function (event) {
                    let dx: number = event.pageX - parseFloat($(this).css('left'));
                    let dy: number = event.pageY - parseFloat($(this).css('top'));
                    $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
                    document.body.style.cursor = "move";
                })
                .mouseover(function (event) {
                    let dx: number = event.pageX - parseFloat($(this).css('left'));
                    let dy: number = event.pageY - parseFloat($(this).css('top'));
                    if (!Box.ready || dx < parseFloat($('body').css('margin-left')) || dx > parseFloat($(this).css('width')) ||
                        dy < parseFloat($('body').css('margin-top')) || dy > parseFloat($(this).css('height')))
                        return;
                    $(this).addClass('ready').css('background', '#bbbbbb88');
                })
                .mouseout(function () {
                    if ($(this).hasClass('ready'))
                        $(this).removeClass('ready').css('background', '#44444488');
                });
                $('div.ready').removeClass('ready').css('background', '#44444488');
            }
            $('div.active').addClass('fixed').removeClass('active');
        })
        .mousemove(function (event) {
            let x: number = event.pageX - parseFloat($('div.active').attr('_dx_'));
            let y: number = event.pageY - parseFloat($('div.active').attr('_dy_'));
            x = x < parseFloat($('body').css('margin-left'))
                ? parseFloat($('body').css('margin-left'))
                : x + parseFloat($('div.active').css('width')) + 18 > parseFloat($("body").css('width'))
                    ? parseFloat($("body").css('width')) - parseFloat($('div.active').css('width')) - 18
                    : x;
            y = y < parseFloat($('body').css('margin-top'))
                ? parseFloat($('body').css('margin-top'))
                : y + parseFloat($('div:active').css('height')) + 18 > parseFloat($('body').css('height'))
                    ? parseFloat($('body').css('height')) - parseFloat($('div:active').css('height')) - 18
                    : y;
            if (y + parseFloat($('div:active').css('height')) > parseFloat($('body').css('height')))
                return;
            $('div.active').css('top', `${y}px`).css('left', `${x}px`);
        })
        $('body').mouseup(function () {
            this.style.cursor = "auto";
            if (Box.ready) {
                Box.ready = false;
                $('div.ready').append($('.cloning').clone(true));
                $('div.ready').css('width', 'auto').css('height', 'auto').css("opacity", 0.8);
                $('.cloning').removeClass('cloning').addClass('still');
                $('div.ready').unbind();
                $('div.ready').children().unbind();
                $('div.ready').mouseover(function () {
                    $(this).css('opacity', 1.0);
                })
                .mouseout(function () {
                    $(this).css('opacity', 0.8);
                })
                .dblclick(function () {
                    $(this).remove();
                })
                .mousedown(function (event) {
                    let dx: number = event.pageX - parseFloat($(this).css('left'));
                    let dy: number = event.pageY - parseFloat($(this).css('top'));
                    $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
                    document.body.style.cursor = "move";
                })
                .mouseover(function (event) {
                    let dx: number = event.pageX - parseFloat($(this).css('left'));
                    let dy: number = event.pageY - parseFloat($(this).css('top'));
                    if (!Box.ready || dx < parseFloat($('body').css('margin-left')) || dx > parseFloat($(this).css('width')) ||
                        dy < parseFloat($('body').css('margin-top')) || dy > parseFloat($(this).css('height')))
                        return;
                    $(this).addClass('ready').css('background', '#bbbbbb88');
                })
                .mouseout(function () {
                    if ($(this).hasClass('ready'))
                        $(this).removeClass('ready').css('background', '#44444488');
                });
                $('div.ready').removeClass('ready').css('background', '#44444488');
            }
            $('div.active').addClass('fixed').removeClass('active');
        });
    $('.cloneable').addClass('still')
        .css('-webkit-user-select', 'none')
        .css('-moz-user-select', 'none')
        .css('-o-user-select', 'none')
        .css('user-select', 'none')
        .attr('ondragstart', 'return false;')
        .mousedown(function () {
            Box.ready = true;
            $(this).removeClass('still').addClass('cloning');
            document.body.style.cursor = "move";
        });
});