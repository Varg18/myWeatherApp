<template>
  <div class="index bg-primary">
    <Header/>
    <div class="index-container w-screen max-w-lg px-6 flex items-center flex-col mt-6 mx-auto md:mt-36">

      <div class="index-city-selector w-full">
        <city-selector/>
      </div>

      <template v-if="!hasBookmarks">
        <div class="index-tip mt-6">
          <div class="index-tip__arrow">
            <img width="36px" height="24px" alt="arrow" src="~assets/svg/TooltipArrow.svg"/>
          </div>
          <div class="text-text text-center mt-3">
            Начните вводить город, например,
            <nuxt-link to="/city/Ижевск" class="text-white border-white border-b border-dashed">Ижевск</nuxt-link>
          </div>
        </div>

        <div class="index-bookmarks-tip mt-24">
          <div class="text-text text-center">
            Используйте значок «закладки»,
            чтобы закрепить город на главной
          </div>
          <img class="bookmark" alt="bookmark" src="~assets/svg/BookmarkOutlined.svg"/>
        </div>
      </template>
    </div>
    <div class="index-bookmark-cards mt-8 md:mt-20 w-full max-w-screen-2xl mx-auto px-6" v-if="hasBookmarks">
      <bookmark-card
        v-for="bookmark in bookmarks"
        :key="bookmark"
        :city="bookmark"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import Header from "~/components/Index/Header.vue";
import CitySelector from "~/components/Index/CitySelector.vue";
import {bookmarksStore} from "~/utils/store-accessor";

import TooltipArrow from '~/assets/svg/TooltipArrow.svg'
import BookmarkCard from "~/components/Index/BookmarkCard.vue";

@Component({
  components: {BookmarkCard, CitySelector, Header, TooltipArrow}
})
export default class App extends Vue {

  get bookmarks() {
    return bookmarksStore.bookmarks
  }

  get hasBookmarks() {
    return this.bookmarks.length > 0
  }

}
</script>

<style lang="sass" scoped>
.index
  min-height: 100vh
  padding-bottom: 2rem

.index-tip
  display: grid
  width: 100%
  max-width: 16rem
  grid-template-columns: 36px auto 36px

.index-bookmarks-tip
  width: 100%
  max-width: 16rem

.bookmark
  margin-left: auto
  margin-right: auto
  display: block

.index-bookmark-cards
  display: grid
  grid-gap: 2rem
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr))
</style>
