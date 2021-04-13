<template>
  <div class="logo-box">
    <p class="logo-box__title">Rostomyan</p>
    <span class="logo-box__subtitle">Created</span>
  </div>
</template>

<script>
export default{
  name: 'v-header-logo',
  data(){
    return{}
  },
  methods:{
  }
}
</script>

<style lang="scss">
.logo-box{
  box-sizing: border-box;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: 0.1s;
  &:hover{
    box-shadow: 0 0 5px 0 #fff;
  }
}
</style>
