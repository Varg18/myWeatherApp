import {Module, VuexModule, Mutation} from 'vuex-module-decorators'
import _ from 'lodash'
import {bookmarksStore} from "~/utils/store-accessor";

function getLocalStorageBookmarks(): string[] {
  try {
    let bookmarks = JSON.parse(localStorage.bookmarks || '[]')
    if (Array.isArray(bookmarks)) {
      return _(bookmarks)
        .map(it => (String(it)).toLocaleLowerCase())
        .uniq()
        .value()
    }
    return []
  } catch (e) {
    // Parse error
    return []
  }
}

function setLocalStorageBookmarks(bookmarks: string[]) {
  localStorage.bookmarks = JSON.stringify(bookmarks)
}

@Module({
  name: 'bookmarks',
  stateFactory: true,
  namespaced: true,
})
export default class BookmarksModule extends VuexModule {

  bookmarks: string[] = getLocalStorageBookmarks()

  weatherResponse: object | null = null

  @Mutation
  addBookmark(city: string) {
    this.bookmarks =
      _(this.bookmarks)
        .concat(city.toLocaleLowerCase())
        .uniq()
        .value()

    setLocalStorageBookmarks(this.bookmarks)
  }

  @Mutation
  removeBookmark(city: string) {
    this.bookmarks =
      _(this.bookmarks)
        .filter(it => it !== city.toLocaleLowerCase())
        .uniq()
        .value()

    setLocalStorageBookmarks(this.bookmarks)
  }

}
