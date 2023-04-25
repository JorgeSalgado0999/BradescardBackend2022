"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partners_controller_1 = require("../controllers/partners.controller");
const PartnerRouter = (0, express_1.Router)();
PartnerRouter.post("/", partners_controller_1.createPartner);
PartnerRouter.get("/", partners_controller_1.getPartners);
PartnerRouter.get("/:id");
PartnerRouter.get("/:id/stores", partners_controller_1.getPartnerStores);
exports.default = PartnerRouter;
//# sourceMappingURL=partner.routes.js.map