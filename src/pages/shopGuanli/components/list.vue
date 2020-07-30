<template>
  <div>
    <el-table :data="list" border style="width: 96%">
      <el-table-column prop="id" label="商品编号" width="100"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="110"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="110"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="110"></el-table-column>
      <el-table-column label="图片" width="140">
          <template slot-scope="scope">
              <img :src="$imgPre+scope.row.img" alt="">
          </template>
      </el-table-column>
      
      <el-table-column label="是否新品" width="110">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.isnew==1">是</el-tag>
          <el-tag type="info" effect="dark" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="110">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark" v-if="scope.row.ishot==1">是</el-tag>
          <el-tag type="info" effect="dark" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110">
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
import { requestGuanliDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "guanli/list",
      count: "guanli/count",
      size: "guanli/size",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "guanli/changeListAc",
      changeCountAc: "guanli/changeCountAc",
      changePageAc: "guanli/changePageAc",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      requestGuanliDel({ id: id }).then((res) => {
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

<style scoped>
img{
    width: 100px;
    height: 100px;
}
</style>