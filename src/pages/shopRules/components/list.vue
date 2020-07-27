<template>
  <div>
    <el-table :data="list" border style="width: 96%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性" width="250">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
import { requestRulesDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "rules/list",
      count: "rules/count",
      size: "rules/size",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "rules/changeListAc",
      changeCountAc: "rules/changeCountAc",
      changePageAc: "rules/changePageAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestRulesDel({ id: id }).then((res) => {
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
    this.changeCountAc();
    this.changeListAc();
  },
};
</script>

<style>
</style>