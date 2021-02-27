<template>
  <div class="module">
    <el-container>
      <el-container>
        <el-aside :class="{ bgcol: bgcol }" width="200px" style="height: 100%">
          <el-row
            ><span>{{ typeName }}</span></el-row
          >
          <el-row
            ><el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del"
            ></el-button
          ></el-row>
        </el-aside>
        <el-main>
          <CourseEntry :tableData="courses" />
          <el-button
            type="text"
            style="float: left; margin-top: 10px"
            @click="addCourse"
            >添加课程</el-button
          >
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CourseEntry from "@/components/CourseEntry.vue";

export default {
  name: "CourseModule",
  components: {
    CourseEntry,
  },
  props: {
    courses: Array,
    type: String,
    bgcol: Boolean,
    index: Number,
  },
  data() {
    return {
      typeName: this.type,
    };
  },
  created() {},
  methods: {
    addCourse() {
      this.courses.push({
        code: "",
        name: "",
        category: undefined,
        unit: 0,
      });
    },
    del() {
      this.$bus.emit("deleteModule", this.index);
    },
  },
};
</script>
<style scoped>
.module {
  text-align: center;
}
.text {
  font-size: 14px;
}

.el-aside {
  text-align: center;

  background-color: #fafafa;
  line-height: 100px;
}
.bgcol {
  background-color: #e5e7ee;
}
</style>