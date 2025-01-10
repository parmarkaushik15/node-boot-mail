"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootMail = exports.sendMail = void 0;
var tslib_1 = require("tslib");
var node_boot_core_1 = require("node-boot-core");
var smtp_1 = require("./smtp");
var util_1 = require("./util");
var sent = function (body, config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var globalProperties, properties, mailType, transport, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                globalProperties = global;
                properties = (0, node_boot_core_1.readProperties)();
                if (!(globalProperties && globalProperties.mailStatus && properties)) return [3, 6];
                mailType = (0, node_boot_core_1.getPropertiesData)(properties, 'mail.type', 'smtp');
                if (!(util_1.mailSupport.indexOf(mailType) == -1)) return [3, 1];
                throw new Error("Current mail have support only : " + util_1.mailSupport.join(", "));
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!(mailType == 'smtp')) return [3, 3];
                transport = null;
                if (config) {
                    transport = (0, smtp_1.getSmtpTransportWithConfig)(config);
                }
                else {
                    transport = (0, smtp_1.getSmtpTransport)(properties);
                }
                if (!transport) return [3, 3];
                if (!body.from) {
                    body.from = "No Reply <".concat(properties['mail.auth.user'], ">");
                }
                return [4, transport.sendMail(tslib_1.__assign(tslib_1.__assign({}, body), { html: body.body }))];
            case 2: return [2, _a.sent()];
            case 3: return [3, 5];
            case 4:
                e_1 = _a.sent();
                throw e_1;
            case 5: return [3, 7];
            case 6: throw new Error("Please enable mail in application level");
            case 7: return [2];
        }
    });
}); };
var sendMail = function (body, config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, sent(body, config)];
            case 1: return [2, _a.sent()];
        }
    });
}); };
exports.sendMail = sendMail;
var BootMail = (function () {
    function BootMail() {
    }
    BootMail.prototype.sendMail = function (body, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, sent(body, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return BootMail;
}());
exports.BootMail = BootMail;
//# sourceMappingURL=mail.js.map