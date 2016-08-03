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
var core_1 = require("@angular/core");
var DisplayComponent = (function () {
    function DisplayComponent() {
        this.onChangeContentArray = new core_1.EventEmitter();
        this.enter = false;
        this.content = "";
    }
    DisplayComponent.prototype.startEnter = function () {
        this.enter = true;
    };
    ;
    DisplayComponent.prototype.createContent = function () {
        if (/^[a-z]+$/i.test(this.content)) {
            this.enter = false;
            this.contentArray = this.content.toLowerCase().split("");
            this.content = "";
            this.onChangeContentArray.emit(this.contentArray);
        }
        else {
            alert("word is not available");
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DisplayComponent.prototype, "contentArray", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DisplayComponent.prototype, "onChangeContentArray", void 0);
    DisplayComponent = __decorate([
        core_1.Component({
            selector: "display",
            template: "\n\t\t<section class=\"description\" *ngIf=\"!contentArray[0]\">\n\t\t\t<div class=\"background\"></div>\n\t\t\t<span class=\"title-text\">How it work</span>\n\t\t\t<ul>\n\t\t\t\t<li>\n\t\t\t\t\t<img src=\"img/sa.png\" alt=\"\" />\n\t\t\t\t\t<span class=\"content-text\">Enter a word less than 10 letters.</span>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<img src=\"img/sb.png\" alt=\"\" />\n\t\t\t\t\t<span class=\"content-text\">Select symbol for each letters.</span>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<img src=\"img/sc.png\" alt=\"\" />\n\t\t\t\t\t<span class=\"content-text\">Congradulations, you made it.</span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<span class=\"title-text start\" (click)=\"startEnter()\">Try it now</span>\n\t\t\t<div class=\"content-box\" *ngIf=\"enter\">\n\t\t\t\t<div class=\"background\"></div>\n\t\t\t\t<div class=\"content\">\n\t\t\t\t\t<div class=\"content-text\">\n\t\t\t\t\t\tPlease enter a world.\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t(letters only, no space or punctuation.)\n\t\t\t\t\t</div>\n\t\t\t\t\t<label for=\"content-input\">word: </label>\n\t\t\t\t\t<input id=\"content-input\" [(ngModel)]=\"content\" placeholder=\"enter a world\">\n\t\t\t\t\t<br>\n\t\t\t\t\t<span class=\"submit\" (click)=\"createContent()\">Submit</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>\n\t",
            styles: ["\n\t\t.description{\n\t\t\ttext-align: center;\n\t\t\twidth: 80%;\n\t\t\toverflow: hidden;\n\t\t\tmargin-left: 10%;\n\t\t\tmargin-top: 5vh;\n\t\t\tpadding: 20px;\n\t\t\tbackground-color: rgba(255,255,255,0.6);\n\t\t}\n\t\t.description ul{\n\t\t\tpadding: 0px;\n\t\t\toverflow: hidden;\n\t\t\tmargin: 0;\n\t\t}\n\t\t.description li{\n\t\t\tlist-style: none;\n\t\t\tfloat: left;\n\t\t\twidth: 33.3333%;\n\t\t\tpadding: 20px;\n\t\t}\n\t\t.description li img{\n\t\t\twidth: 100%;\n\t\t\tmargin-bottom: 10px;\n\t\t}\n\t\t.description .start{\n\t\t\ttext-decoration: underline;\n\t\t\tcursor: pointer;\n\t\t}\n\t\t.description .content-box{\n\t\t\tposition: fixed;\n\t\t\twidth: 100vw;\n\t\t\theight: 100vh;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tcolor: #444;\n\t\t\tbackground-color: rgba(0,0,0,0.6);\n\t\t}\n\t\t.description .content-box .content{\n\t\t\twidth: 500px;\n\t\t\theight: 150px;\n\t\t\tmargin-left: calc(50vw - 250px);\n\t\t\tmargin-top: calc(45vh - 75px);\n\t\t\tbackground-color: white;\n\t\t\tpadding: 20px;\n\t\t}\n\t\t.description .content-box .content input{\n\t\t\tmargin: 20px 0;\n\t\t}\n\t\t.description .content-box .content .submit{\n\t\t\ttext-decoration: underline;\n\t\t\tcursor: pointer;\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], DisplayComponent);
    return DisplayComponent;
}());
exports.DisplayComponent = DisplayComponent;
//# sourceMappingURL=display.component.js.map