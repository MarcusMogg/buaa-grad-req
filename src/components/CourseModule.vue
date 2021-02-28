<template>
  <div class="module">
    <el-container>
      <el-container>
        <el-aside :class="{ bgcol: bgcol }" width="200px" style="height: 100%">
          <div style="height: 100%; display: block; position: relative">
            <div
              style="
                margin: auto;
                height: 200px;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                position: absolute;
              "
            >
              <el-row>
                <span>{{ typeName }}</span>
                <el-input-number
                  v-if="typeName != '必修' && typeName != '任选'"
                  v-model="course.min"
                  :controls="false"
                  :min="1"
                  :max="20"
                  size="mini"
                ></el-input-number>
              </el-row>
              <el-row
                ><el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="del"
                ></el-button
              ></el-row>
            </div>
          </div>
        </el-aside>
        <el-main>
          <CourseEntry :tableData="course.courses" />
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
    course: Object,
    bgcol: Boolean,
    index: Number,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    addCourse() {
      this.course.courses.push({
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
  computed: {
    typeName() {
      return this.course.type;
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
  line-height: 80px;
}
.bgcol {
  background-color: #e5e7ee;
}

.el-input-number--mini {
  width: 50px;
}
</style>