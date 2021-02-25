<template>
  <div class="markdown-body" v-html="markedContent"></div>
</template>

<script>
import marked from "marked";

var rendererMD = new marked.Renderer();

marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

export default {
  name: "MarkdownBody",
  props: {
    content: String,
  },
  computed: {
    markedContent: function () {
      return marked(this.content);
    },
  },
};
</script>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>