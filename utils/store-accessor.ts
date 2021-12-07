import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import bookmarks from '~/store/bookmarks'

let bookmarksStore: bookmarks

function initialiseStores(store: Store<any>): void {
  bookmarksStore = getModule(bookmarks, store)
}

export { initialiseStores, bookmarksStore }
