<template>
  <div class="chat-page">
        <img src="../assets/images/kitty/kitty.png" alt="" class="chat-page__kitty">
        <v-kitty-chat/>
  </div>
</template>

<script>
import vKittyChat from '~/components/chat/v-kitty-chat.vue'
export default{
  components: { vKittyChat },
  layout: 'clear',
  name: 'chat',
  data(){
    return{
      
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss">
.chat-page{
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    &__kitty{
        position: absolute;
        z-index: 5;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
