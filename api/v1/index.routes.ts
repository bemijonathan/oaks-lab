import { Router } from "express";
import stageRouter from "./stage/stage.route"
import stepRouter from "./step/step.route"
import startupRouter from "./startup/startup.route"

export const routes = (): Router => {
    const router = Router();
    router.use("/stage", stageRouter);
    router.use("/step", stepRouter);
    router.use("/startup", startupRouter);
    return router;
}