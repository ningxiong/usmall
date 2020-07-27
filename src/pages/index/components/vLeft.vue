<template>
  <div class="list">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- 首页导航 -->
      <el-menu-item index="/index/home">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
      </el-menu-item>

      <!-- 系统设置 -->
      <el-submenu :index="item.id+''" v-for="item in data" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ...mapGetters({
        list: "login/data",
      }),
      data: [],
    };
  },
  methods: {},
  mounted() {
    this.data = this.list().list.menus;
  },
};
</script>

<style>
.list {
  width: 200px;
  height: 100%;
  background: #333;
  overflow: hidden;
}
.el-menu-vertical-demo {
  border-right: none;
}
</style>

/* children: Array(3)
icon: "el-icon-setting"
id: 30
pid: 0
status: 1
title: "系统设置"
type: 1
url: "" */

/* icon: ""
id: 31
pid: 30
status: 1
title: "菜单管理"
type: 2
url: "/index/caidan" */