<template>
    <div v-fixedScroll class="chat">
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
        <img 
            :src="require('~/assets/images/chat/guns.svg')" 
            alt="" 
            class="gun"
            :class="{'gun__active': gun_active}"
            >
           
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
            channels: [ 'modestal' ]
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
    width: 96%;
    height: 96vh;
    padding-top: 5px;
    margin: 0 auto;
    // background: url(./assets/images/chat/bc.jpg) center;
    background-repeat: no-repeat;
    // background-color: rgba(156, 13, 108, 0.5);
    background-color: rgba(0, 0, 0, 0.308);
    border: 3px solid rgb(255, 255, 255);
    box-shadow: 0 0 10px 2px rgb(255, 255, 255);
    // animation: chat_bc_shadow 20s ease infinite;
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
        @media(max-width: 480px){
            padding: 10px 5px;
            width: 95%;
            left: 10px;
            bottom: 10px;
        }
    }
    &__item{
        display: flex;
        align-items: center;
        margin: 10px 0;
        background-color: rgba(0, 0, 0, 0.16);
        padding: 10px;
        border-radius: 20px;
        animation: appearance-item 0.7s ease 1 forwards;
    }
    
}
.name{
    position: relative;
    background-color: rgba(255, 255, 255, 0.363);
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
    color: #000;
    background-color: rgb(255, 255, 255);
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

@keyframes gun_shot{
    0%{
        transform: rotate(0deg);
    }
    50%{
        transform: rotate(-70deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
@keyframes chat_bc_shadow{
    0%{
        box-shadow: 0 0 20px 3px red;
    }
    25%{
        box-shadow: 0 0 10px 2px rgb(255, 0, 255);
    }
    50%{
        box-shadow: 0 0 20px 3px rgb(255, 0, 85);
    }
    75%{
        box-shadow: 0 0 10px 2px rgb(255, 72, 0);
    }
    100%{
        box-shadow: 0 0 20px 3px red;
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