import {Router} from "express";

import {getStores, createStore} from "../controllers/stores.controller.js";

const router = Router();

router.get("/stores", getStores);
router.get("/stores/:id");

router.post("/stores", createStore);

export default router;
