import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import enviroments from "~/config/enviroments.config";
import memoryStore from "memorystore";
import { ERROR_MIDDLEWARE, attachControllers } from "@decorators/express";
import { connectDB } from "~/config/db.config";
import { ServerErrorMiddleware } from "@vigilio/express-core/handler";
import { Container } from "@decorators/di";
import { logger } from "@vigilio/express-core/helpers";
import { apiRouters } from "~/routers/api.router";
import { webRouters } from "~/routers/web.router";
import { authRouters } from "~/routers/auth.router";
import { middlewareRoute } from "~/libs/middleware-route";
import { holiday } from "~/libs/helpers";
export class Server {
	app = express();
	constructor() {
		this.middlewares();
		this.auth();
		this.routes();
	}
	middlewares() {
		this.app.use(
			compression({
				threshold: 10000,
				filter: (req, res) => {
					if (req.headers["x-no-compression"]) {
						return false;
					}
					return compression.filter(req, res);
				},
			}),
		);
		this.app.use(cookieParser());
		this.app.use(express.json());
		this.app.use(
			express.static(path.resolve(import.meta.dir, "..", "..", "public")),
		);
		this.app.use(
			express.static(path.resolve(import.meta.dir, "..", "..", "dist")),
		);
		this.app.use(async (_req, res, next) => {
			res.locals.holiday = holiday;
			next();
		});
	}
	async auth() {
		this.app.set("trust proxy", 1);
		const memoryStoreClass = memoryStore(session);
		const closeSession = 24 * 60 * 60 * 1000 * 15;
		this.app.use(
			session({
				secret: enviroments.SECRET_SESSION_KEY,
				resave: false,
				saveUninitialized: false,
				cookie: {
					secure: enviroments.NODE_ENV === "production",
					httpOnly: true,
					maxAge: closeSession,
				},
				store: new memoryStoreClass({
					checkPeriod: closeSession,
				}),
			}),
		);
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		passport.serializeUser((user, done) => {
			return done(null, user);
		});
		passport.deserializeUser(async (_user, _done) => {});
	}
	routes() {
		this.app.use(morgan("dev"));
		const apiRouter = express.Router();
		const webRouter = express.Router();
		const authRouter = express.Router();
		attachControllers(apiRouter, apiRouters);
		attachControllers(webRouter, webRouters);
		attachControllers(authRouter, authRouters);
		Container.provide([
			{ provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
		]);
		this.app.use("/api", apiRouter);
		this.app.get("/admin/*", (_, res) =>
			res.sendFile(
				path.resolve(
					import.meta.dir,
					"..",
					"..",
					"dist",
					"admin",
					"index.html",
				),
			),
		);
		this.app.get("*", (_, res) =>
			res.sendFile(
				path.resolve(import.meta.dir, "..", "..", "dist", "index.html"),
			),
		);
		this.app.use(middlewareRoute);
	}
	listen() {
		const server = this.app.listen(enviroments.PORT, () => {
			logger.primary(`Run server in port ${enviroments.PORT}`);
		});
		return server;
	}
}
