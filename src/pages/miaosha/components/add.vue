<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" label-width="80px">
          <el-date-picker
            v-model="timeArr"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFenlei()">
            <el-option label="--请选择--" disabled value></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in fenleiList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" @change="changeTwo">
            <el-option label="--请选择--" disabled value></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in attrArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" disabled value></el-option>
            <el-option
              :label="item.goodsname"
              :value="item.id"
              v-for="item in twoArr"
              :key="item.id"
            ></el-option>
          </el-select>
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
  requestMiaoshaAdd,
  requestMiaoshaDetail,
  requestMiaoshaEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      timeArr: [],
      attrArr: [],
      twoArr: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      fenleiList: "fenlei/list",
      guanliList: "guanli/list",
    }),
  },
  methods: {
    ...mapActions({
      changeFenleiListAc: "fenlei/changeListAc",
      changeGuanliListAc: "guanli/changeListAc",
      changeMiaoshaListAc: "miaosha/changeListAc",
    }),

    changeFenlei(bool) {
      var index = this.fenleiList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.attrArr = this.fenleiList[index].children;
      if (!bool) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
        this.twoArr = [];
      }
    },

    changeTwo(bool) {
      this.twoArr = [];
      this.guanliList.forEach((item) => {
        if (
          item.first_cateid == this.form.first_cateid &&
          item.second_cateid == this.form.second_cateid
        ) {
          this.twoArr.push({
            id: item.id,
            goodsname: item.goodsname,
          });
        }
      });
      if (!bool) {
        this.form.goodsid = "";
      }
    },

    //点击取消
    cancel() {
      this.info.show = false;
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.timeArr = [];
      this.twoArr = [];
      this.attrArr = [];
    },
    //点击添加
    add() {
      this.form.begintime = this.timeArr[0].getTime();
      this.form.endtime = this.timeArr[1].getTime();
      requestMiaoshaAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.cancel();
          //重新渲染页面
          this.changeMiaoshaListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //父子通信
    getDetail(id) {
      requestMiaoshaDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          var date = new Date(Number(res.data.list.begintime));
          var date1 = new Date(Number(res.data.list.endtime));
          this.timeArr = [date, date1];
          this.form = res.data.list;
          this.form.id = id;
          this.info.show = true;
          this.changeFenlei(true);
          this.changeTwo(true);
        }
      });
    },
    update() {
      this.form.begintime = this.timeArr[0].getTime();
      this.form.endtime = this.timeArr[1].getTime();
      requestMiaoshaEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.cancel();
          this.changeMiaoshaListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.changeFenleiListAc();
    this.changeGuanliListAc(true);
  },
};
</script>

<style scoped lang=stylus>
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
</style>