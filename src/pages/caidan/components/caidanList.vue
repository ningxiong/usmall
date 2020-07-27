<template>
  <el-table
    :data="caidan"
    style="width: 98%"
    row-key="id"
    border
    :tree-props="{children: 'children'}"
  >
  
    <el-table-column prop="id" label="菜单编号" width="100"></el-table-column>
    <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
    <el-table-column  label="菜单图标" width="180" >
      <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="菜单地址" width="180"></el-table-column>
    <el-table-column label="状态" width="180">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.status==1" effect="dark">启用</el-tag>
        <el-tag type="info" v-if="scope.row.status==2" effect="dark">禁用</el-tag>
      </template>
    </el-table-column>
   
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    
  </el-table>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { delCaidanList } from "../../../utils/request";
export default {
  data() {
    return {
      value: "",
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      changeCaidanAc: "caidan/changeCaidanAc",
    }),
    edit(id) {
      this.info.isAdd = false;
      this.info.title = "菜单编辑";
      this.info.show = true;
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          delCaidanList({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.changeCaidanAc();
            } else {
              warningAlert(res.data.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    ...mapGetters({
      caidan: "caidan/caidan",
    }),
  },
  mounted() {
    this.changeCaidanAc();
  },
};
</script>

<style>
</style>
