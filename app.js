"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var axios_1 = __importDefault(require("axios"));
var request1 = (0, rxjs_1.from)(axios_1.default.get("https://api.github.com/search/repositories?q=enemy")).pipe((0, rxjs_1.retry)(3), (0, rxjs_1.pluck)("data"));
var request2 = (0, rxjs_1.from)(axios_1.default.get("https://gitlab.com/api/v4/projects?search=enemy")).pipe((0, rxjs_1.retry)(3), (0, rxjs_1.pluck)("data"));
(0, rxjs_1.forkJoin)(request1, request2).subscribe({
    next: function (value) {
        console.log(value);
    },
    complete: function () {
        console.log("Complete!");
    },
    error: function (error) {
        console.log("Error!", error);
    },
});
