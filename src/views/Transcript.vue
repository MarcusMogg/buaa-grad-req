<template>
  <Markdown :content="content" />
</template>

<script>
// @ is an alias to /src
import Markdown from "@/components/Markdown.vue";

let xxx = `# 如何获取完整的成绩表
第一步: 进入综合教务管理系统,选择重修选课
![img1](${require("@/assets/trans-01.png")})
第二步: 任意选择一个学期，点击重修办理
![img2](${require("@/assets/trans-02.png")})
第三步: 选择通过课程
![img3](${require("@/assets/trans-03.png")})
第四步: 批量选择，复制（注意不要选到表头)
![img4](${require("@/assets/trans-04.png")})
`;

export default {
  name: "",
  components: {
    Markdown,
  },
  data: () => {
    return { content: xxx };
  },
};
</script>