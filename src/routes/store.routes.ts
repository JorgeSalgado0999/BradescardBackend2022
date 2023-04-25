import {Router} from "express";

import {getStores, createStore} from "../controllers/store.controller.js";

const StoreRouter = Router();

StoreRouter.get("/", getStores);
StoreRouter.get("/:id");

StoreRouter.post("/", createStore);

export default StoreRouter;
