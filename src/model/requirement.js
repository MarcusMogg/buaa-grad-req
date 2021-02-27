export function loadRFromJson(s) {
    return JSON.parse(s.slice(4));
}

export function saveRAsJson(s) {
    return "Req:" + JSON.stringify(s);
}
