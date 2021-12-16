<template>
  <div class="weather">
    <Header class="header"/>
    <weather-controls v-if="error"
      @remove-bookmark="removeBookmark"
    />
    <weather-controls v-else
      :is-bookmarked="isBookmarked"
      @add-bookmark="addBookmark"
      @remove-bookmark="removeBookmark"
    />
    <div class="weather-container">

      <h1 class="cityName">
        {{ cityName }}
      </h1>
      <div v-if="loading" class="loading">
        <spinner/>
      </div>
      <p v-else-if="error" class="error-msg">Ошибка получения данных! Пожалуйста, попробуйте позже</p>
      <template v-else>

        <p class="weatherDesc">
          {{ weatherDesc }}
        </p>

        <div class="temp">
          <div class="weatherTemp ">
            {{ weatherTemp }}&deg;
          </div>
          <div>
            <weather-icon width="191px" height="191px" :type="icon"/>
          </div>
        </div>

        <div class="pressure">
          <div>
            <img alt="barometer" src="~assets/svg/Barometer.svg" width="24px" height="24px"/>
          </div>
          <p class="weatherPressure">
            {{ weatherPressure }} мм рт. ст.
          </p>
        </div>

        <div class="sunset ">
          <p class="sunsetTime">
            Закат в {{ weatherSunsetTime.toFormat('HH:mm') }}
          </p>
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

interface WeatherResponse{
  main: {
    temp:number,
    pressure: number
  }
  weather: Array<any>
  sys: any
}

@Component({
  components: {WeatherControls, WeatherIcon, Spinner, Header},
})
export default class WeatherPage extends Vue {
  error: boolean = false;

  addBookmark() {
    bookmarksStore.addBookmark(this.cityName)
  }

  removeBookmark() {
    bookmarksStore.removeBookmark(this.cityName)
  }

  get isBookmarked() {
    return bookmarksStore.bookmarks.includes(this.cityName.toLocaleLowerCase())
  }

  weatherResponse: WeatherResponse | null = null

  get loading() {
    return this.weatherResponse === null && !this.error
  }

  get cityName(): string {
    return this.$route.params.name
  }

  @Watch('cityName', {immediate: true})
  async updateWeather() {
    this.weatherResponse = null
    this.error = false
    try {
      let resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&APPID=${OPENWEATHER_API_KEY}&units=metric&lang=ru`
      ).then(data =>{
        if(data.status !== 200)
          return Promise.reject()
        return data
      }).then(it => it.json())

      this.weatherResponse = resp
    }
    catch(e){
      this.error = true
    }
  }

  get weatherDesc() {
    if (this.weatherResponse === null) return null

    return _.capitalize(this.weatherResponse.weather[0].description)
  }

  get weatherTemp() {
    if (this.weatherResponse === null) return null

    return Math.round(this.weatherResponse.main.temp)
  }

  get weatherPressure() {
    if (this.weatherResponse === null) return null

    return (this.weatherResponse.main.pressure / 1.33).toFixed()
  }

  get weatherSunsetTime() {
    if (this.weatherResponse === null) return null

    let sunsetSecondsUTC = this.weatherResponse.sys.sunset


    let date = DateTime
      .fromSeconds(sunsetSecondsUTC)
    return date
  }

  get icon(): string {
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
