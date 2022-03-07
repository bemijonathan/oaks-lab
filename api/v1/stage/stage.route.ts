import { Router } from "express";
import { stageController } from "./stage.controller";

const router = Router();

router.route("/:id")
    .post(stageController.createOne)
    .get(stageController.getOne)
    .patch(stageController.updateOne)
    .delete(stageController.deleteOne)

export default router;