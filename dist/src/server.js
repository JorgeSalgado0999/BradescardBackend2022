"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const database_1 = __importDefault(require("./database/database"));
const constants_1 = require("./helpers/constants");
const config_routes_1 = __importDefault(require("./routes/config.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const partner_routes_1 = __importDefault(require("./routes/partner.routes"));
const store_routes_1 = __importDefault(require("./routes/store.routes"));
const questionCategory_routes_1 = __importDefault(require("./routes/questionCategory.routes"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = constants_1.PORT;
        this.apiPaths = {
            config: "/config/",
            auth: "/auth/",
            user: "/user/",
            partner: "/partner/",
            store: "/store/",
            questionategory: "/question-category/",
            question: "/question/",
            review: "/review/",
        };
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.authenticate();
                console.log("Database online");
            }
            catch (error) {
                console.log("Problems with database");
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use(express_1.default.urlencoded({ limit: "50mb" }));
    }
    routes() {
        this.app.get("", (req, res, next) => {
            return res.status(200).json({
                message: "Hello from root!",
            });
        });
        this.app.use(this.apiPaths.config, config_routes_1.default);
        this.app.use(this.apiPaths.auth, auth_routes_1.default);
        this.app.use(this.apiPaths.user, users_routes_1.default);
        this.app.use(this.apiPaths.partner, partner_routes_1.default);
        this.app.use(this.apiPaths.store, store_routes_1.default);
        this.app.use(this.apiPaths.questionategory, questionCategory_routes_1.default);
        this.app.use(this.apiPaths.question, question_routes_1.default);
        this.app.use(this.apiPaths.review, review_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map