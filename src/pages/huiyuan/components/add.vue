<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestHuiyuanDetail,
  requestHuiyuanEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      phone1: 0,
      form: {
        nickname: "",
        phone: 1,
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "huiyuan/list",
    }),
  },
  methods: {
    ...mapActions({
      changeListAc: "huiyuan/changeListAc",
    }),
    //父子通信
    getDetail(id) {
      requestHuiyuanDetail({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.phone1 = res.data.list.phone;
          this.info.show = true;
          this.form.password = "";
        }
      });
    },
    update() {
      if (this.form.password.length == 0) {
        this.form.password = this.list.filter((item) => {
         return item.phone == this.phone;
        }).password;
      }
      requestHuiyuanEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.form = {
            nickname: "",
            phone: 1,
            password: "",
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

<style>
</style>