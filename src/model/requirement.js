export function loadRFromJson(s) {
    return JSON.parse(s.slice(4));
}

export function saveRAsJson(s) {
    for (let item of s.content) {
        for (let c of item.courses) {
            c.code = c.code.replaceAll(/\s/gi, '');
            c.name = c.name.replaceAll(/\s/gi, '');
        }
    }
    return "Req:" + JSON.stringify(s);
}
