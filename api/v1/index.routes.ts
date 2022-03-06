import { Router } from "express";
import stageRouter from "./stage/stage.route"

export const routes = (): Router => {
    const router = Router();
    router.use("/stage", stageRouter);
    return router;
}