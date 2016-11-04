(function() {
    $.fn.cardiogram = function(opts) {

        var options = {
            parts: 100, //切割数量
            width_mt: 4260, //外框容器宽度.(与图片宽度一致)
            height_mt: 1160, //外框容器高度.(与图片高度一致)
            img_url: 'images/wave2.png', //默认图片.
            dir: 'left', //切割方向
            reverse: false //是否循环切割
        }
        opts = $.extend(options, opts);
        return this.each(function() {
            new _cardiogram(this, opts)
        })
    }

    var _cardiogram = function(elem, opts) {
        this.elem = elem;
        this.opts = opts;
        this.imgIndex = 0; //当前图片
        this.cut_w = opts.width_mt / opts.parts; //小块宽度
        this.cut_h = opts.height_mt; //小块高度
        this.cutParts(this)
    };
    _cardiogram.prototype = {
        //	设置小div进行图片切割.
        cutParts: function() {
            for (var i = 0; i < this.opts.parts; i++) {
                var cutElem = '<em class="cut_mt" style=" \
            		display: inline-block;\
            		opacity: 0.3;\
                width:' + this.cut_w + 'px; \
                height:' + this.cut_h + 'px; \
                background-image:url(' + this.opts.img_url +
                    ');\
                background-repeat:no-repeat; \
                background-position:' + (-i * this.cut_w) + 'px ' + 0 + 'px"\
              ></em>';
                $(this.elem).append(cutElem);
            }
            this.opts.dir == 'left' ? this.startCut() : this.startCutRight()
        },
        startCut: function() {
            var that = this;
            var $cut_mt = $(that.elem).find(".cut_mt");
            $cut_mt.eq(that.imgIndex).animate({
                opacity: 1
            }, 30, function() {
                $cut_mt.eq(that.imgIndex).animate({
                    opacity: 0.7
                }, 30, function() {
                    if (that.imgIndex < that.opts.parts - 1) {
                        that.imgIndex++;
                        that.startCut();
                    } else {
                        that.imgIndex = 0;
                        if (that.opts.reverse) {
                            that.opts.dir = 'right';
                            that.startCutRightReverse();
                        } else {
                            $cut_mt.animate({
                                opacity: 0.2
                            }, 50);
                            that.startCut();
                        }
                    }
                });
            });
        },
        startCutRight: function(_imgIndex) {
            var that = this;
            var $cut_mt = $(that.elem).find(".cut_mt");
            var imgIndex = that.opts.parts - 1;
            if (_imgIndex >= 0) {
                imgIndex = _imgIndex
            }
            $cut_mt.eq(imgIndex).animate({
                opacity: 1
            }, 30, function() {
                $cut_mt.eq(imgIndex).animate({
                    opacity: 0.6
                }, 30, function() {
                    if (imgIndex > 0) {
                        imgIndex--;
                        that.startCutRight(imgIndex);
                    } else {
                        imgIndex = that.opts.parts - 1;

                        if (that.opts.reverse) {
                            that.opts.dir = 'left';
                            that.startCut();
                        } else {
                            $cut_mt.animate({
                                opacity: 0.2
                            }, 50);
                            that.startCutRight(imgIndex);
                        }
                    }
                });
            });
        },
        startCutRightReverse: function(_imgIndex) {
            var that = this;
            var $cut_mt = $(that.elem).find(".cut_mt");
            var imgIndex = that.opts.parts - 1;
            if (_imgIndex >= 0) {
                imgIndex = _imgIndex
            }
            $cut_mt.eq(imgIndex).animate({
                opacity: 1
            }, 30, function() {
                $cut_mt.eq(imgIndex).animate({
                    opacity: 0.2
                }, 30, function() {
                    if (imgIndex > 0) {
                        imgIndex--;
                        that.startCutRightReverse(imgIndex);
                    } else {
                        imgIndex = that.opts.parts - 1;

                        if (that.opts.reverse) {
                            that.opts.dir = 'left';
                            that.startCut();
                        } else {
                            $cut_mt.animate({
                                opacity: 0.2
                            }, 50);
                            that.startCutRightReverse(imgIndex);
                        }
                    }
                });
            });
        }
    };
})()
