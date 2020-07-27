<template>
  <div>
    <el-table :data="list" border style="width: 96%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cTal"
      :page-size="size"
      :total="count"
      style="text-align:center;margin-top:20px"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestGuanliyuanDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      list: "guanliyuan/list",
      count: "guanliyuan/count",
      size: "guanliyuan/size",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "guanliyuan/changeListAc",
      changeCountAc: "guanliyuan/changeCountAc",
      changePageAc: "guanliyuan/changePageAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestGuanliyuanDel({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.changeCountAc();
          //重新渲染页面
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cTal(id) {
      this.changePageAc(id);
      this.changeListAc();
    },
  },
  mounted() {
    /* if (this.list.length == 0) {
      this.changePageAc(1);
    } */
    this.changeCountAc();
    this.changeListAc();
  },
};
</script>

<style>
</style>