"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableImap = void 0;
var node_boot_core_1 = require("node-boot-core");
var EnableImap = function (target) {
    var properties = (0, node_boot_core_1.readProperties)();
    if (properties) {
        Object.assign(global, { imapStatus: true });
        return target;
    }
    else {
        throw new Error("application.properties file is required");
    }
};
exports.EnableImap = EnableImap;
//# sourceMappingURL=enable-imap.js.map