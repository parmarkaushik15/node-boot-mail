import { readProperties } from "node-boot-core";

export const EnableMail = (target: any) => {
    const properties: any = readProperties();
    if (properties) {
        Object.assign(global, { mailStatus: true });
        return target;
    } else {
        throw new Error("application.properties file is required");
    }
}
