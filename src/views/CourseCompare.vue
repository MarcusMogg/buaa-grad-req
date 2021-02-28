<template>
  <div class="home">
    <el-container>
      <el-header>必修</el-header>
      <el-main>
        <div
          v-for="(value, index) in content.Necessary"
          :key="index"
          class="item"
        >
          <Result :course="value" :index="index" /></div
      ></el-main>
    </el-container>
    <el-container>
      <el-header>最低课数</el-header>
      <el-main
        ><div
          v-for="(value, index) in content.Optional2"
          :key="index"
          class="item"
        >
          <Result :course="value" :index="index" /></div
      ></el-main>
    </el-container>
    <el-container>
      <el-header>最低学分</el-header>
      <el-main
        ><div
          v-for="(value, index) in content.Optional3"
          :key="index"
          class="item"
        >
          <Result :course="value" :index="index" /></div
      ></el-main>
    </el-container>
    <el-container>
      <el-header>任选</el-header>
      <el-main
        ><div
          v-for="(value, index) in content.Optional1"
          :key="index"
          class="item"
        >
          <Result :course="value" :index="index" /></div
      ></el-main>
    </el-container>
    <el-container>
      <el-header>剩余课程</el-header>
      <el-main
        ><div
          v-for="(value, index) in content.Remnant"
          :key="index"
          class="item"
        >
          <Result :course="value" :index="index" /></div
      ></el-main>
    </el-container>
  </div>
</template>

<script>
import Result from "@/components/Result.vue";
import { loadTFromJson } from "@/model/transcript.js";
import { loadRFromJson } from "@/model/requirement.js";
import { Compare } from "@/utils/compare.js";
let rTitle = (s) => "BUAA" + s;

export default {
  name: "Compare",
  components: { Result },
  data() {
    return {
      reqs: {},
      trans: {},
      content: [],
    };
  },
  created() {
    this.reqs = loadRFromJson(localStorage[rTitle(this.$route.query.reqs)]);
    this.trans = loadTFromJson(localStorage[rTitle(this.$route.query.trans)]);
    this.content = Compare(this.reqs.content, this.trans.entrys);
  },
};
</script>

<style scope>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>