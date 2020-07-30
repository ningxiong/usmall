<template>
  <div>
    <v-list @edit="edit"></v-list>
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
      },
    }
  },
  methods:{
    show() {
      this.info.show = true;
    },
    edit(id){
      this.$refs.add.getDetail(id)
    }
  },
  components:{
    vList,
    vAdd
  }
}
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>