"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.My_SECRET = exports.DATABASE = exports.ENVIROMENT = exports.SQL_PASSWORD = exports.SQL_USER = exports.SQL_HOST = exports.PORT = exports.APP_NAME = void 0;
exports.APP_NAME = "ComplianceBackend";
exports.PORT = 3001;
exports.SQL_HOST = process.env.SQL_HOST || "";
exports.SQL_USER = process.env.SQL_USER || "";
exports.SQL_PASSWORD = process.env.SQL_PASSWORD || "";
exports.ENVIROMENT = process.env.ENVIROMENT || "";
exports.DATABASE = process.env.DATABASE || "";
exports.My_SECRET = process.env.My_SECRET || "Brades@ComplianceApp2022#";
//# sourceMappingURL=constants.js.map