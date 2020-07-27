<template>
  <div>
    <el-table :data="list" border style="width: 97%">
      <el-table-column prop="id" label="角色编号" width="100"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @del='del(scope.row.id)'></del-btn>
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
      list: "juese/list",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "juese/changeListAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestJueseDel({ id: id }).then((res) => {
        if(res.data.code == 200){
          successAlert(res.data.msg)
          this.changeListAc();
        }else{
          warningAlert(res.data.msg)
        }
      });
    },
  },
  mounted() {
    this.changeListAc();
  },
};
</script>

<style>
</style>