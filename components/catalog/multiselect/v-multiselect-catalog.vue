<template>
    <div id="v-multiselect-catalog">
        <multiselect 
            v-model="value" 
            :options="options" 
            :multiple="true" 
            :close-on-select="false" 
            :clear-on-select="false" 
            :preserve-search="true" 
            placeholder="Выберите" 
            label="name" 
            track-by="name"
            selectLabel="Выбрать"
            selectedLabel="Выбрано"
            deselectLabel="Удалить" 
            :preselect-first="true">
            <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбранных элементов</span></template>
            <span slot="noResult">Кажется мы ничего не нашли..</span>
        </multiselect>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [],
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ]
    }
  }
}
</script>