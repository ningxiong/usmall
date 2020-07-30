<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px" v-for="(item,index) in attrArr" :key="index">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addRules">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delRules(index)">删除</el-button>
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
  requestRulesAdd,
  requestRulesDetail,
  requestRulesEdit,
} from "../../../utils/request";
import { mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      changeListAc: "rules/changeListAc",
      changeCountAc: "rules/changeCountAc",
    }),
    addRules() {
      this.attrArr.push({
        value: "",
      });
    },
    delRules(index) {
      this.attrArr.splice(index, 1);
    },
    //点击取消
    cancel() {
      this.info.show = false;
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    //点击添加
    add() {
      if (!this.$regBlank.test(this.form.specsname)) {
        warningAlert("请输入规格名称");
        return;
      }
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestRulesAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.cancel();

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
      requestRulesDetail({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list[0];
          this.info.show = true;
          this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => {
            return { value: item };
          });
        }
      });
    },
    update() {
      if (!this.$regBlank.test(this.form.specsname)) {
        warningAlert("不能设置规格名称");
        return;
      }
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestRulesEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.show = false;
          this.cancel();
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
.el-form-item__content {
  display: flex;
}
</style>