<template>
  <div class="chat-page">
      <v-neon-chat/>
  </div>
</template>

<script>
import vNeonChat from '~/components/chat/v-neon-chat.vue'
export default{
  components: { vNeonChat },
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
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
