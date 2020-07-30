<template>
  <div>
    <el-table :data="list" row-key="id" border style="width: 97%">
      <el-table-column prop="title" label="活动名称" width="190"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag type="success" effect="dark" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="info" effect="dark" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestMiaoshaDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "miaosha/list",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "miaosha/changeListAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestMiaoshaDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.changeListAc();
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>