<template>
  <div id="app">
    <div>
      <el-button type="text" @click="handleQuit" v-if="isLogin">退出</el-button>
      <el-button type="text" @click="handleLogin " v-if="!isLogin">登录</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
      <el-tab-pane v-for="(item,index) in tabs" :label="item.label" :name="item.value" :key="index"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"

  export default {
    name: "App",
    computed: {...mapGetters(["isLogin"])},
    watch:  {
        $route(route){
          this.$nextTick(()=>{
            this.loadingIcon()
          })
      }
    },
    data() {
      return {
        activeName: "/",
        tabs: [
          {
            label: "Home", value: "/", icon: "el-icon-s-home"
          },
          {
            label: "Cart", value: "/cart", icon: "el-icon-s-cooperation"
          },
          {
            label: "Login", value: "/login", icon: "el-icon-setting"
          }
        ]
      }
    },
    methods: {
      handleClick() {
        this.$router.push(this.activeName)
      },
      handleQuit() {
        this.$http.get("/api/logout")
      },
      handleLogin() {
        this.$http.get("/login")
      },
      loadingIcon(){
        this.$nextTick(()=>{
          this.$refs.tabs.$children[0].$refs.tabs.forEach((item,i) =>{
            if(item.classList[i] != this.tabs[i].icon){
              item.classList.add(this.tabs[i].icon)
            }
          })
        })

      }
    },
    created() {
      this.$nextTick(()=>{
        this.loadingIcon()
      })
    },
    mounted() {

    }

  }
</script>

<style scoped lang="scss">
  /deep/ .el-tabs__nav {
      width: 400px;
    /deep/ .el-tabs__item{
      text-align: center;
      width: 150px;
      font-size: 16px;
    }
  }


</style>
