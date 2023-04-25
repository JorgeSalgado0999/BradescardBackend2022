"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_controller_js_1 = require("../controllers/store.controller.js");
const StoreRouter = (0, express_1.Router)();
StoreRouter.get("/", store_controller_js_1.getStores);
StoreRouter.get("/:id");
StoreRouter.post("/", store_controller_js_1.createStore);
exports.default = StoreRouter;
//# sourceMappingURL=store.routes.js.map