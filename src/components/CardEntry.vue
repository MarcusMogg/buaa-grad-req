<template>
  <div>
    <el-button plain class="entry-title" @click="select">{{ title }}</el-button>
    <el-button
      v-if="type"
      type="primary"
      icon="el-icon-edit"
      @click="edit"
      circle
    ></el-button>
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
    index: Number,
    type: Boolean,
  },
  methods: {
    del() {
      if (this.type) {
        this.$bus.emit("deleteReq", this.index);
      } else {
        this.$bus.emit("deleteTran", this.index);
      }
    },
    edit() {
      this.$bus.emit("edit", this.index);
    },
    select() {
      if (this.type) {
        this.$bus.emit("selectReq", this.title);
      } else {
        this.$bus.emit("selectTran", this.title);
      }
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
