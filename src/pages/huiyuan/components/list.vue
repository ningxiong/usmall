<template>
  <div>
    <el-table :data="list" border style="width: 97%">
      <el-table-column prop="id" label="用户编号" width="100"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestJueseDel } from "../../../utils/request";
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "huiyuan/list",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "huiyuan/changeListAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.changeListAc();
  },
};
</script>

<style>
</style>