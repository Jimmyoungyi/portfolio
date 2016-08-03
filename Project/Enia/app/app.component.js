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
var occupation_component_1 = require('./occupation.component');
var display_component_1 = require('./display.component');
var AppComponent = (function () {
    function AppComponent() {
        this.content = [];
    }
    AppComponent.prototype.onChangeContentArray = function (newContent) {
        this.content = newContent;
    };
    AppComponent.prototype.onCleanContentArray = function (newContent) {
        this.content = newContent;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\t\t<header>Create Your <br>Own Chinese Symbol</header>\n\t\t<display [contentArray]=\"content\" \n\t\t\t(onChangeContentArray)=\"onChangeContentArray($event)\"></display>\n\t\t<occupation [contentArray]=\"content\"\n\t\t\t(onCleanContentArray)=\"onCleanContentArray($event)\"></occupation>\n\t",
            styles: ["\n\t\theader{\n\t\t\theight: 20vh;\n\t\t\tbackground-image: url(\"img/header.png\");\n\t\t\tcolor: white;\n\t\t\tbackground-size: cover;\n\t\t\tpadding-left: 5vw;\n\t\t\tpadding-top: calc(10vh - 46px);\n\t\t\tfont-size: 40px;\n\t\t\tline-height: 46px;\n\t\t\tmin-height: 92px;\n\t\t}\n\t"],
            directives: [occupation_component_1.OccupationComponent, display_component_1.DisplayComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map