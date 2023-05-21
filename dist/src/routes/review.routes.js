"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("../controllers/review.controller");
const ReviewRouter = (0, express_1.Router)();
ReviewRouter.get("/", review_controller_1.getReviews);
ReviewRouter.post("/", review_controller_1.createReview);
exports.default = ReviewRouter;
//# sourceMappingURL=review.routes.js.map