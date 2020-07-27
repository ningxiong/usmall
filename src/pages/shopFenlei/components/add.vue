<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" disabled value></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.catename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="80px" v-if="form.pid!=0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  requestFenleiAdd,
  requestFenleiDetail,
  requestFenleiEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "fenlei/list",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "fenlei/changeListAc",
    }),
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
    //点击取消
    cancel() {
      this.info.show = false;
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = ''
      this.$message({
        message: "取消",
        type: "info",
      });
    },
    //点击添加
    add() {
      requestFenleiAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.form = {
            pid: 0,
            catename: "",
            img: "",
            status: 1,
          };
          //重新渲染页面
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //父子通信
    getDetail(id) {
      requestFenleiDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.imageUrl = this.$imgPre + res.data.list.img;
          this.info.show = true;
        }
      });
    },
    update() {
      requestFenleiEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.form = {
            pid: 0,
            catename: "",
            img: "",
            status: 1,
          };
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
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