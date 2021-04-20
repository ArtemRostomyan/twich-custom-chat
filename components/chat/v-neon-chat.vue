<template>
    <div v-fixedScroll class="chat">
        <img src="../../assets/images/neon-chat/верх.png" alt="" class="chat__top">
        <img src="../../assets/images/neon-chat/side.png" alt="" class="chat__left">
            <div class="chat__content">
                <div v-for="(komment, index) in chat" :key="index" class="chat__item">
                    <div 
                        class="name"
                        :class="{'active__sub': komment.subscriber, 'active__mod' : komment.mod}"
                        :style="`color: ${komment.color}`">
                            <div class="subscriber">
                                <img class="elit subscriber__image" v-if="komment.subscriber == true " :src="require('~/assets/images/chat/fire.gif')" alt="">
                                <span v-if="komment['badge-info.subscriber']"  class="subscriber__stazh">{{komment['badge-info.subscriber']}}</span>
                            </div>
                            <img class="elit moder" 
                                v-if="komment.mod == true &&  komment['display-name'] != 'Nightbot' &&  komment['display-name'] != 'StreamElements' &&  komment['display-name'] != 'Moobot' " 
                                :src="require('~/assets/images/chat/diamond.gif')" alt="">
                            <img class="elit nightBot" v-if="komment['display-name'] === 'Nightbot' || komment['display-name'] === 'StreamElements' || komment['display-name'] === 'Moobot' " :src="require('~/assets/images/chat/robot.gif')" alt="">
                            {{komment['display-name']}}</div>
                            
                    <div 
                        class="message"
                        :class="{'active__sub': komment.subscriber  , 'active__mod' : komment.mod}"
                        v-html="emotionalKomment(komment)"
                        ></div>
                </div>
            </div>
        <img src="../../assets/images/neon-chat/side.png" alt="" class="chat__right">
        <img src="../../assets/images/neon-chat/низ.png" alt="" class="chat__bottom">
    </div>
</template>

