import { Injectable } from "@decorators/di";
import { Controller, Get, Params, Res } from "@decorators/express";
import { AppService } from "./app.service";
import { type Response } from "express";

@Injectable()
@Controller("/")
export class AppController {
	constructor(private readonly appService: AppService) {}
	@Get("/")
	async index() {
		const result = this.appService.index();
		return result;
	}
}
