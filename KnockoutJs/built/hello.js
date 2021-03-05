"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var HelloViewModel = /** @class */ (function () {
    function HelloViewModel(language, framework) {
        this.language = ko.observable(language);
        this.framework = ko.observable(framework);
    }
    return HelloViewModel;
}());
// let languages = { language: "Typescript", framework: "Knockout" };
ko.applyBindings(new HelloViewModel("TypeScript", "Knockout"));
