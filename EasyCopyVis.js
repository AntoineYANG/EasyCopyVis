/*
 * @Author: Antoine YANG
 * @Date: 2019-07-25 15:53:54
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2019-07-27 12:23:08
 */
var Box = /** @class */ (function () {
    function Box() {
        var _this = this;
        this.div = null;
        $('body').append('<div></div>');
        this.div = $('body div:last');
        this.div.css('background', '#44444488')
            .css('border', '1px solid black')
            .css('position', 'absolute')
            .css('left', ((Box.count++) * 80) % 600 + 100 + "px")
            .css('top', ((Box.count++) * 40) % 600 + 40 + "px")
            .css('width', '180px')
            .css('height', '120px')
            .addClass('parentbox')
            .addClass('fixed')
            .mousedown(function (event) {
            var dx = event.pageX - parseFloat($(this).css('left'));
            var dy = event.pageY - parseFloat($(this).css('top'));
            $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
        })
            .mouseover(function (event) {
            var dx = event.pageX - parseFloat($(this).css('left'));
            var dy = event.pageY - parseFloat($(this).css('top'));
            if (!Box.ready || dx < 0 || dx > parseFloat($(this).css('width')) ||
                dy < 0 || dy > parseFloat($(this).css('height')))
                return;
            $(this).addClass('ready').css('background', '#bbbbbb88');
        })
            .mouseout(function () {
            if ($(_this.div).hasClass('ready'))
                $(_this.div).removeClass('ready').css('background', '#44444488');
        })
            .dblclick(function () {
            _this.div.remove();
        });
    }
    Box.count = 0;
    Box.ready = false;
    return Box;
}());
$(document).ready(function () {
    $('body').append('<div></div>');
    $('body div:last').css('background', '#bbbbbb')
        .css('border', '1px solid black')
        .css('position', 'absolute')
        .css('top', '0px')
        .css('left', '0px')
        .css('padding', '4px 6px 4px 26px')
        .css('-webkit-user-select', 'none')
        .css('-moz-user-select', 'none')
        .css('-o-user-select', 'none')
        .css('user-select', 'none')
        .addClass('fixed')
        .attr('id', 'boxtoolstrip')
        .mousedown(function (event) {
        var dx = event.pageX - parseFloat($(this).css('left'));
        dx = dx + parseFloat($(this).css('width')) > parseFloat($('body').css('width'))
            ? parseFloat($('body').css('width')) - parseFloat($(this).css('width')) : dx;
        var dy = event.pageY - parseFloat($(this).css('top'));
        dy = dy + parseFloat($(this).css('height')) > parseFloat($('body').css('height'))
            ? parseFloat($('body').css('height')) - parseFloat($(this).css('height')) : dy;
        $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
    });
    $('body div:last').append('<button></button>');
    $('body div:last button:last').attr('type', 'button')
        .text('Add box')
        .css('width', '80px')
        .click(function () {
        new Box();
    });
    $('body div:last').append('<button></button>');
    $('body div:last button:last').attr('type', 'button')
        .css('margin-left', '6px')
        .text('Hide all')
        .css('width', '80px')
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
        .css('width', '50px')
        .click(function () {
        $('.parentbox').remove();
        Box.count = 0;
    });
    $('body').mouseup(function () {
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
                var dx = event.pageX - parseFloat($(this).css('left'));
                var dy = event.pageY - parseFloat($(this).css('top'));
                $(this).addClass('active').removeClass('fixed').attr('_dx_', dx).attr('_dy_', dy);
            })
                .mouseover(function (event) {
                var dx = event.pageX - parseFloat($(this).css('left'));
                var dy = event.pageY - parseFloat($(this).css('top'));
                if (!Box.ready || dx < 0 || dx > parseFloat($(this).css('width')) ||
                    dy < 0 || dy > parseFloat($(this).css('height')))
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
        var x = event.pageX - parseFloat($('div.active').attr('_dx_'));
        var y = event.pageY - parseFloat($('div.active').attr('_dy_'));
        $('div.active').css('top', y + "px").css('left', x + "px");
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
    });
});
