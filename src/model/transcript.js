import * as course from "./course_module.js"

/*entrys : {
    code: "",
    name: "",
    category: "",
    unit: 0
};*/
let createTranscriptEntry = (s) => {
    let ss = s.split(/\s/)
    let res = {
        code: ss[2].trim(),
        name: ss[3].trim(),
        category: course.Categorys.get(ss[4].trim()),
        unit: Number.parseFloat(ss[7]),
    }
    if (res.category === undefined) {
        throw `parse ${ss[4]} error`;
    }
    return res;
};


export function loadTFromStr(title, s) {
    let ss = s.split(/\r\n|\r|\n/)
    let res = {
        title: title,
        entrys: [],
    };
    for (const item of ss) {
        let tmp = createTranscriptEntry(item);
        if (tmp != null) {
            res.entrys.push(tmp);
        }
    }
    return res;
}

export function loadTFromJson(s) {
    return JSON.parse(s.slice(4));
}
export function saveTAsJson(s) {
    return "Tra:" + JSON.stringify(s);
}
