<template>
    <section class="container">
            <div 
                class="separate-product"
                :title="card.description">
                <div class="separate-product__image-box">
                    <img 
                    class="separate-product__image"
                    :src="card.image"
                    alt=""
                    >
                </div>
                <div class="content-box">
                    <h2
                        class="info-box__title">Информация о товаре</h2>
                <div class="info-box">
                    <div class="item-box">
                        <p>Имя</p>
                        <p
                            class="separate-product__name">{{card.name}} {{ processor_complectation }}</p>
                    </div>
                    
                    <div class="item-box">
                        <p>Тип</p>
                        <p>{{card.description}}</p>
                    </div>
                    <div class="item-box">
                        <p>Производитель</p>
                        <p>{{card.maker}}</p>
                    </div>
                    
                    </div>
                    <div 
                        class="item-box"
                        v-if="card.type == 'processor'">
                        <p>Комплектация процессора</p>
                        <p
                            class="separate-product__name">{{ processor_complectation }}</p>
                    </div>
                    <div class="item-box">
                        <p>Цена</p>
                        <!-- <p>{{(card.price).toLocaleString()}} ₽</p> -->
                </div>
                <div class="button-box">
                    <button
                        class="separate-product__btn btn">В корзину</button>
                    <img 
                    class="separate-product__heart"
                    :class="{'favorite' : card.favorite}"
                    src="../../assets/heart.svg" 
                    alt=""
                    >
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    async asyncData({store, params}){
      let card
      if(store.getters['catalog/CATALOG'].length === 0){
        await store.dispatch('catalog/SET_CATALOG_FROM_SERVER')
      }
      await store.getters['catalog/CATALOG'].forEach(item =>{
        if(item.id == params.id){
          card = item
          console.log(item, card)
        }
      })
      return{card}
    },

    computed: {
        processor_complectation(){
            if(this.card.type === "processor"){
                if(this.card.box){
                return 'BOX'
                } else{
                return 'OEM'
                }
            } else{
                return ''
            }
        }
    }
}
</script>

<style lang="scss">
.separate-product {
	margin: 0 auto;
    margin-top: 100px;
    height: 50%;
    display: flex;
    justify-content: space-between;
		&__image {
      width: 260px;
      margin: 0 auto;
      padding: 10px;
      background: #fff;
      border-radius: 20px;
		}
		&__heart {
      box-sizing: border-box;
      border-radius: 40%;
      padding: 3px;
      bottom: 16px;
      width: 33px;
      cursor: pointer;
      &:hover{
        background-color: rgba(#54a78c, 0.308);
      }
      &:active{
        width: 33px;
        padding: 5px;
        bottom: 18px;
        left: 152px;
      }
		}
    &__btn{
      font-size: 15px;
    }
    & .favorite{
      &:hover{
        background-color: rgba(255, 0, 0, 0.849);
      }
    }
}
.button-box{
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px;
  border-radius: 23px;
}
.item-box{
  display: flex;
  justify-content: space-between;
  width: 420px;
  color: rgb(70, 70, 70);
  font-size: 19px;
}
.info-box{
  &__title{
    text-align: center;
    margin-bottom: 40px;
  }
}
.content-box{
  min-height: 270px;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media(max-width: 980px){
  .content-box{
    background-color: rgba(122, 14, 104, 0.61);
    border-radius: 10px 10px 0px 0px;
  }  
  .separate-product{
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__image-box{
      display: flex;
      justify-content: center;
    }
    &__image{
      width: 250px;
    }
  }
  .item-box{
    width: 100%;
    display: block;
    &:nth-child(2n){
      border-radius: 9px;
      padding: 3px;
      background-color: rgba(255, 255, 255, 0.151);
      color: rgba(255, 255, 255, 0.842);
    }
  }
  .info-box{
    &__title{
      font-size: 24px;
      color: rgba(0, 0, 0, 0.459);
      margin: 0px;
    }
    
  }
  .button-box{
    margin-top: 10px;
  }
}
@media(max-width: 490px){
.item-box{
  width: 290px;
  margin: 0 auto;
}
}
</style>