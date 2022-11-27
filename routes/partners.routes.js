import {Router} from "express";

import {
	getPartners,
	createPartner,
	getPartnerStores,
} from "../controllers/partners.controller.js";

const router = Router();

router.get("/partners", getPartners);
router.get("/partners/:id");

router.post("/partners", createPartner);

router.get("/partners/:id/stores", getPartnerStores);

export default router;
