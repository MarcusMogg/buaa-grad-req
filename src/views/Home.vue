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
      <el-col :span="8" :offset="2">{{ selectReq }}</el-col>
      <el-col :span="8" :offset="4"> {{ selectTra }}</el-col>
    </el-row>
    <el-row style="margin-top: 18px">
      <el-col :span="8" :offset="8">
        <el-button type="primary" @click="compare">进行比较</el-button></el-col
      >
    </el-row>
    <el-dialog title="学习进度" :visible.sync="dialogFormVisible">
      <span
        >粘贴时请注意删除课程名称一列的空格，一般会出现在课程名称含有英文的情况下，比如Objective
        C 面向对象程序设计</span
      >
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
import { saveRAsJson, loadRFromJson } from "@/model/requirement.js";
import { Contain } from "@/utils/array.js";
import { ERR } from "@/utils/message.js";
import BasicData from "@/data";

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
      req: -1,
      tran: -1,
      dialogFormVisible: false,
      form: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    BasicData.map((x) => {
      if (!localStorage[rTitle(x.title)]) {
        localStorage[rTitle(x.title)] = saveRAsJson(x);
      }
    });
    this.$bus.on("deleteTran", (index) => {
      localStorage.removeItem(rTitle(this.trans[index].title));
      this.trans.splice(index, 1);
    });
    this.$bus.on("deleteReq", (index) => {
      localStorage.removeItem(rTitle(this.reqs[index].title));
      this.reqs.splice(index, 1);
    });
    this.$bus.on("selectTran", (index) => {
      this.tran = index;
    });
    this.$bus.on("selectReq", (index) => {
      this.req = index;
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
  computed: {
    selectReq() {
      return this.req < this.reqs.length && this.req >= 0
        ? `${this.reqs[this.req].title} `
        : "未选择";
    },
    selectTra() {
      return this.tran < this.trans.length && this.tran >= 0
        ? `${this.trans[this.tran].title} `
        : "未选择";
    },
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
    compare() {
      this.$router.push({
        path: "/compare",
        query: {
          reqs: this.reqs[this.req].title,
          trans: this.trans[this.tran].title,
        },
      });
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