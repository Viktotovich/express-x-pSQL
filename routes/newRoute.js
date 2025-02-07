const { Router } = require("express");
const newRouter = Router();
const newController = require("../controllers/newController");

newRouter.get("/", newController.createUsernameGet);
newRouter.post("/", newController.createUsernamePost);

module.exports = newRouter;
