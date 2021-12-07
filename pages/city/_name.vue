<template>
  <div class="weather flex flex-col">
    <Header class="hidden md:flex"/>
    <weather-controls
      :is-bookmarked="isBookmarked"
      @add-bookmark="addBookmark"
      @remove-bookmark="removeBookmark"
    />

    <div
      class="weather-container w-screen max-w-lg px-6 flex items-center flex-col mx-auto flex-grow justify-center pb-16">

      <h1 class="text-2xl md:text-6xl text-white font-medium text-center capitalize">
        {{ cityName }}
      </h1>

      <div v-if="loading" class="mt-4">
        <spinner/>
      </div>
      <template v-else>

        <div class="text-white mt-4">
          {{ weatherDesc }}
        </div>

        <div class="mt-4 md:mt-8 flex justify-center flex-col md:flex-row items-center">
          <div class="text-white text-9xl font-semibold">
            {{ weatherTemp }}&deg;
          </div>
          <div>
            <weather-icon width="191px" height="191px" :type="icon"/>
          </div>
        </div>

        <div class="mt-10 flex justify-center items-center">
          <div>
            <img alt="barometer" src="~assets/svg/Barometer.svg" width="24px" height="24px"/>
          </div>
          <div class="text-white ml-2">
            {{ weatherPressure }} мм рт. ст.
          </div>
        </div>

        <div class="mt-8 flex justify-center items-center">
          <div class="text-text">
            Закат в {{ weatherSunsetTime.toFormat('HH:mm') }}
          </div>
        </div>
      </template>


    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import Header from "~/components/Index/Header.vue";
import Spinner from "~/components/Weather/Spinner.vue";
import _ from "lodash";
import {DateTime} from "luxon";
import WeatherIcon from "~/components/Weather/WeatherIcon.vue";
import WeatherControls from "~/components/Weather/WeatherControls.vue";

import {bookmarksStore} from "~/utils/store-accessor";
import {OPENWEATHER_API_KEY} from "~/utils/const";



@Component({
  components: {WeatherControls, WeatherIcon, Spinner, Header},
})
export default class WeatherPage extends Vue {

  addBookmark() {
    bookmarksStore.addBookmark(this.cityName)
  }

  removeBookmark() {
    bookmarksStore.removeBookmark(this.cityName)
  }

  get isBookmarked() {
    return bookmarksStore.bookmarks.includes(this.cityName.toLocaleLowerCase())
  }

  weatherResponse: object | null = null

  get loading() {
    return this.weatherResponse === null
  }

  get cityName(): string {
    return this.$route.params.name
  }

  @Watch('cityName', {immediate: true})
  async updateWeather() {
    this.weatherResponse = null
    let resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&APPID=${OPENWEATHER_API_KEY}&units=metric&lang=ru`
    ).then(it => it.json())
    this.weatherResponse = resp
  }

  get weatherDesc() {
    if (this.weatherResponse === null) return null
    // @ts-ignore
    return _.capitalize(this.weatherResponse.weather[0].description)
  }

  get weatherTemp() {
    if (this.weatherResponse === null) return null
    // @ts-ignore
    return Math.round(this.weatherResponse.main.temp)
  }

  get weatherPressure() {
    if (this.weatherResponse === null) return null
    // @ts-ignore
    return this.weatherResponse.main.pressure
  }

  get weatherSunsetTime() {
    if (this.weatherResponse === null) return null
    // @ts-ignore
    let sunsetSecondsUTC = this.weatherResponse.sys.sunset
    // @ts-ignore
    let timezoneOffsetSeconds = this.weatherResponse.timezone

    let date = DateTime
      .fromSeconds(sunsetSecondsUTC)
      .plus({second: timezoneOffsetSeconds})

    return date
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

<style lang="sass" scoped>
.weather
  min-height: 100vh
  background: radial-gradient(80.36% 80.36% at 50% 0%, #5A607C 0%, #161B30 100%)
</style>
