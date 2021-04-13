<template>
  <div class="chat-page">
    <div class="container">
      <v-chat/>
    </div>
  </div>
</template>

<script>
import vChat from '~/components/chat/v-chat.vue'
export default{
  components: { vChat },
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
  
  min-height: 100vh;
  padding-top: 30px;
}
</style>
