import { readProperties } from "node-boot-core";

export const EnableImap = (target: any) => {
    const properties: any = readProperties();
    if (properties) {
        Object.assign(global, { imapStatus: true });
        return target;
    } else {
        throw new Error("application.properties file is required");
    }
}
