<template>
  <div class="chat-page">
      <v-chat/>
  </div>
</template>

<script>
import vChat from '~/components/chat/v-chat.vue'
export default{
  components: { vChat },
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
  background: url(./assets/images/chat/хер.webp) center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding-top: 10px;
}
</style>
