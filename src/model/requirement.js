import { join } from "core-js/fn/array";

export class Requirement {
    constructor() {
    }

    toString() {
        return "Req:" + JSON.stringify(this);
    }
}