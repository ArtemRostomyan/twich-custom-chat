<template>
    <div v-fixedScroll class="chat">
        <div class="chat__content">
            <div v-for="(komment, index) in chat" :key="index" class="chat__item">
                <p 
                    class="name"
                    :class="{'active__sub': komment.subscriber, 'active__mod' : komment.mod}"
                    :style="`color: ${komment.color}`">
                        <img class="elit subscriber" v-if="komment.subscriber == true " :src="require('~/assets/images/chat/fire.gif')" alt="">
                        <img class="elit moder" v-if="komment.mod == true &&  komment['display-name'] != 'Nightbot' &&  komment['display-name'] != 'StreamElements' " :src="require('~/assets/images/chat/diamond.gif')" alt="">
                        <img class="elit nightBot" v-if="komment['display-name'] === 'Nightbot' || komment['display-name'] === 'StreamElements' " :src="require('~/assets/images/chat/robot.gif')" alt="">
                        {{komment['display-name']}}</p>
                        
                        
                <p 
                    class="message"
                    :class="{'active__sub': komment.subscriber  , 'active__mod' : komment.mod}"
                    >{{komment.message}}</p>
            </div>
        </div>
        <img :src="require('~/assets/images/chat/guns.svg')" alt="" class="gun">
    </div>
</template>

<script>
import tmi from 'tmi.js'
export default {
    name: 'v-chat',
    data() {
        return{
        }
    },
    methods: {
        
    },
    computed: {
        chat(){
            return this.$store.getters['chat/CHAT']
        }
    },
    mounted() {
        const client = new tmi.Client({
            connection: { reconnect: true },
            channels: [ 'mokrivskyi' ]
        });
        client.connect();
        client.on('message', (channel, tags, message, self) => {
            let new_koment = tags
            if(tags['display-name'] == "dragnisimus"){
                tags.subscriber = true
                // tags.mod = true
            }
            tags.message = message
            this.$store.commit('chat/SET_CHAT_IN_STATE', new_koment, message)
        });
        
    }
}
</script>

<style lang="scss" scoped>
.chat{
    position: relative;
    overflow-y: hidden;
    width: 100%;
    height: 80vh;
    margin: 0 auto;
    background: url(./assets/images/chat/bc.jpg) center;
    background-repeat: no-repeat;
    background-color: rgba(156, 13, 108, 0.5);
    border: 3px solid rgba(156, 13, 51, 0.3);
    box-shadow: 0 0 10px 2px red;
    border-radius: 10px;
    padding: 10px;
    &__content{
        z-index: 1;
        position: absolute;
        overflow: hidden;;
        width: 93%;
        left: 40px;
        bottom: 0;
        padding: 10px 25px;
    }
    &__item{
        display: flex;
        align-items: center;
        margin: 10px 0;
        background-color: rgba(0, 0, 0, 0.06);
        padding: 10px;
        border-radius: 20px;
    }
    
}
.name{
    position: relative;
    background-color: rgba(255, 255, 255, 0.363);
    border-radius: 10px;
    padding: 10px;
    margin-left: 6px;
    font-weight: 700;
}
.message{
    color: #000;
    background-color: rgba(255, 255, 255);
    font-weight: 600;
    font-style: italic;
    padding: 10px;
    border-radius: 20px;
    margin: 0px 0px 0px 20px;
    overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: normal; 
        line-break: strict;  
            -webkit-hyphens: auto;

        hyphens: auto;  
}
.elit{
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 40%;
    width: 22px;
    height: 22px;
}
.subscriber{
    left: -16px;
    box-shadow: 0 0 10px 1px #000;
}
.moder{
    left: -36px;
    box-shadow: 0 0 10px 1px #ff46f0;
}
.nightBot{
    width: 40px;
    height: 40px;
    transition: 0.3s;
    left: -24px;
    background-color: rgba(255, 255, 255, 0.37);
    animation: bot 0.3s ease  1 forwards  ;
}
.gun{
    position: absolute;
    width: 40px;
    height: 40px;
    left: 4px;
    bottom: 22.5px;
}
.active{
    &__sub{
        border: 2px solid #ff7878;
        box-shadow: 0 0 10px 1px #ff7878;
        background-color: #fff;
    }
    &__mod{
        border: 2px solid #ff46f0;
        box-shadow: 0 0 10px 1px #ff46f0;
        background-color: #fff;
    }
}

@keyframes bot {
    0%{
        width: 50px;
        height: 50px;
    }
    100%{
        width: 30px;
        height: 30px;
    }
}

</style>