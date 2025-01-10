"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableMail = void 0;
var node_boot_core_1 = require("node-boot-core");
var EnableMail = function (target) {
    var properties = (0, node_boot_core_1.readProperties)();
    if (properties) {
        Object.assign(global, { mailStatus: true });
        return target;
    }
    else {
        throw new Error("application.properties file is required");
    }
};
exports.EnableMail = EnableMail;
//# sourceMappingURL=enable-mail.js.map