<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="80px">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" :value="form.roleid"></el-option>
            <el-option
              :label="item.rolename"
              :value="item.id"
              v-for="item in jueseList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" show-password></el-input>
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
  requestGuanliyuanAdd,
  requestGuanliyuanDetail,
  requestGuanliyuanEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "guanliyuan/list",
      jueseList: "juese/list",
    }),
  },
  methods: {
    ...mapActions({
      changeGuanliyuanAc: "guanliyuan/changeListAc",
      changeListAc: "juese/changeListAc",
      changeCountAc: "guanliyuan/changeCountAc",
    }),
    //点击取消
    cancel() {
      this.info.show = false;
      this.form = {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      };
      this.$message({
        message: "取消",
        type: "info",
      });
    },
    //点击添加
    add() {
      requestGuanliyuanAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.form = {
            roleid: 1,
            username: "",
            password: "",
            status: 1,
          };
          this.changeCountAc()
          //重新渲染页面
          this.changeGuanliyuanAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //父子通信
    getDetail(id) {
      requestGuanliyuanDetail({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.info.show = true;
          this.form.password = "";
        }
      });
    },
    update() {
      requestGuanliyuanEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.form = {
            roleid: 1,
            username: "",
            password: "",
            status: 1,
          };
          this.changeGuanliyuanAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.jueseList.length == 0) {
      this.changeListAc();
    }
  },
};
</script>

<style>
</style>