"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const router = (0, express_1.Router)();
router.get("/reviews", review_controller_1.getReviews);
router.post("/reviews", review_controller_1.createReview);
exports.default = router;
//# sourceMappingURL=reviews.routes.js.map