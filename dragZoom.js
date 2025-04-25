;
(function(jQuery, window, document, undfined) {
    var DragZoom = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            minzoom: 1,
            maxzoom: 5,
            zoom: 1,
            speed: 0.7,
            scope: null,
            onWheelStart: null,
            onWheelEnd: null,
            onDragStart: null,
            onDragMove: null,
            onDragEnd: null
        };

        this.options = $.extend({}, this.defaults, opt);
        this.defaultValues = {};
    }
    DragZoom.prototype = {
        Init: function() {
            var self = this;
            self.x = this.$element.offset().left;
            self.y = this.$element.offset().top;
            self.width = this.$element.width();
            self.height = this.$element.height();
            self.scale = 1;
            self.relX = 0;
            self.relY = 0;
            self.isMoved = false;

            self.defaultValues = {'x':self.x, 'y':self.y };

            self.$element.on('mouseout', function(e) {
                $('img[usemap]').css("cursor", "grab");
                return false;
            }).on('mousewheel', function(e, delta) {                
                var size = delta * self.options.speed;
                self.options.zoom = (self.options.zoom * 10 + delta) / 10;
                self.wheel(e, self);
                return false;
            }).on('mousedown', function(e) {
                $('img[usemap]').css("cursor", "grabbing");
                self.start(e, self);
                return false;
            }).on('mouseup', function(e) {
                $('img[usemap]').css("cursor", "grab");
            });

            $(document).on('mousemove', function(e) {
                /*
                 if (self.options.zoom > 1) {
                     self.move(e, self);
                 }
                     */
                self.move(e, self);
                return false;
            }).on('mouseup', function(e) {
                self.end(e, self);
                return false;
            });
            return self.$element;
        },
        wheel: function(ev, self) {
            
            if (self.options.zoom >= self.options.minzoom && self.options.zoom <= self.options.maxzoom) {

                self.options.onWheelStart && typeof self.options.onWheelStart == 'function' ? self.options.onWheelStart() : null;

                var cursor_x = ev.pageX,
                    cursor_y = ev.pageY;

                var eleOffset = self.$element.find('img').offset();
                self.x = eleOffset.left;
                self.y = eleOffset.top;

                self.x = self.x - (cursor_x - self.x) * (self.options.zoom - self.scale) / self.scale;
                self.y = self.y - (cursor_y - self.y) * (self.options.zoom - self.scale) / self.scale;

                $('img[usemap]').css("cursor", self.options.zoom > self.scale ? "zoom-in" : "zoom-out");
                self.scale = self.options.zoom;
                
                self.$element.find('img').offset({
                    top: self.y,
                    left: self.x
                });
                self.$element.find('canvas').offset({
                    top: self.y,
                    left: self.x
                });
                //self.$element.width(self.width * self.scale).height(self.height * self.scale);
                //self.$element.find('img').width(self.width * self.scale).height(self.height * self.scale);
                //self.$element.find('img').animate({ width: self.width * self.scale, height: self.height * self.scale}, 0);
                $('img[usemap]').mapster('resize', self.width * self.scale, self.height * self.scale, 0);
                
                
                

                

                self.options.onWheelEnd && typeof self.options.onWheelEnd == 'function' ? self.options.onWheelEnd() : null;
            }
            self.options.zoom = self.options.zoom < self.options.minzoom ? self.options.minzoom :
                (self.options.zoom > self.options.maxzoom ? self.options.maxzoom : self.options.zoom);
        },
        start: function(ev, self) 
        {
            self.isMoved = true;
            var selfOffset = self.$element.find('img').offset();
            
            /*
            if(self.x == 0 && ev.clientX - selfOffset.left > 0) {
                //.preventDefault();
                return;
            }
            else if(self.y == 0 && ev.clientY - selfOffset.top) {
                //e.preventDefault();
                return;
            }
            else    
                self.isMoved = true;
            */
                

            self.relX = ev.clientX - selfOffset.left;
            self.relY = ev.clientY - selfOffset.top;
/*
            if(self.relX > 0) {
                self.relX = 0;
            }
            if(self.relY > 0) {
                self.relY = 0;
            }
*/
            self.options.onDragStart ? self.options.onDragStart() : null;

        },
        move: function(ev, self) {
            if (self.isMoved) {
/*
                if(ev.clientX - self.relX > 0 && self.x < 0) {
                    self.relX = ev.clientX;
                }
                if(ev.clientY - self.relY > 0 && self.y > 0) {
                    self.relY = ev.clientY;
                }*/
                self.y = ev.clientY - self.relY;
                self.x = ev.clientX - self.relX;

                //self.$element.css({'top': self.y, 'left': self.x});
                
                self.$element.find('img').offset({
                    top: self.y,
                    left: self.x
                });

                // self.$element.animate({ top: self.y + 'px', left: self.x + 'px' });

                self.options.onDragMove && typeof self.options.onDragMove == 'function' ? self.options.onDragMove() : null;
                
            }
        },
        end: function(ev, self) {
            self.isMoved = false;

            var offset = self.$element.find('img').offset();
            self.$element.find('canvas').offset(offset);
            
            self.options.onDragEnd && typeof self.options.onDragEnd == 'function' ? self.options.onDragEnd() : null;
        }
    };

    var dragzoom;
    jQuery.fn.dragZoom = function(options) {
        dragzoom = new DragZoom(this, options);
        return dragzoom.Init();
    }
    jQuery.fn.dragZoomClear = function() {
        if (dragzoom) {
            dragzoom.options.zoom = 1;
            dragzoom.scale = 1;
            dragzoom.x = dragzoom.defaultValues.x;
            dragzoom.y = dragzoom.defaultValues.y;
            dragzoom.$element.find('img').offset({
                top: dragzoom.y,
                left: dragzoom.x 
            });
            self.isMoved = true;
            dragzoom.end(null,dragzoom);
            dragzoom.wheel({'pageX': 0, 'pageY': 0},dragzoom);
        }
    }
    jQuery.fn.dragZoomChangeZoom = function(changeRatio) {
        if (dragzoom) {
            dragzoom.options.zoom = dragzoom.options.zoom + changeRatio;
            //dragzoom.scale = dragzoom.scale + 0.2;
            /*
            dragzoom.x = dragzoom.defaultValues.x;
            dragzoom.y = dragzoom.defaultValues.y;
            dragzoom.$element.find('img').offset({
                top: dragzoom.y,
                left: dragzoom.x 
            });
            self.isMoved = true;
            dragzoom.end(null,dragzoom);*/
            
            dragzoom.wheel({'pageX': dragzoom.x + (dragzoom.$element.find('img').width()/2), 'pageY': dragzoom.y + (dragzoom.$element.find('img').height()/2)},dragzoom);
        }
    }

})($, window, document, undefined);
