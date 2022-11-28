import {Router} from "express";

import {getAgents, createAgent} from "../controllers/agents.controller.js";

const router = Router();

router.get("/agents", getAgents);

router.post("/agents", createAgent);

export default router;
