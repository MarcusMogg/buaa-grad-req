<template>
  <div>
    <el-button plain class="entry-title">{{ title }}</el-button>
    <el-button type="primary" icon="el-icon-edit" circle></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      circle
      @click="del"
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "CardEntry",
  props: {
    title: String,
  },
  methods: {
    del() {
      this.$bus.emit("deleteTrans", this.title);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.entry-title {
  width: 80%;
  max-width: 250px;
}
</style>
