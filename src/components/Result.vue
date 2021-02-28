<template>
  <div class="module">
    <el-container v-if="course.data.length != 0">
      <el-container>
        <el-aside width="200px" style="height: 100%">
          <div style="height: 100%; display: block; position: relative">
            <div
              style="
                margin: auto;
                height: 60px;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                position: absolute;
              "
            >
              <el-row>
                <el-button
                  size="mini"
                  :type="typeColor"
                  effect="dark"
                  :icon="typeIcon"
                  circle
                >
                </el-button>
                <span>{{ typeName }}</span>
              </el-row>
            </div>
          </div>
        </el-aside>
        <el-main>
          <ResultEntry :tableData="course.data" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ResultEntry from "@/components/ResultEntry.vue";
import * as com from "@/utils/compare.js";

export default {
  name: "Result",
  components: {
    ResultEntry,
  },
  props: {
    course: Object,
    index: Number,
  },
  data() {
    return {};
  },
  created() {
    for (let item of this.course.data) {
      if (item.length === 1) {
        item.push({
          code: "",
          name: "",
          category: "",
          unit: 0,
        });
      }
    }
  },
  methods: {},
  computed: {
    typeName() {
      return this.course.type;
    },
    typeColor() {
      if (this.course.result === com.success) {
        return "success";
      } else if (this.course.result === com.uncertain) {
        return "warning";
      } else {
        return "danger";
      }
    },
    typeIcon() {
      if (this.course.result === com.success) {
        return "el-icon-check";
      } else if (this.course.result === com.uncertain) {
        return "el-icon-warning";
      } else {
        return "el-icon-close";
      }
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
  line-height: 60px;
}

.el-input-number--mini {
  width: 50px;
}
</style>