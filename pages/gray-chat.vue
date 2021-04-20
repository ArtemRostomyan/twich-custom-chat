<template>
  <div class="chat-page">
      <v-gray-chat/>
  </div>
</template>

<script>
import vGrayChat from '~/components/chat/v-gray-chat.vue'
export default{
  components: { vGrayChat },
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
