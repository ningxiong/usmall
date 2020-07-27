<template>
  <div class="index">
    <v-left></v-left>
    <div class="right">
      <v-head></v-head>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="group">
        <el-breadcrumb-item :to="{ path: '/index/home' }" style="font-size:14px">首页</el-breadcrumb-item>
        <el-breadcrumb-item >{{$route.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view class="con"></router-view>
    </div>
  </div>
</template>

<script>
import vLeft from "./components/vLeft";
import vHead from "./components/vHead";
export default {
  components: {
    vLeft,
    vHead,
  },
};
</script>

<style scoped>
.group {
  margin-top: 20px;
  padding-left: 10px;
}
.index {
  display: flex;
  height: 100%;
}
.right {
  flex: 1;
}
.con{
    margin-top: 20px;
    padding-left: 10px;
}
</style>