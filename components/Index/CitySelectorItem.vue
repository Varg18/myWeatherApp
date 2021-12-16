<template>
  <a class="city-selector-item">
    <div class="text-text">
      <span>{{ renderedSuggestion.prefix }}</span><span class="text-white">{{
        renderedSuggestion.highlight
      }}</span><span>{{ renderedSuggestion.suffix }}</span>
    </div>
  </a>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({})
export default class CitySelectorItem extends Vue {

  @Prop({type: String, required: true})
  input!: string

  @Prop({type: Object, required: true})
  suggestion!: Record<string, any>

  get formattedInput() {
    return this.input.normalize()
  }

  get formattedItem() {
    return (this.suggestion.item as string).normalize()
  }

  get idx() {
    let input = this.formattedInput.toLocaleLowerCase()
    let item = this.formattedItem.toLocaleLowerCase()

    let idx = item.indexOf(input)

    return idx
  }

  get renderedSuggestion() {
    if (this.idx === -1) {
      return {prefix: this.formattedItem, highlight: '', suffix: ''}
    } else {
      let index = this.idx
      let endIndex = index + this.input.length

      let elements = {
        prefix: '',
        highlight: '',
        suffix: ''
      }

      // М[оск]ва
      //   ^
      if (index > 0) {
        elements.prefix = this.formattedItem.slice(0, index)
      }

      elements.highlight = this.formattedItem.slice(index, endIndex)

      if (endIndex < this.formattedItem.length) {
        elements.suffix = this.formattedItem.slice(endIndex, this.formattedItem.length)
      }

      return elements
    }
  }

}
</script>

<style lang="sass" scoped>
.city-selector-item
  height: 58px
</style>
