import {Router} from "express";

import {
	getPartners,
	createPartner,
	getPartnerStores,
} from "../controllers/partners.controller";

const PartnerRouter = Router();

PartnerRouter.post("/", createPartner);

PartnerRouter.get("/", getPartners);
PartnerRouter.get("/:id");
PartnerRouter.get("/:id/stores", getPartnerStores);

export default PartnerRouter;
