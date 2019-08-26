<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Home" name="home"></el-tab-pane>
      <el-tab-pane label="About" name="about"></el-tab-pane>
      <el-tab-pane label="Login" name="login"></el-tab-pane>
    </el-tabs>
    <el-button type="text" @click="handleQuit">退出</el-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      activeName:'home'
    }
  },
  methods:{
    handleClick(){
      if (this.activeName == 'about'){
        this.$router.push('about')
      }
      else if(this.activeName == 'login'){
        this.$router.push('login')
      }
      else if(this.activeName == 'home'){
        this.$router.push('home')
      }
    },
    handleQuit(){

    }
  }

}
</script>

<style >


</style>
