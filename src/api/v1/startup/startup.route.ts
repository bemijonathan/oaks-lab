import { Router } from "express";
import { stepController } from "./startup.controller";

const router = Router();

router.route("/")
    .post(stepController.createOne)

router.route("/:id")
    .get(stepController.getOne)
    .delete(stepController.deleteOne)

export default router;