<template>
  <div>
    <el-button type="primary" class="btn" @click="show">添加</el-button>
    <v-list @edit='edit'></v-list>
    <v-add :info='info' ref="add"></v-add>
  </div>
</template>

<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
  data(){
    return {
      info: {
        show: false,
        isAdd: true,
        title: "商品管理",
      },
    }
  },
  methods:{
    show() {
      this.info.title = "商品管理";
      this.info.show = true;
      this.info.isAdd = true;
    },
    edit(id){
      this.info.title = "商品编辑";
      this.info.isAdd = false;
      this.$refs.add.getDetail(id)
    }
  },
  components:{
    vList,
    vAdd
  }
}
</script>

<style>
.btn{
  margin-bottom: 10px;
}
</style>