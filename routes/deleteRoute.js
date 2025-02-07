const { Router } = require("express");
const deleteRouter = Router();
const deleteController = require("../controllers/deleteController");

deleteRouter.get("/", deleteController.deleteAll);

module.exports = deleteRouter;
