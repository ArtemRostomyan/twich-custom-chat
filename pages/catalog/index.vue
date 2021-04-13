<template>
  <div class="container">
    <h1>Каталог</h1>
    <v-multiselect-catalog
      class="catalog-multiselect"/>
    <div class="catalog-products">
      <v-catalog-card
        v-for="card in catalog" :key="card.id"
        :product_data="card"
        />
    </div>
  </div>
</template>

<script>
import VMultiselectCatalog from '~/components/catalog/multiselect/v-multiselect-catalog.vue'
import vCatalogCard from '~/components/catalog/v-catalog-card.vue'
export default{
  components: { vCatalogCard, VMultiselectCatalog },
  name: 'gallery',
  async fetch({store}){
    if(store.getters['catalog/CATALOG'].length === 0){
      await store.dispatch('catalog/SET_CATALOG_FROM_SERVER')
    }
  },
  data(){
    return{}
  },
  methods: {
    openUser(card){
      this.$router.push('catalog/' + card.id)
    }
  },
  computed:{
    catalog(){
      return this.$store.getters['catalog/CATALOG']
    }
  }
}
</script>

<style lang="scss">
.catalog{
  &-products{
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 60px;
    column-gap: 45px;
  }
  &-multiselect{
    width: 500px;
    min-height: 120px;
    margin: 0 auto;
  } 
}
</style>
