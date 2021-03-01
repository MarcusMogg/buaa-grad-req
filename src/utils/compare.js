import * as courses from "@/model/course_module.js"

export const success = "SUCCESS";
export const fail = "FAIL";
export const uncertain = "UNCERTAIN";


let sort = (reqs) => {
    let res = {};
    for (const key in courses.CourseProp) {
        res[key] = [];
    }
    for (const item of reqs) {
        let key = courses.Propertys.get(item.type);
        if (item.type === courses.CourseProp.Necessary) {
            item.courses.map(x => {
                res[key].push({
                    min: 0,
                    data: [x]
                });
            })
        } else {
            res[key].push({
                min: item.min,
                data: item.courses
            });
        }

    }
    return res;
}

let merge = (reqs, trans) => {
    let res = [];
    for (let m of reqs) {
        let tt = [];
        for (let r of m.data) {
            let tmp = [r];
            for (let t in trans) {
                let cnt = (r.code === trans[t].code) +
                    (r.name === trans[t].name);
                if (cnt > 0) {
                    tmp.push(trans[t]);
                    trans.splice(t, 1);
                    break;
                }
            }
            tt.push(tmp);
        }
        res.push({
            min: m.min,
            data: tt,
        });
    }
    return res;
}

let checkOptional1 = (arr) => {
    return {
        result: fail,
        type: courses.CourseProp.Optional1,
        data: arr.data
    };
}

let checkOptional2 = (arr) => {
    let res = {
        result: fail,
        type: courses.CourseProp.Optional2,
        data: arr.data,
        min: arr.min
    }
    let cnt = arr.data.reduce(
        (accumulator, currentValue) =>
            accumulator + (currentValue.length > 1),
        0);
    if (cnt >= arr.min) {
        res.result = success;
    }
    return res;
}

let checkOptional3 = (arr) => {
    let res = {
        result: fail,
        type: courses.CourseProp.Optional3,
        data: arr.data,
        min: arr.min
    }
    let cnt = arr.data.reduce(
        (accumulator, currentValue) =>
            currentValue.length > 1 ? accumulator + currentValue[1].unit : accumulator,
        0);
    if (cnt >= arr.min) {
        res.result = success;
    }
    return res;
}

let checkNecessary = (arr) => {
    let res = {
        result: fail,
        type: courses.CourseProp.Necessary,
        data: arr
    }
    if (arr[0].length === 1) {
        return res;
    }
    let cnt = (arr[0][0].code === arr[0][1].code) +
        (arr[0][0].name === arr[0][1].name) +
        (arr[0][0].category === courses.CourseCategory[arr[0][1].category]) +
        (arr[0][0].unit >= arr[0][1].unit);
    if (cnt === 4) {
        res.result = success;
    } else {
        res.result = uncertain;
    }
    return res;
}

let upRemnant = (item) => {
    return [{
        code: "",
        name: "",
        category: "",
        unit: 0,
    }, item];
}
// req : [{
//    type : "",
//    min : 0,
//    courses : [{  code: "",
//        name: "",
//        category: undefined,
//        unit: 0,
//      },...]
// },...]
export let Compare = (req, trans) => {
    let sorted = sort(req);
    sorted.Necessary = merge(sorted.Necessary, trans);
    sorted.Optional2 = merge(sorted.Optional2, trans);
    sorted.Optional3 = merge(sorted.Optional3, trans);
    sorted.Optional1 = merge(sorted.Optional1, trans);
    sorted.Necessary.map((x, index) => sorted.Necessary[index] = checkNecessary(x.data));
    sorted.Optional2.map((x, index) => sorted.Optional2[index] = checkOptional2(x));
    sorted.Optional3.map((x, index) => sorted.Optional3[index] = checkOptional3(x));
    sorted.Optional1.map((x, index) => sorted.Optional1[index] = checkOptional1(x));

    sorted.Remnant = [{
        result: uncertain,
        type: "没有匹配",
        data: trans.map(x => upRemnant(x))
    }];
    return sorted;
}