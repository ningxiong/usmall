<template>
  <div class="bg">
    <div class="con">
      <h3>登录</h3>
      <input type="text" placeholder="请输入用户名" v-model="form.username" />
      <br />
      <input type="password" placeholder="请输入密码" v-model="form.password" />
      <br />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  data() {
    return {
      ...mapGetters({
        data: "login/data",
      }),
      form: {
        username: "admin",
        password: "123",
      },
    };
  },
  methods: {
    ...mapActions({
      changeDataAc: "login/changeDataAc",
    }),
    login() {
      this.changeDataAc(this.form);
      var time = setTimeout(() => {
        if (Object.keys(this.data()).length != 0) {
          if (this.data().code === 200) {
            successAlert(this.data().msg);
            localStorage.setItem("islogin", 1);
            this.$router.push("/index");
            clearTimeout(time);
          } else {
            warningAlert(this.data().msg);
            clearTimeout(time);
          }
        } else {
          return;
        }
      }, 500);
    },
  },
};
</script>

<style scoped>
.con {
  width: 500px;
  height: 280px;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}
input {
  width: 70%;
  line-height: 46px;
  height: 46px;
  margin-bottom: 20px;
  outline: none;
  box-sizing: border-box;
}
.bg {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #553443, #2f3d60);
}
h3 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 15px;
}
button {
  width: 70%;
  background: cornflowerblue;
  outline: none;
  border: none;
  padding: 10px 0;
  color: #fff;
}
</style>