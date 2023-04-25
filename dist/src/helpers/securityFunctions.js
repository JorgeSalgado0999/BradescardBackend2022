"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("./constants");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = String(req.headers["authorization"]);
    try {
        const user = (0, jsonwebtoken_1.verify)(token, constants_1.My_SECRET);
        next();
    }
    catch (ex) {
        const data = {
            errorMessage: "token invalido",
            errorData: ex,
        };
        res.status(401).send(data);
    }
});
exports.authMiddleware = authMiddleware;
const handleError = (res, ex) => {
    console.log(ex);
    const data = {
        errorMessage: ex.Message,
        errorData: ex,
    };
    res.status(500).send(data);
};
exports.handleError = handleError;
//# sourceMappingURL=securityFunctions.js.map