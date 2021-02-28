
<template>
  <div class="entry">
    <el-table :data="tData" stripe :show-header="false" style="width: 100%">
      <el-table-column label="课程代码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[0].code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[0].name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程类型" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[0].category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学分" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[0].unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程代码" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[1].code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[1].name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程类型" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[1].category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学分" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row[1].unit }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as courses from "@/model/course_module.js";
export default {
  name: "CourseEntry",
  props: {
    tableData: Array,
  },
  data() {
    return {};
  },
  computed: {
    tData() {
      return this.tableData.map((x) => [
        x[0],
        {
          code: x[1].code,
          name: x[1].name,
          category: courses.CourseCategory[x[1].category],
          unit: x[1].unit,
        },
      ]);
    },
  },
};
</script>

