import { Router } from "express";
import { stepController } from "./step.controller";

const router = Router();

router.route("/:id")
    .post(stepController.createOne)
    .get(stepController.getOne)
    .patch(stepController.updateOne)
    .delete(stepController.deleteOne)

export default router;