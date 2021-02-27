<template>
  <div class="home">
    <el-row>
      <el-col :span="8" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>培养方案</span>
            <router-link to="/create" target="_self">
              <el-button style="float: right; padding: 3px 0" type="text"
                >添加</el-button
              >
            </router-link>
          </div>
          <div v-for="(o, index) in reqs" :key="index" class="item">
            <CardEntry :title="o.title" :index="index" :type="true" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>学习进度</span>
            <el-button
              style="float: right; padding: 3px 3px"
              type="text"
              @click="clearStorage('trans')"
              >清空</el-button
            >
            <el-button
              style="float: right; padding: 3px 3px"
              type="text"
              @click="dialogFormVisible = true"
              >添加</el-button
            >
          </div>
          <div v-for="(value, index) in trans" :key="index" class="item">
            <CardEntry :title="value.title" :index="index" :type="false" />
          </div>
          <router-link to="/trans" target="_self"
            ><el-link type="info">如何获取学习进度</el-link></router-link
          >
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 18px">
      <el-col :span="8" :offset="2">已选择: {{ req }}</el-col>
      <el-col :span="8" :offset="4">已选择: {{ tran }}</el-col>
    </el-row>
    <el-row style="margin-top: 18px">
      <el-col :span="8" :offset="8">
        <el-button type="primary">进行比较</el-button></el-col
      >
    </el-row>
    <el-dialog title="学习进度" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="唯一标识名" :label-width="'120px'">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="粘贴成绩单" :label-width="'120px'">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="transSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CardEntry from "@/components/CardEntry.vue";
import {
  loadTFromStr,
  loadTFromJson,
  saveTAsJson,
} from "@/model/transcript.js";
import { loadRFromJson } from "@/model/requirement.js";
import { Contain } from "@/utils/array.js";
import { ERR } from "@/utils/message.js";

let rTitle = (s) => "BUAA" + s;

export default {
  name: "Home",
  components: {
    CardEntry,
  },
  data() {
    return {
      trans: [],
      reqs: [],
      req: "",
      tran: "",
      dialogFormVisible: false,
      form: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.$bus.on("deleteTran", (index) => {
      localStorage.removeItem(rTitle(this.trans[index].title));
      this.trans.splice(index, 1);
    });
    this.$bus.on("deleteReq", (index) => {
      localStorage.removeItem(rTitle(this.reqs[index].title));
      this.reqs.splice(index, 1);
    });
    this.$bus.on("selectTran", (title) => {
      this.tran = title;
    });
    this.$bus.on("selectReq", (title) => {
      this.req = title;
    });
    this.$bus.on("edit", (index) => {
      this.$router.push({ path: `/edit/${this.reqs[index].title}` });
    });
  },
  mounted() {
    for (const key in localStorage) {
      if (key.slice(0, 4) === "BUAA") {
        let tp = localStorage[key].slice(0, 4);
        if (tp === "Tra:") {
          this.trans.push(loadTFromJson(localStorage[key]));
        } else if (tp === "Req:") {
          this.reqs.push(loadRFromJson(localStorage[key]));
        }
      }
    }
  },
  methods: {
    transSubmit() {
      if (this.form.title === "") {
        ERR("标识名不能为空");
      } else if (
        Contain(this.trans, "title", this.form.title) ||
        Contain(this.reqs, "title", this.form.title)
      ) {
        ERR("标识名已存在");
      } else {
        try {
          let tmp = loadTFromStr(this.form.title, this.form.content);
          this.form.title = "";
          this.form.content = "";
          this.trans.push(tmp);
          localStorage[rTitle(tmp.title)] = saveTAsJson(tmp);
        } catch (e) {
          ERR("数据格式错误");
        }
      }
      this.dialogFormVisible = false;
    },
    clearStorage(name) {
      if (name === "trans") {
        for (const item of this.trans) {
          localStorage.removeItem(rTitle(item.title));
        }
        this.trans = [];
      } else if (name === "reqs") {
        for (const item of this.reqs) {
          localStorage.removeItem(rTitle(item.title));
        }
        this.reqs = [];
      } else {
        ERR("clearStorage参数错误");
      }
    },
  },
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