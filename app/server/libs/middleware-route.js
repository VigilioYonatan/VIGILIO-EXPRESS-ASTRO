import {} from "express";
export async function middlewareRoute(req, res) {
	if (req.path.includes("/api")) {
		return res.status(404).json({
			error: 404,
			success: false,
			message: "This endpoint is not correct",
		});
	}
	res.status(404);
	res.render("web/404");
}
