<template>
  <div class="city-selector w-full bg-surface placeholder-text text-white flex items-center rounded-sm">

    <vue-autosuggest
      v-model="query"
      :suggestions="suggestions"
      :input-props="autosuggestProps"
      :should-render-suggestions="shouldRenderSuggestions"
      :limit="5"
      @selected="onItemSelected"
    >
      <template slot-scope="{suggestion}">
        <city-selector-item
          :input="query"
          :suggestion="suggestion"
        />
      </template>
    </vue-autosuggest>

  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// @ts-ignore
import {VueAutosuggest} from 'vue-autosuggest';
import CitySelectorItem from "~/components/Index/CitySelectorItem.vue";
import {AxiosResponse} from 'axios'
import _ from 'lodash'
import {REGION_LIST_URL} from "~/utils/const";

@Component({
  components: {
    CitySelectorItem,
    VueAutosuggest
  },
  async fetch(this: CitySelector) {
    let resp: { region: string, city: string }[] = await fetch(REGION_LIST_URL).then(r => r.json())
    this.options = _(resp).map(it => it.city).uniq().value()
  }
})
export default class CitySelector extends Vue {

  onItemSelected(item:any) {
    if (!item) {
      return
    }
    let itemName = item.item
    this.$router.push(`/city/${itemName}`)
  }

  options: string[] = []

  query = ""

  shouldRenderSuggestions(size:number, loading:boolean) {
    // This is the default behavior
    return size >= 0 && !loading && this.query.trim().length >= 3
  }

  get autosuggestProps() {
    return {
      id: 'autosuggest__input',
      placeholder: 'Укажите город'
    }
  }

  get suggestions() {
    if (this.query.trim().length < 3) return [{data: []}]

    let normalizedQuery = this.query.toLocaleLowerCase()

    let filtered = _(this.options)
      .filter(city => city.toLocaleLowerCase().includes(normalizedQuery))
      .sortBy(city => city.toLocaleLowerCase().indexOf(normalizedQuery))
      .value()


    return [{data: filtered}]
  }

}
</script>

<style lang="sass">

// Transition
.city-selector
  .autosuggest__results
    animation: fadein 0.1s ease-in-out

@keyframes fadein
  from
    opacity: 0
  to
    opacity: 1


.city-selector

  .autosuggest__results-container
    position: relative
    width: 100%

  .autosuggest__results
    position: absolute
    width: 100%
    border-bottom-left-radius: 2px
    border-bottom-right-radius: 2px
    overflow: hidden
    margin-top: -2px

  input
    // Resetting default styles
    border: none
    background-image: none
    background-color: transparent
    -webkit-box-shadow: none
    -moz-box-shadow: none
    box-shadow: none
    outline: none

    height: 56px
    padding-left: 16px


  #autosuggest, .combobox, input
    width: 100%
</style>
