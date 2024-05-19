var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
						? (desc = Object.getOwnPropertyDescriptor(target, key))
						: desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
			return Reflect.metadata(k, v);
	};
import { Injectable } from "@decorators/di";
import { Controller, Get, Params, Res } from "@decorators/express";
import { AppService } from "./app.service";
import {} from "express";
let AppController = class AppController {
	appService;
	constructor(appService) {
		this.appService = appService;
	}
	async index() {
		const result = this.appService.index();
		return result;
	}
};
__decorate(
	[
		Get("/"),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", Promise),
	],
	AppController.prototype,
	"index",
	null,
);
AppController = __decorate(
	[
		Injectable(),
		Controller("/"),
		__metadata("design:paramtypes", [AppService]),
	],
	AppController,
);
export { AppController };