<script>
import tmi from 'tmi.js'
export default {
    name: 'v-chat',
    data() {
        return{
            gun_active: false
        }
    },
    methods: {
        emotionalKomment(komment){
            if(!komment.emotes){
                return komment.message
            }else{
                const stringReplacements = [];
                Object.entries(komment.emotes).forEach(([id, positions]) => {

                    const position = positions[0];
                    const [start, end] = position.split("-");
                    const stringToReplace = komment.message.substring(
                    parseInt(start, 10),
                    parseInt(end, 10) + 1
                    );

                    stringReplacements.push({
                    stringToReplace: stringToReplace,
                    replacement: ` <img style="width: 40px;" src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0"> `,
                    });
                });

                const messageHTML = stringReplacements.reduce(
                    (acc, { stringToReplace, replacement }) => {
                    return acc.split(stringToReplace).join(replacement);
                    },
                    komment.message
                );
                return messageHTML;
            } 
        }
    },
    computed: {
        chat(){
            return this.$store.getters['chat/CHAT']
        },
        
    },
    mounted() {
        
        const client = new tmi.Client({
            connection: { reconnect: true },
            channels: [ 'buster' ]
        });
        client.connect();
        client.on('message', (channel, tags, message, self) => {
            this.gun_active = !this.gun_active
            let new_koment = tags
            if(tags['display-name'] == "dragnisimus"){
                tags.subscriber = true
                tags.mod = true
            }
            if(tags.subscriber == true){
                console.log(tags)
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
    overflow: hidden;
    width: 100%;
    height: 100vh;
    padding-top: 5px;
    margin: 0 auto;
    background-repeat: no-repeat;
    padding: 10px;
    &::before{
            position: absolute;
            content: '';
            border-radius: 10px;
            width: 100%;
            z-index: 2;
            height: 20px;
            background-color: rgb(0, 0, 0);
            box-shadow: 0 0 500px 45px #355a98;
            top: 0;
            left: 0;
        }
    &__content{
        z-index: 1;
        position: absolute;
        overflow: hidden;
        background-color: rgb(0, 0, 0);
        width: 95%;
        min-height: 100%;
        left: 14px;
        bottom: 0;
        padding: 10px 25px 95px 25px;
        border-radius: 30px;
        @media(max-width: 480px){
            padding: 10px 25px 95px 25px;
            width: 95%;
            left: 10px;
            bottom: 10px;
        }
    }
    &__item{
        display: flex;
        align-items: center;
        margin: 10px 0;
        background: rgb(36,28,82);
        background: linear-gradient(90deg, rgba(36,28,82,1) 0%, rgba(98,39,142,1) 36%, rgba(213,60,253,1) 100%);
        padding: 10px;
        border-radius: 20px;
        animation: appearance-item 0.7s ease 1 forwards;
    }
    &__top{
        position: absolute;
        z-index: 3;
        left: 0;
        top: 0;
        width: 100%;
        
    }
    &__bottom{
        position: absolute;
        z-index: 3;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    &__left{
         position: absolute;
            z-index: 2;
            left: 4px;
            height: 69%;
            top: 120px;
            width: 17px;
            border-radius: 0px 0px 0px 176px;
            box-shadow: 0 0 15px 1px rgb(59, 144, 255);

    }
    &__right{
        position: absolute;
        z-index: 2;
        right: 4px;
        height: 69%;
        top: 120px;
        width: 17px;
        border-radius: 0px 0px 175px 0px;
        box-shadow: 0 0 15px 1px rgb(59, 144, 255);
    }
}
.name{
    position: relative;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 10px;
    padding: 10px;
    margin-left: 6px;
    font-weight: 700;
    font-size: 22px;
    @media(max-width: 480px){
        margin-left: 0px;
    }
}
.message{
    max-width: 950px;
    overflow-x: hidden;
    font-size: 22px;
    color: rgb(255, 255, 255);
    background-color: rgba(255, 255, 255, 0);
    font-weight: 600;
    font-style: italic;
    display: flex;
    align-items: center;
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
.message__img{
    width: 40px;
}
.elit{
    position: absolute;
    
    background-color: rgba(0, 0, 0, 0.5);
    top: 50%;
    transform: translate(0, -50%);
    border-radius: 40%;
    width: 23px;
    height: 23px;
}

.subscriber{
    position: relative;
    left: -35px;
    &__image{
        box-shadow: 0 0 10px 1px #000;
        
    }
    @media(max-width: 480px){
            top: -2px;
            left: -23px;
        }
    &__stazh{
        position: absolute;
        right: 0;
        bottom: 0;
    }
}
.moder{
    left: -24px;
    top: 40px;
    box-shadow: 0 0 10px 1px #ff46f0;
    @media(max-width: 480px){
        left: -13px;
        top: 33px
    }
}
.nightBot{
    width: 40px;
    height: 40px;
    transition: 0.3s;
    left: -24px;
    background-color: rgba(255, 255, 255, 0.37);
    animation: bot 0.3s ease  1 forwards  ;
    @media(max-width: 480px){
        left: -10px;
    }
}
.gun{
    position: absolute;
    width: 40px;
    height: 40px;
    left: 4px;
    bottom: 30px;
    &__active{
        transform: rotate(-70deg);
        animation: gun_shot 0.1s ease 1 forwards;
    }
    @media(max-width: 480px){
        width: 30px;
        height: 30px;
        left: 4px;
        bottom: 5px;
        transform: rotate(-45deg);
    }
}
.active{
    &__sub{
        border: 2px solid rgb(59, 144, 255);
        color: rgb(0, 0, 0);
        box-shadow: 0 0 10px 1px rgb(59, 144, 255);
        background-color: #fff;
    }
    &__mod{
        border: 2px solid rgb(59, 144, 255);
        box-shadow: 0 0 10px 1px rgb(59, 144, 255);
        color: rgb(0, 0, 0);
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
@keyframes appearance-item{
    0%{
        transform: scaleX(0);
        background-color: rgb(51, 20, 20);
    }
    100%{
        transform: scaleX(1);
        background-color: rgba(0, 0, 0, 0.16);
    }
}
</style>