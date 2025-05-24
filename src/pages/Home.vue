<template>
  <div class="main ">
    <div class="box">
      <img class=" col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 "
           :class="show?'animate__animated animate__flip':''"
           src="../../public/logo.png" alt="logo"
           @load="handleImageLoad"
      >
      <h2 v-show="show" class="content">欢迎来到 infist 线上面试环节，期待你的加入！</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

let show = ref(false)
function handleImageLoad(){
  show.value = true
  setTimeout(()=>{
    router.push({
      name:"interview"
    })
  },2000)
}

</script>

<style scoped lang="scss">
 .main{
   height: 100%;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
   .box{
     width: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     img{
       height: auto;
     }
     .content{
       text-align: center;
     }
   }
 }

</style>