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
var drag_directive_1 = require('./drag.directive');
var OccupationComponent = (function () {
    function OccupationComponent() {
        this.onCleanContentArray = new core_1.EventEmitter();
        this.selectedArray = [];
        this.active = [];
        this.url = "url('elements/a1.svg')";
    }
    OccupationComponent.prototype.ngOnChanges = function () {
        for (var item in this.contentArray) {
            this.selectedArray.push(false);
        }
    };
    OccupationComponent.prototype.restart = function () {
        this.onCleanContentArray.emit([]);
        this.selectedArray = [];
        this.active = [];
    };
    OccupationComponent.prototype.selectImage = function (i, letter, index) {
        if (this.selectedArray[i][0] != index && this.selectedArray[i][1] != "url('elements/" + letter + index + ".svg')") {
            this.selectedArray[i] = [index, "url('elements/" + letter + index + ".svg')"];
        }
        this.active = [i, index];
    };
    OccupationComponent.prototype.changeActive = function (index) {
        this.active = [index, this.selectedArray[index][0]];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OccupationComponent.prototype, "contentArray", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OccupationComponent.prototype, "onCleanContentArray", void 0);
    OccupationComponent = __decorate([
        core_1.Component({
            selector: "occupation",
            template: "\n\t\t<section class=\"occupation\" *ngIf=\"contentArray[0]\" >\n\t\t\t<div class=\"display\">\n\t\t\t\t<div class=\"selected-container\" \n\t\t\t\t\t*ngFor=\"let select of selectedArray; let i = index\" \n\t\t\t\t\t[ngClass]=\"{active: active[0]==i}\"\n\t\t\t\t\tdraggable>\n\n\t\t\t\t\t<div class=\"selected-element\" \n\t\t\t\t\t*ngIf=select \n\t\t\t\t\t[style.backgroundImage]=\"select[1]\"\n\t\t\t\t\t(click)=\"changeActive(i)\">\n\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"move-trigger\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"options\">\n\t\t\t\t<ul>\n\t\t\t\t\t<li class=\"letter title-text\" *ngFor=\"let letter of contentArray; let i = index\">\n\t\t\t\t\t\t{{letter}}:\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li class=\"element\" *ngFor=\"let index of [1,2,3]\">\n\t\t\t\t\t\t\t\t<img src=\"elements/{{letter}}{{index}}.svg\" alt=\"\" \n\t\t\t\t\t\t\t\t\t[ngClass]=\"{selected: (selectedArray[i][0] == index),\n\t\t\t\t\t\t\t\t\t\t\t\tactivity: (active[0] == i && active[1] == index)}\" \n\t\t\t\t\t\t\t\t\t(click)=\"selectImage(i,letter,index)\"/>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t\t<div class=\"restart title-text\" (click)=\"restart()\">Restart</div>\n\t\t\t</div>\n\t\t</section>\n\t",
            styles: ["\n\t\t.occupation{\n\t\t\toverflow: hidden;\n\t\t\twidth: 80%;\n\t\t\tmargin-left: 10%;\n\t\t\tmargin-top: 10vh;\n\t\t}\n\t\t.occupation .display{\n\t\t\twidth: 450px;\n\t\t\theight: 450px;\n\t\t\tfloat: left;\n\t\t\tbackground-image: url('img/wordform.png');\n\t\t\tbackground-size: cover;\n\t\t\tposition: relative;\n\t\t}\n\t\t.occupation .display .selected-container{\n\t\t\tbackground-size: contain;\n\t\t\tposition: absolute;\n\t\t\tleft: 12.5vw;\n\t\t\ttop: 12.5vw;\n\t\t\tz-index: 5;\n\t\t}\n\t\t.occupation .display .selected-container.active{\n\t\t\tz-index: 10;\n\t\t}\n\t\t.occupation .display .selected-element{\n\t\t\tbackground-image: url(elements/a1.svg);\n\t\t\tborder: 2px solid transparent;\n\t\t\theight: 100%;\n\t\t\twidth: 100%;\n\t\t\tbackground-repeat: no-repeat;\n\t\t\tbackground-position: center;\n\t\t\tcursor: nesw-resize;\n\t\t}\n\t\t.occupation .display .selected-element:hover{\n\t\t\tborder: 2px solid lightgray;\n\t\t}\n\t\t.occupation .display .selected-element .move-trigger{\n\t\t\twidth: calc( 100% - 40px );\n\t\t\theight: calc( 100% - 40px);\n\t\t\tmargin-top: 20px;\n\t\t\tmargin-left: 20px;\n\t\t\tbackground-color: #eee;\n\t\t\topacity: 0;\n\t\t\tcursor: all-scroll;\n\t\t}\n\t\t.occupation .options{\n\t\t\twidth: calc(100% - 450px);\n\t\t\tfloat: left;\n\t\t}\n\t\t.occupation .options ul{\n\t\t\toverflow: hidden;\n\t\t\tpadding: 0;\n\t\t}\n\t\t.occupation .options .letter{\n\t\t\ttext-transform: uppercase;\n\t\t\tpadding-left: 10%;\n\t\t\tlist-style: none;\n\t\t}\n\t\t.occupation .options .element{\n\t\t\twidth: 33.3333%;\n\t\t\tfloat: left;\n\t\t\tlist-style: none;\n\t\t\tpadding: 10px;\n\t\t} \n\t\t.occupation .options .element img{\n\t\t\tborder: 2px solid transparent;\n\t\t\twidth: 100%;\n\t\t} \n\t\t.occupation .options .element img.selected{\n\t\t\tborder: 2px solid gray;\n\t\t} \n\t\t.occupation .options .element img.activity{\n\t\t\tborder: 2px solid green;\n\t\t} \n\t\t.occupation .options .restart{\n\t\t\ttext-decoration: underline;\n\t\t\tcursor: pointer;\n\t\t\ttext-align: center;\n\t\t}\n\t"],
            directives: [drag_directive_1.Draggable]
        }), 
        __metadata('design:paramtypes', [])
    ], OccupationComponent);
    return OccupationComponent;
}());
exports.OccupationComponent = OccupationComponent;
//# sourceMappingURL=occupation.component.js.map