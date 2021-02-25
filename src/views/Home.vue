<template>
  <div class="home">
    <el-row>
      <el-col span="8" offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>培养方案</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >添加</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="item">
            <CardEntry :title="'列表内容' + o" />
          </div>
        </el-card>
      </el-col>
      <el-col span="8" offset="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>学习进度</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >添加</el-button
            >
          </div>
          <div v-for="o in 4" :key="o" class="item">
            <CardEntry :title="'列表内容' + o" />
          </div>
          <el-link href="#/trans" target="_self" type="info"
            >如何获取学习进度</el-link
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import CardEntry from "@/components/CardEntry.vue";

export default {
  name: "Home",
  components: {
    CardEntry,
  },
  methods: {},
};
</script>

<style scoped>
.home {
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>