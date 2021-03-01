<template>
  <div class="progress">
    <el-progress :percentage="per" :format="format"></el-progress>
  </div>
</template>

<script>
import * as courses from "@/model/course_module.js";
import * as com from "@/utils/compare.js";

export default {
  name: "Progress",
  props: {
    xx: Object,
  },
  data() {
    return {
      tot: 0,
      done: 0,
    };
  },
  created() {
    for (const i of courses.Propertys.keys()) {
      let k = courses.Propertys.get(i);
      for (const j of this.xx[k]) {
        let unit = 0;
        if (courses.CourseProp[k] === courses.CourseProp.Necessary) {
          unit = j.data.reduce((x, y) => x + y[0].unit, unit);
        } else if (courses.CourseProp[k] === courses.CourseProp.Optional3) {
          unit += j.min;
        } else if (courses.CourseProp[k] === courses.CourseProp.Optional2) {
          let tmp = j.data.map((x) => x);
          tmp.sort((x, y) => x - y);
          unit = tmp.reduce((x, y, index) => {
            if (index > j.min) return 0;
            return x + y[0].unit;
          }, unit);
        }
        if (j.result != com.fail) {
          this.done += unit;
        }
        this.tot += unit;
      }
    }
  },
  computed: {
    format() {
      return () => `${this.done}/${this.tot}`;
    },
    per() {
      if (this.tot === 0) return 0;
      return (this.done / this.tot) * 100;
    },
  },
};
</script>