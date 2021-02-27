
<template>
  <div class="entry">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="课程代码" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.code" placeholder="B1A09104A"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="200">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="工科数学分析(1)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="课程类型" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.category">
            <el-option
              v-for="key in options"
              :key="key"
              :label="key"
              :value="key"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="学分" width="200">
        <template slot-scope="scope">
          <el-input-number
            :controls="false"
            v-model="scope.row.unit"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as courses from "@/model/course_module.js";

export default {
  name: "CourseTable",
  props: {
    tableData: Array,
  },
  data() {
    return {
      options: [...courses.Categorys.keys()],
    };
  },
  methods: {
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
  },
};
</script>

