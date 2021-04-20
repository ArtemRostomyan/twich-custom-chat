<template>
    <div v-fixedScroll class="chat">
        <div class="chat__content">

            <img class="cloud cloud--1 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--2 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--3 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--4 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--5 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--6 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--7 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--8 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--9 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >
            <img class="cloud cloud--10 cloud__big" src="../../assets/images/kitty/облачко1.png" alt="" >

            <img class="cloud cloud--11 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--12 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--13 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--14 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--15 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--16 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--17 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--18 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--19 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >
            <img class="cloud cloud--20 cloud__smoll" src="../../assets/images/kitty/облачко2.png" alt="" >





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
    width: 96%;
    height: 90vh;
    top: 75px;
    padding-top: 5px;
    margin: 0 auto;
    // background: url(./assets/images/chat/bc.jpg) center;
    background-repeat: no-repeat;
    // background-color: rgba(156, 13, 108, 0.5);
    background-color: #a3d2e8;
    border: 6px solid rgb(255, 255, 255);
    box-shadow: 0 0 10px 2px #a3d2e8;
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
        background-color: rgba(0, 0, 0, 0.63);
        padding: 10px;
        border-radius: 20px;
        animation: appearance-item 0.7s ease 1 forwards;
    }
    &__kitty{
        position: absolute;
        transform: translate(-50%, -50%);
        margin-top: -50%;
        margin: 0 auto;
    }
}
.name{
    position: relative;
    background-color: rgba(255, 255, 255, 0.45);
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
/////////////////////////////////////////////////////////////////////////
.cloud{
    position: absolute;
    &--1{
        position: fixed;
        left: 15px;
        top: 88px;
        animation: first-animate 10s ease infinite;
    }
    &--2{
        position: fixed;
        left: 113px;
        top: 188px;
        animation: first-animate 10s ease infinite;
    }
    &--3{
        position: fixed;
        left: 345px;
        top: 539px;
        animation: first-animate 10s ease infinite;

    }
    &--4{
        position: fixed;
        left: 155px;
        top: 625px;
        animation: threee-animate 10s ease infinite;
    }
    &--5{
        position: fixed;
        left: 33px;
        top: 548px;
        animation: threee-animate 10s ease infinite;
    }
    &--6{
        position: fixed;
        left: 295px;
        top: 188px;
        animation: first-animate 10s ease infinite;

    }
    &--7{
        position: fixed;
        left: 153px;
        top: 348px;
        animation: second-animate 10s ease infinite;

    }
    &--8{
        position: fixed;
        left: 73px;
        top: 705px;
        animation: threee-animate 10s ease infinite;
    }
    &--9{
        position: fixed;
        left: 395px;
        top: 708px;
        animation: first-animate 10s ease infinite;

    }
    &--10{
        position: fixed;
        left: 400px;
        top: 110px;
        animation: threee-animate 10s ease infinite;
    }


    &--11{
        position: fixed;
        left: 123px;
        top: 82px;
        animation: threee-animate 10s ease infinite;
    }
    &--12{
        position: fixed;
        left: 40px;
        top: 328px;
         animation: threee-animate 10s ease infinite;
    }
    &--13{
        position: fixed;
        left: 357px;
        top: 384px;
        animation: first-animate 10s ease infinite;
    }
    &--14{
        position: fixed;
        left: 423px;
        top: 182px;
        animation: first-animate 10s ease infinite;
    }
    &--15{
        position: fixed;
        left: 270px;
        top: 328px;
        animation: second-animate 10s ease infinite;
    }
    &--16{
        position: fixed;
        left: 577px;
        top: 384px;
        animation: threee-animate 10s ease infinite;
    }
    &--17{
        position: fixed;
        left: 155px;
        top: 500px;
        animation: threee-animate 10s ease infinite;
    }
    &--18{
        position: fixed;
        left: 17px;
        top: 452px;
        animation: second-animate 10s ease infinite;
    }
    &--19{
        position: fixed;
        left: 447px;
        top: 424px;
        animation: second-animate 10s ease infinite;
    }
    &--20{
        position: fixed;
        left: 288px;
        top: 620px;
        animation: first-animate 10s ease infinite;
    }
}

////////////////////////////////////////////////////////////////////////
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
@keyframes appearance-item{
    0%{
        transform: scaleX(0);
        background-color: rgb(51, 20, 20);
    }
    100%{
        transform: scaleX(1);
        background-color: rgba(0, 0, 0, 0.74);
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

@keyframes first-animate{
    0%{
        transform: translate(0);
    }
    25%{
        transform: translate(20%, 0);
    }
    50%{
        transform: translate(30%, 20%);
    }
    75%{
        transform: translate(-10%, 20%);
    }
    100%{
        transform: translate(0);
    }
}
@keyframes second-animate{
    0%{
        transform: translate(0);
    }
    25%{
        transform: translate(0%, 10%);
    }
    50%{
        transform: translate(20%, 20%);
    }
    75%{
        transform: translate(10%, -20%);
    }
    100%{
        transform: translate(0);
    }
}
@keyframes threee-animate{
    0%{
        transform: translate(0);
    }
    25%{
        transform: translate(20%, -10%);
    }
    50%{
        transform: translate(5%, -20%);
    }
    75%{
        transform: translate(30%, 10%);
    }
    100%{
        transform: translate(0);
    }
}
</style>