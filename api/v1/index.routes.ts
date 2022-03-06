import { Router } from "express";
import StageRoute from "./stage/stage.route";

const router = Router();

router.use("/stage", StageRoute)

export default router;
