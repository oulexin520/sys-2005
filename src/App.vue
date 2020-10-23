<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>
<script>
 export default{
   data(){
     return{
      input:''
     }
   },
   mounted () {//此时会遇到未登录问题
     
   }
 }
</script>
