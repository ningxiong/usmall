<template>
  <div>
    <el-button type="primary" class="btn" @click="show">添加</el-button>
    <v-caidan-list :info="info" @edit="edit"></v-caidan-list>
    <v-alert :info="info" ref="add"></v-alert>
  </div>
</template>

<script>
import vCaidanList from "./components/caidanList";
import vAlert from "./components/alert";
export default {
  data() {
    return {
      info: {
        show: false,
        isAdd: true,
        title: "菜单管理",
      },
    };
  },
  methods: {
    show() {
      this.info.title = "菜单管理";
      this.info.show = true;
      this.info.isAdd = true;
    },
    edit(id) {
      this.$refs.add.getDetail(id);
    },
  },

  components: {
    vCaidanList,
    vAlert,
  },
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>