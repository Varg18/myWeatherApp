<template>
  <div class="weather-controls bg-transparent flex p-1">
    <weather-go-back-button/>

    <!-- Spacer -->
    <div/>

    <weather-add-bookmark-button @add-bookmark="$emit('add-bookmark')" v-if="!isBookmarked"/>
    <weather-remove-bookmark-button @remove-bookmark="$emit('remove-bookmark')" v-else/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import WeatherGoBackButton from "~/components/Weather/WeatherGoBackButton.vue";
import WeatherAddBookmarkButton from "~/components/Weather/WeatherAddBookmarkButton.vue";
import WeatherRemoveBookmarkButton from "~/components/Weather/WeatherRemoveBookmarkButton.vue";

@Component({
  components: {WeatherRemoveBookmarkButton, WeatherAddBookmarkButton, WeatherGoBackButton}
})
export default class WeatherControls extends Vue {

  @Prop({type: Boolean, required: true})
  isBookmarked!: boolean

}
</script>

<style lang="sass" scoped>
.weather-controls
  display: grid
  grid-template-columns: auto 1fr auto
</style>
