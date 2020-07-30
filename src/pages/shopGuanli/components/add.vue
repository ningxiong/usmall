<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFenlei()">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              :value="item.id"
              v-for="item in fenleiList"
              :key="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              :value="item.id"
              v-for="item in attrsArr"
              :key="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <el-upload class="avatar-uploader" action :show-file-list="false" :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpec()">
            <el-option label="--请选择--" value disable></el-option>
            <!-- 动态数据 -->
            <el-option
              :value="item.id"
              v-for="item in rulesList"
              :key="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value disable></el-option>
            <!-- 动态数据 -->
            <el-option :value="item" v-for="item in specArr" :key="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="80px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch
            v-model="form.status"
            active-color="#409EFF"
            inactive-color="#dcdfe6"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="80px">
          <div id="box1"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestGuanliAdd,
  requestGuanliDetail,
  requestGuanliEdit,
} from "../../../utils/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      editor2: "",
      attrsArr: [],
      specArr: [],
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        description: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      fenleiList: "fenlei/list",
      rulesList: "rules/list",
    }),
  },
  methods: {
    ...mapActions({
      changeFenleiListAc: "fenlei/changeListAc",
      changeRulesListAc: "rules/changeListAc",
      changeCountAc: "guanli/changeCountAc",
      changeListAc: "guanli/changeListAc",
    }),
    //一级列表发生修改
    changeFenlei(bool) {
      let index = this.fenleiList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.attrsArr = this.fenleiList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
      }
    },

    changeImg(e) {
      //判断上传文件大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("请上传不大于2M的图片");
        return;
      }
      //上传的文件后缀必须是.png .jpg .gif .jpeg
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //规格动态数据
    changeSpec(bool) {
      let index = this.rulesList.findIndex(
        (item) => item.id == this.form.specsid
      );
      // console.log(this.rulesList)
      this.specArr = this.rulesList[index].attrs;
      if (!bool) {
        this.form.specsattr = [];
      }
    },

    createEditor() {
      this.editor2 = new E("#box1");
      this.editor2.create();
      this.editor2.txt.html(this.form.description);
    },

    //点击取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        description: "",
        status: 1,
      };
      this.imageUrl = "";
      this.attrsArr = [];
      this.specArr = [];
      this.editor2.txt.html("");
    },
    //点击添加
    add() {
      if (!this.$regBlank.test(this.form.first_cateid)) {
        warningAlert("请选择一级分类");
        return;
      }
      if (!this.$regBlank.test(this.form.second_cateid)) {
        warningAlert("请选择二级分类");
        return;
      }
       if (!this.$regBlank.test(this.form.goodsname)) {
        warningAlert("请输入商品名称");
        return;
      }
      if (!this.$regBlank.test(this.form.price)) {
        warningAlert("请输入价格");
        return;
      }
      if (!this.$regBlank.test(this.form.market_price)) {
        warningAlert("请输入市场价格");
        return;
      }
      if (!this.$regBlank.test(this.form.img)) {
        warningAlert("请上传图片");
        return;
      }
      if (!this.$regBlank.test(this.form.specsid)) {
        warningAlert("请选择商品规格");
        return;
      }
      if (!this.$regBlank.test(this.form.specsattr)) {
        warningAlert("请选择规格属性");
        return;
      }
      this.form.description = this.editor2.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGuanliAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.empty();

          this.changeCountAc();
          //重新渲染页面
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //父子通信
    getDetail(id) {
      requestGuanliDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.info.show = true;
          this.form.id = id;
          this.imageUrl = this.$imgPre + res.data.list.img;
          this.changeSpec(true);
          this.changeFenlei(true);
          this.form.specsattr = JSON.parse(this.form.specsattr);
        }
      });
    },
    update() {
      if (!this.$regBlank.test(this.form.goodsname)) {
        warningAlert("请输入商品名称");
        return;
      }
      if (!this.$regBlank.test(this.form.price)) {
        warningAlert("请输入价格");
        return;
      }
      if (!this.$regBlank.test(this.form.market_price)) {
        warningAlert("请输入市场价格");
        return;
      }
      if (!this.$regBlank.test(this.form.img)) {
        warningAlert("请上传图片");
        return;
      }
      this.form.description = this.editor2.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      requestGuanliEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.empty();
          //重新渲染页面
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.fenleiList.length === 0) {
      this.changeFenleiListAc();
    }
    if (this.rulesList.length === 0) {
      this.changeRulesListAc(true);
    }
  },
};
</script>

<style scoped lang=stylus>
.el-form-item__content {
  display: flex;
}

.box >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.box >>> .el-upload:hover {
  border: 1px dashed #409EFF !important;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.box >>> .el-dialog{
  width: 850px !important;
}
</style>