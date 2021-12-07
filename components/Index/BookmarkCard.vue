<template>
  <nuxt-link :to="`/city/${city}`" class="bookmark-card bg-cards rounded-md p-6 flex flex-col">
    <div class="text-white text-center capitalize text-sm">
      {{ city }}
    </div>
    <div class="h-32">

      <div class="flex h-full w-full items-center justify-center" v-if="loading">
        <spinner/>
      </div>
      <template v-else>

        <div class="mt-4 flex justify-center flex-col items-center">
          <div class="text-white text-4xl font-semibold">
            {{ weatherTemp }}&deg;
          </div>
          <div>
            <weather-icon width="92px" height="92px" :type="icon"/>
          </div>
        </div>

      </template>

    </div>
  </nuxt-link>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
import {OPENWEATHER_API_KEY} from "~/utils/const";
import Spinner from "~/components/Weather/Spinner.vue";
import WeatherIcon from "~/components/Weather/WeatherIcon.vue";

@Component({
  components: {WeatherIcon, Spinner}
})
export default class BookmarkCard extends Vue {

  @Prop({type: String, required: true})
  city!: string

  weatherResponse: object | null = null

  get loading() {
    return this.weatherResponse === null
  }

  @Watch('city', {immediate: true})
  async updateWeather() {
    this.weatherResponse = null
    let resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${OPENWEATHER_API_KEY}&units=metric&lang=ru`
    ).then(it => it.json())
    this.weatherResponse = resp
  }

  get weatherTemp() {
    if (this.weatherResponse === null) return null// @ts-ignore
    return Math.round(this.weatherResponse.main.temp)
  }

  get icon(): string {// @ts-ignore
    let id: number = this.weatherResponse!.weather[0].id
    switch (true) {
      case id === 800:
        return 'Clear'
      case id === 771:
        return 'Squall'
      case id === 781:
        return 'Tornado'
      case [701, 711, 721, 741].includes(id):
        return 'Atmosphere'
      case [731, 751, 761, 771].includes(id):
        return 'Dust'
      case Math.floor(id / 100) === 8:
        return 'Clouds'
      case Math.floor(id / 100) === 6:
        return 'Snow'
      case Math.floor(id / 100) === 5:
        return 'Rain'
      case Math.floor(id / 100) === 3:
        return 'Drizzle'
      case Math.floor(id / 100) === 2:
        return 'Thunderstorm'

      default:
        // what the fuck
        return 'Clouds'
    }
  }

}
</script>
