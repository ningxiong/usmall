<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="list"
            :default-checked-keys="keys"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="defaultProps"
          ></el-tree>
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
  requestJueseAdd,
  requestJueseDetail,
  requestJueseEdit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      keys: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "caidan/caidan",
    }),
  },
  methods: {
    ...mapActions({
      changeCaidanAc: "caidan/changeCaidanAc",
      changeListAc: "juese/changeListAc",
    }),
    //点击取消
    cancel() {
      this.info.show = false;
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$message({
        message: "取消",
        type: "info",
      });
      this.keys = this.$refs.tree.setCheckedKeys([]);
    },
    //点击添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestJueseAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          this.info.show = false;
          this.form = {
            rolename: "",
            menus: "",
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
      requestJueseDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.keys = JSON.parse(res.data.list.menus);
          this.form = res.data.list;
          this.form.id = id;
          this.info.show = true;
        }
      });
    },
    update() {
      // console.log(this.form)
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestJueseEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.form = {
            rolename: "",
            menus: "",
            status: 1,
          };
          this.keys = this.$refs.tree.setCheckedKeys([]);
          this.changeListAc();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.changeCaidanAc();
    }
  },
};
</script>

<style>
</style>