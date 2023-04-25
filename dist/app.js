"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./src/server"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const constants_1 = require("./src/helpers/constants");
const server = new server_1.default();
if (constants_1.ENVIROMENT == "dev") {
    console.log("Development enviroment...");
    server.listen();
}
else if (constants_1.ENVIROMENT == "prod") {
    console.log("Productive enviroment...");
    module.exports.handler = (0, serverless_http_1.default)(server.app);
}
//# sourceMappingURL=app.js.map