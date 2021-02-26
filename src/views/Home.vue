<template>
  <div class="home">
    <el-row>
      <el-col :span="8" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>培养方案</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >添加</el-button
            >
          </div>
          <div v-for="o in reqs" :key="o" class="item">
            <CardEntry :title="'列表内容' + o.title" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="4">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>学习进度</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogFormVisible = true"
              >添加</el-button
            >
          </div>
          <div v-for="value in trans" :key="value.title" class="item">
            <CardEntry :title="value.title" />
          </div>
          <el-link href="#/trans" target="_self" type="info"
            >如何获取学习进度</el-link
          >
        </el-card>
      </el-col>
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
import CreateTranscript from "@/model/transcript.js";
import { Contain } from "@/utils/array.js";
import { ERR } from "@/utils/message.js";

export default {
  name: "Home",
  components: {
    CardEntry,
  },
  data() {
    return {
      trans: [],
      reqs: [],
      dialogFormVisible: false,
      form: {
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.$bus.on("deleteTrans", (s) => {
      this.trans.splice(
        this.trans.findIndex((item) => item.title === s),
        1
      );
      localStorage.removeItem("BUAA" + s);
    });
  },
  mounted() {
    for (const key in localStorage) {
      if (key.slice(0, 4) === "BUAA") {
        let tp = localStorage[key].slice(0, 4);
        if (tp === "Tra:") {
          this.trans.push(JSON.parse(localStorage[key].slice(4)));
        } else if (tp === "Req:") {
          this.reqs.push(JSON.parse(localStorage[key].slice(4)));
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
          let tmp = CreateTranscript(this.form.title, this.form.content);
          this.form.title = "";
          this.form.content = "";
          this.trans.push(tmp);
          localStorage["BUAA" + tmp.title] = "Tra:" + JSON.stringify(tmp);
        } catch (e) {
          ERR("数据格式错误");
        }
      }
      this.dialogFormVisible = false;
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