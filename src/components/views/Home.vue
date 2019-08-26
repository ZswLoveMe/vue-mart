<template>
    <div class="home">
      1111
    </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{
        activeName:'about'
      }
    },
    methods:{

    },
    async created() {
      const res = await this.$http.get('/api/goods')
      console.log(res);
    }
  }
</script>

<style scoped>

</style>
