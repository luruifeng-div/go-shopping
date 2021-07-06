<template>
  <div>
     <el-button type="info" @click="loginout">退出</el-button>
  </div>
</template>

<script>
export default {
   methods:{
     loginout(){
       sessionStorage.removeItem("token");
       this.$router.push("/login");
     }
   }
}
</script>

<style>

</style>