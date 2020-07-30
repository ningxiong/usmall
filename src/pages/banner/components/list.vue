<template>
  <div>
    <el-table
      :data="list"
      row-key="id"
      border
      style="width: 97%"
    >
      <el-table-column prop="id" label="分类编号" width="100"></el-table-column>
      <el-table-column prop="title" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img||''" alt />
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
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { requestBannerDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "banner/changeListAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestBannerDel({ id: id }).then((res) => {
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
img{
    width: 100px;
    height: 100px;
}
</style>