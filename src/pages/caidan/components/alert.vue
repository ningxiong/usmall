<template>
  <el-dialog :title="info.title" :visible.sync="info.show">
    <el-form :model="form">
      <el-form-item label="菜单名称" label-width="80px">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" label-width="80px">
        <el-select v-model="form.pid">
          <el-option label="--请选择--" disabled value></el-option>
          <el-option label="顶级菜单" :value="form.pid"></el-option>
          <el-option :label="item.title" :value="item.id" v-for="item in caidan" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" label-width="80px">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
        <el-select v-model="form.icon">
          <el-option label="--请选择--" disabled value></el-option>
          <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" label-width="80px" v-else>
        <el-select v-model="form.url">
          <el-option label="--请选择--" value disabled></el-option>
          <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestCaidanList,
  requestCaidanInfo,
  xiugaiCaidanList,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //图标集合
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      //路由集合
      urls: [
        "/index/home",
        "/index/caidan",
        "/index/juese",
        "/index/guanliyuan",
        "/index/shopFenlei",
        "/index/shopGuanli",
        "/index/shopRules",
        "/index/huiyuan",
        "/index/banner",
        "/index/miaosha",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      caidan: "caidan/caidan",
    }),
  },
  methods: {
    ...mapActions({
      changeCaidanAc: "caidan/changeCaidanAc",
    }),
    add() {
      requestCaidanList(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.show = false;
          successAlert(res.data.msg);
          this.form = {
            pid: 1,
            title: "",
            icon: "",
            type: 1,
            url: "",
            status: 1,
          };
          this.changeCaidanAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestCaidanInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
      xiugaiCaidanList(this.form).then((res) => {
        if (res.data.code) {
          this.info.show = false;
          successAlert(res.data.msg);
          this.form = {
            pid: 1,
            title: "",
            icon: "",
            type: 1,
            url: "",
            status: 1,
          };
          this.changeCaidanAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    cancel() {
      this.info.show = false;
      this.form = {
        pid: 1,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
  },
};
</script>

<style>
</style>