"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var Draggable = (function () {
    function Draggable(element) {
        var _this = this;
        this.element = element;
        this.mouseup = new core_1.EventEmitter();
        this.mousedown = new core_1.EventEmitter();
        this.mousemove = new core_1.EventEmitter();
        this.mouseout = new core_1.EventEmitter();
        this.sizeChange = -1;
        this.sizeOnChange = false;
        this.sizePosition = "";
        this.element.nativeElement.style.position = 'absolute';
        this.element.nativeElement.style.height = "150px";
        this.element.nativeElement.style.width = "150px";
        Rx_1.map;
        Rx_1.merge;
        this.mousedrag = this.mousedown.map(function (event) {
            return {
                top: event.clientY - _this.element.nativeElement.offsetTop,
                left: event.clientX - _this.element.nativeElement.offsetLeft
            };
        })
            .flatMap(function (imageOffset) { return _this.mousemove.merge(_this.mouseout).map(function (pos) { return ({
            top: pos.clientY - imageOffset.top,
            left: pos.clientX - imageOffset.left
        }); })
            .takeUntil(_this.mouseup); });
    }
    Draggable.prototype.onMouseup = function (event) {
        this.mouseup.emit(event);
        this.sizeChange = -1;
    };
    Draggable.prototype.onMousedown = function (event) {
        var elementTop = this.element.nativeElement.getBoundingClientRect().top;
        var elementLeft = this.element.nativeElement.getBoundingClientRect().left;
        var elementHeight = this.element.nativeElement.style.height.replace("px", "") / 1;
        var elementWidth = this.element.nativeElement.style.width.replace("px", "") / 1;
        this.mousedown.emit(event);
        if (event.clientY - elementTop < 20) {
            this.sizePosition = "top";
        }
        else if (elementTop + elementHeight - event.clientY < 20) {
            this.sizePosition = "bottom";
        }
        else if (event.clientX - elementLeft < 20) {
            this.sizePosition = "left";
        }
        else if (elementLeft + elementWidth - event.clientX < 20) {
            this.sizePosition = "right";
        }
        else {
            this.sizePosition = "";
        }
        if (this.sizePosition == "") {
            this.sizeOnChange = false;
        }
        else {
            this.sizeOnChange = true;
        }
        return false; // Call preventDefault() on the event
    };
    Draggable.prototype.onMousemove = function (event) {
        this.mousemove.emit(event);
    };
    Draggable.prototype.onMouseout = function (event) {
        this.mouseout.emit(event);
        return false; // Call preventDefault() on the event
    };
    Draggable.prototype.ngOnInit = function () {
        var _this = this;
        this.mousedrag.subscribe({
            next: function (pos) {
                var top = _this.element.nativeElement.style.top.replace("px", "") / 1;
                var left = _this.element.nativeElement.style.left.replace("px", "") / 1;
                var width = _this.element.nativeElement.style.width.replace("px", "") / 1;
                var height = _this.element.nativeElement.style.height.replace("px", "") / 1;
                if (!_this.sizeOnChange) {
                    _this.element.nativeElement.style.top = pos.top + 'px';
                    _this.element.nativeElement.style.left = pos.left + 'px';
                }
                else {
                    if (_this.sizeChange == -1) {
                        if (_this.sizePosition == "bottom" || _this.sizePosition == "top") {
                            _this.sizeChange = pos.top - top;
                        }
                        else if (_this.sizePosition == "right" || _this.sizePosition == "left") {
                            _this.sizeChange = pos.left - left;
                        }
                    }
                    else {
                        if (_this.sizePosition == "bottom") {
                            _this.element.nativeElement.style.width = width + pos.top - top - _this.sizeChange + 'px';
                            _this.element.nativeElement.style.height = height + pos.top - top - _this.sizeChange + 'px';
                            _this.sizeChange = pos.top - top;
                        }
                        else if (_this.sizePosition == "right") {
                            _this.element.nativeElement.style.width = width + pos.left - left - _this.sizeChange + 'px';
                            _this.element.nativeElement.style.height = height + pos.left - left - _this.sizeChange + 'px';
                            _this.sizeChange = pos.left - left;
                        }
                        else if (_this.sizePosition == "top") {
                            _this.element.nativeElement.style.top = pos.top + 'px';
                            _this.element.nativeElement.style.left = left + _this.sizeChange + 'px';
                            _this.element.nativeElement.style.height = height - _this.sizeChange + 'px';
                            _this.element.nativeElement.style.width = width - _this.sizeChange + 'px';
                            _this.sizeChange = pos.top - top;
                        }
                        else if (_this.sizePosition == "left") {
                            _this.element.nativeElement.style.top = top + _this.sizeChange + 'px';
                            _this.element.nativeElement.style.left = pos.left + 'px';
                            _this.element.nativeElement.style.height = height - _this.sizeChange + 'px';
                            _this.element.nativeElement.style.width = width - _this.sizeChange + 'px';
                            _this.sizeChange = pos.left - left;
                        }
                    }
                }
            }
        });
    };
    __decorate([
        core_1.HostListener('mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousemove", null);
    __decorate([
        core_1.HostListener('mouseout', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMouseout", null);
    Draggable = __decorate([
        core_1.Directive({
            selector: '[draggable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=drag.directive.js.map