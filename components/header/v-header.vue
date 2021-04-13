<template>
    <header  class="header-box">
      <div class="container">
        <div class="header">
          <nuxt-link to="/"><v-header-logo/></nuxt-link>
          <v-header-navbar/>
        </div>
      </div>
    </header>
</template>

<script>
import VHeaderLogo from './v-header-logo.vue'
import VHeaderNavbar from './v-header-navbar.vue'
export default{
  name: 'v-header',
  components: {VHeaderLogo, VHeaderNavbar  },
  data(){
    return{}
  },
  methods:{
  }
}
</script>

<style lang="scss">
.header-box{
  background-color: rgb(77, 77, 77);
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: rgb(228, 228, 228); 
  & a{
    color: rgb(228, 228, 228); 
    font-size: 15px;
  }
}

</style>
