<template>
  <div class="home">
    <el-row>
      <el-col :span="1" :offset="1"
        ><label class="el-form-item__label" style="font-size: 20px"
          >标题</label
        ></el-col
      >
      <el-col :span="4"
        ><el-input v-model="title" placeholder="请输入标题"></el-input
      ></el-col>
    </el-row>
    <el-row style="margin-top: 24px">
      <el-col :span="2" v-for="key in options" :key="key">
        <el-button plain width="160px" @click="addModule(key)"
          >添加{{ key }}模块</el-button
        >
      </el-col>
    </el-row>
    <el-row style="margin: 24px 0">
      <el-col :span="2">
        <el-button round @click="save">保存</el-button>
      </el-col>
      <el-col :span="2">
        <el-button round @click="exportJson">导出</el-button>
      </el-col>
      <el-col :span="2">
        <el-button round @click="importJson">导入</el-button>
      </el-col>
    </el-row>
    <div v-for="(value, index) in content" :key="index" class="item">
      <CourseModule
        :courses="value.courses"
        :type="value.type"
        :index="index"
        :bgcol="index % 2 == 1"
      />
    </div>
  </div>
</template>

<script>
import CourseModule from "@/components/CourseModule.vue";
import * as courses from "@/model/course_module.js";
import { loadRFromJson, saveRAsJson } from "@/model/requirement.js";
import { ERR } from "@/utils/message.js";

let check = (s) => s.code === "" || s.name === "" || s.category === undefined;
let rTitle = (s) => "BUAA" + s;
export default {
  name: "Home",
  components: {
    CourseModule,
  },
  data() {
    return {
      title: "培养方案",
      content: [],
      options: [...courses.Propertys.keys()],
      courseCate: courses.Propertys,
    };
  },
  created() {
    if (this.$route.params.title != undefined) {
      let r = loadRFromJson(localStorage[rTitle(this.$route.params.title)]);
      this.title = r.title;
      this.content = r.content;
    }
    this.$bus.on("deleteModule", (index) => {
      this.content.splice(index, 1);
    });
  },
  methods: {
    addModule(sym) {
      this.content.push({
        courses: [],
        type: sym,
      });
    },
    getJson() {
      let res = {
        title: this.title,
        content: [],
      };
      for (const item of this.content) {
        let tmp = {
          type: item.type,
          courses: [],
        };
        for (const c of item.courses) {
          if (!check(c)) {
            tmp.courses.push(c);
          }
        }
        if (tmp.courses.length != 0) {
          res.content.push(tmp);
        }
      }
      return res;
    },
    save() {
      let res = this.getJson();

      localStorage[rTitle(res.title)] = saveRAsJson(res);
      this.$router.push("/");
    },
    exportJson() {
      let res = this.getJson();
      let link = document.createElement("a");
      link.download = `${this.title}.json`;
      link.href = "data:text/plain," + JSON.stringify(res);
      link.click();
    },
    importJson() {
      let input = document.createElement("input");
      input.type = "file";
      input.onchange = (event) => {
        let files = event.target.files;
        if (!files || !files.length) {
          input = null;
          ERR("No files");
          return;
        }

        let reader = new FileReader();
        reader.onload = (event) => {
          try {
            let r = JSON.parse(event.target.result);
            this.content = r.content;
            this.title = r.title;
          } catch (e) {
            ERR(e);
            return;
          }
        };
        reader.readAsText(files[0]);
      };

      input.click();
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
</style>