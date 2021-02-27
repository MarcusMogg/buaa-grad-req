const categorys = [
    ["Math", "数学与自然科学类"],
    ["Engineer", "工程基础类"],
    ["Language", "语言类"],

    ["Politics", "思政、军理类"],
    ["Sport", "体育类"],
    ["Boya", "博雅类"],
    ["CoreG", "核心通识类"],
    ["CommanG", "一般通识类"],

    ["CoreP", "核心专业类"],
    ["CommanP", "一般专业类"],
];

const modules = [
    ["Basic", "基础课程"],
    ["General", "通识课程"],
    ["Profession", "专业课程"]
];

const propertys = [
    ["Necessary", "必修"],
    ["Optional1", "任选"],
    ["Optional2", "最低课数"],
    ["Optional3", "最低学分"],
]

function makeEnum(arr) {
    let obj = {};
    for (let val of arr) {
        obj[val[0]] = Symbol(val[1]);
    }
    return Object.freeze(obj);
}

function makeMap(arr, enm) {
    let map = new Map();
    for (let val of arr) {
        map.set(val[1], enm[val[0]]);
    }
    return Object.freeze(map);
}

export const CourseModule = makeEnum(modules);
export const Modules = makeMap(modules, CourseModule);

export const CourseCategory = makeEnum(categorys);
export const Categorys = makeMap(categorys, CourseCategory);

export const CourseProp = makeEnum(propertys)
export const Propertys = makeMap(propertys, CourseProp)

export function GetName(enm, sym) {
    for (const [key, value] of enm) {
        if (value === sym) {
            return key;
        }
    }
    return undefined;
}