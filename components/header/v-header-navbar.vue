<template>
  <nav class="nav">
    <ul class="nav__list">
      <li 
        class="nav__item"
        v-for="nav in navigations" 
        :key="nav.id">
        <router-link :to="`/${nav.id}`" active-class="active">
          {{nav.name}}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default{
  name: 'v-header-navbar',
  data(){
    return{
      navigations: [
        {
          "name": "Каталог",
          "id": "catalog"
        },
        {
          "name": "Неоновый чат",
          "id": "neon-chat"
        },
        {
          "name": "Серый чат",
          "id": "gray-chat"
        },
        {
          "name": "Kitty чат",
          "id": "kitty"
        },
        {
          "name": "Чат",
          "id": "chat"
        }
      ]
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
.nav__list{
  display: flex;
}
.nav__item{
  padding:  5px 10px;
  & .active{
    text-shadow: 0 0 15px #fff;
  }
}

</style>
