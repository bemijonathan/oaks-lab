import { Router } from "express";
import { stageController } from "./stage.controller";

const router = Router();

router.route("/")
    .get(stageController.getAll)
    .post(stageController.createOne)

router.route("/:id")
    .get(stageController.getOne)
    .patch(stageController.updateOne)
    .delete(stageController.deleteOne)

export default router;