<template>
  <img alt="atmosphere" src="~assets/svg/weather/Atmosphere.svg" v-if="type==='Atmosphere'" v-bind="$attrs"/>
  <img alt="clear" src="~assets/svg/weather/Clear.svg" v-else-if="type==='Clear'" v-bind="$attrs"/>
  <img alt="clouds" src="~assets/svg/weather/Clouds.svg" v-else-if="type==='Clouds'" v-bind="$attrs"/>
  <img alt="drizzle" src="~assets/svg/weather/Drizzle.svg" v-else-if="type==='Drizzle'" v-bind="$attrs"/>
  <img alt="dust" src="~assets/svg/weather/Dust.svg" v-else-if="type==='Dust'" v-bind="$attrs"/>
  <img alt="rain" src="~assets/svg/weather/Rain.svg" v-else-if="type==='Rain'" v-bind="$attrs"/>
  <img alt="snow" src="~assets/svg/weather/Snow.svg" v-else-if="type==='Snow'" v-bind="$attrs"/>
  <img alt="squall" src="~assets/svg/weather/Squall.svg" v-else-if="type==='Squall'" v-bind="$attrs"/>
  <div v-else>icon not found</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({})
export default class WeatherIcon extends Vue {

  @Prop({type: String, required: true})
  type!: string

}
</script>
