//JS.require('JS.Class', function () {

    eaf.util.namespace('littleUmbrella.circleverse');

    littleUmbrella.circleverse.circlefy = function (el) {
        var $el = (el instanceof $) ? el : $(el);
        $el.jCircle().wheel(function (event) {//{ backgroundColor: 'white' }
            //alert(event.delta);
            var $this = $(this)
            if ($this.is('.selected')) {
                var factor = 10;
                //                    $this.width($this.width() + (event.delta * factor));
                //                    $this.height($this.height() + (event.delta * factor));
                $.fn.jCircle.adjust($this, $this.width(), (event.delta * factor), true);
            }
            if ('undefined' !== typeof (event.stopPropagation))
                event.stopPropagation();
            if ('undefined' !== typeof (event.preventDefault))
                event.preventDefault();
            if ('undefined' !== typeof (event.stopImmediatePropagation))
                event.stopImmediatePropagation();
        });
    };

    littleUmbrella.circleverse.dragify = function (el) {
        var $el = (el instanceof $) ? el : $(el);
        var settings = { relative: true, click: false, distance: 3 };

        $el
                .dragx($.fn.dragx.prototype.eventNames.dragxselect, function (ev, e, dd) {
                    //log('draginit:' + this.id);
                    var _this = this;
                    var $this = $(_this);

                    if ('undefined' !== typeof (dd.toggle) && dd.toggle) {
                        $this.toggleClass('selected');
                    }

                    if ('undefined' !== typeof (dd.selected)) {
                        if (dd.selected) {
                            $this.addClass('selected');
                        }
                        else {
                            $this.removeClass('selected');
                        }
                    }


                }, settings)
                .dragx($.fn.dragx.prototype.eventNames.dragxinit, function (e, ddev, dd) {
                    //log('draginit:' + this.id);
                    var _this = this;
                    var $this = $(_this);

                }, settings)
                .dragx($.fn.dragx.prototype.eventNames.dragxstart, function (e, ddev, dd) {
                    //log('dragstart:' + this.id);
                    var _this = this;
                    var $this = $(_this);
                    dd.attr = $(ddev.target).prop("className");
                    dd.width = $this.width();
                    dd.height = $this.height();
                    if (dd.attr.indexOf("E") > -1 || dd.attr.indexOf("S") > -1 || dd.attr.indexOf("W") > -1 || dd.attr.indexOf("N") > -1) {
                        return;
                    }

                    //reset z-index
                    //$(this).appendTo(this.parentNode);


                }, settings)
                .dragx($.fn.dragx.prototype.eventNames.dragx, function (e, ddev, dd) {
                    //log('drag:' + this.id);
                    var $this = $(this);
                    //if dragging on special resize blocks, resize
                    var cornerDrag = false;
                    var props = {};
                    if (dd.attr.indexOf("E") > -1) {
                        props.width = Math.max(32, dd.width + dd.deltaX);
                        cornerDrag = true;
                    }
                    if (dd.attr.indexOf("S") > -1) {
                        props.height = Math.max(32, dd.height + dd.deltaY);
                        cornerDrag = true;
                    }
                    if (dd.attr.indexOf("W") > -1) {
                        props.width = Math.max(32, dd.width - dd.deltaX);
                        props.left = dd.originalX + dd.width - props.width;
                        cornerDrag = true;
                    }
                    if (dd.attr.indexOf("N") > -1) {
                        props.height = Math.max(32, dd.height - dd.deltaY);
                        props.top = dd.originalY + dd.height - props.height;
                        cornerDrag = true;
                    }

                    $this.css(props);
                    if (cornerDrag) {
                        return;
                    }

                    //dd.update();
                    var dragdata = $(dd.drag).data('dragdata');





                    if (dd.moveWithDrag) {
                        $this.css({
                            top: dd.offsetY,
                            left: dd.offsetX
                        });
                    }

                    $this.css({
                        opacity: .5
                    });

                }, settings)
                .dragx($.fn.dragx.prototype.eventNames.dragxend, function (e, ddev, dd) {
                    //log('dragend:' + this.id);


                    var cornerDrag = false;
                    if (dd.attr.indexOf("E") > -1) {
                        cornerDrag = true;
                    }
                    if (dd.attr.indexOf("S") > -1) {
                        cornerDrag = true;
                    }
                    if (dd.attr.indexOf("W") > -1) {
                        cornerDrag = true;
                    }
                    if (dd.attr.indexOf("N") > -1) {
                        cornerDrag = true;
                    }

                    if (cornerDrag) {
                        return false;
                    }

                    var _this = this;
                    var $this = $(_this);

                    $this.css('opacity', 1);


                    if ('undefined' !== typeof (dd.newParent) && dd.newParent) {
                        $this.appendTo(dd.newParent);
                        $this.css(dd.dndposition);
                    }
                    else {
                        if ('undefined' !== typeof (dd.dndposition)) {
                            $this.animate(dd.dndposition, 420);
                        }
                    }


                    if (dd.proxy && dd.proxy.id == "draggableselector") $(dd.proxy).remove();



                    $this.removeClass("active");
                    if ('undefined' !== typeof (e.stopPropagation))
                        e.stopPropagation();
                    if ('undefined' !== typeof (e.preventDefault))
                        e.preventDefault();
                    if ('undefined' !== typeof (e.stopImmediatePropagation))
                        e.stopImmediatePropagation();
                    //$('.active').removeClass("active");

                }, settings //, { not: '#draginner' }
                );
    };



            littleUmbrella.circleverse.dropify = function (el) {
                var $el = (el instanceof $) ? el : $(el);

                $el
                .dropx($.fn.dropx.prototype.eventNames.dropxstart, function (e, ddev, dd) {//only fires when first element enters drop element, so can't be used
                    //avoiding for now - seems to fire quite a bit
                    //log('dropstart:' + this.id);
                    //return false;


                })
                .dropx($.fn.dropx.prototype.eventNames.dropxover, function (e, ddev, dd) {
                    //log('drop:' + this.id);
                    var $this = $(this);

                    $this.addClass("active");


                })
                .dropx($.fn.dropx.prototype.eventNames.dropxout, function (e, ddev, dd) {
                    //log('drop:' + this.id);
                    var $this = $(this);

                    $this.removeClass("active");


                })
                .dropx($.fn.dropx.prototype.eventNames.dropx, function (e, ddev, dd, z) {
                    var $this = $(this);

                    //                    var origColor = $this.css('backgroundColor') || "";
                    //                    var aniColor = "#d00";
                    //                    //log(origColor);
                    //                    $this.stop().animate({
                    //                        backgroundColor: aniColor
                    //                    }, 200, function () {
                    //                        $this.animate({ backgroundColor: origColor }, 300,
                    //                        function () { $this.css("background-color", ""); }
                    //                        )
                    //                    });

                    $this.addClass("dropped", 200, function () { $this.removeClass("dropped", 500) });

                })
                .dropx($.fn.dropx.prototype.eventNames.dropxselect, function (ev, e, ddev, dd) {
                    //log('dropend:' + this.id);
                    var $this = $(this);

                    if ('undefined' !== typeof (dd.toggle) && dd.toggle) {
                        $this.toggleClass('selected');
                    }

                    if ('undefined' !== typeof (dd.selected)) {
                        if (dd.selected) {
                            $this.addClass('selected');
                        }
                        else {
                            $this.removeClass('selected');
                        }
                    }
                })
                .dropx($.fn.dropx.prototype.eventNames.dropxend, function (e, ddev, dd) {
                    //log('dropend:' + this.id);
                    var $this = $(this);

                    $this.removeClass("active");
                });
            }
//});


