<template>
  <div class="bg">
    <span>
      <i class="el-icon-user-solid" style="color:#e6a23c"></i>
      {{username}}
      <el-button
        type="info"
        plain
        icon="el-icon-close"
        size="mini"
        style="font-size:16px;padding:5px" @click="exit"
      >退出</el-button>
    </span>
  </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
export default {
  data() {
    return {
      ...mapGetters({
        data: "login/data",
      }),
      username: "",
    };
  },
  mounted() {
      this.username = this.data().list.username;
  },
  methods:{
    ...mapMutations({
      changeData:'login/changeData'
    }),
    exit(){
      this.changeData(null)
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  background-color: rgb(179, 192, 209);
  height: 50px;
  line-height: 50px;
  text-align: right;
}
span {
  display: inline-block;
  margin-right: 50px;
  color: #fff;
}
</style>