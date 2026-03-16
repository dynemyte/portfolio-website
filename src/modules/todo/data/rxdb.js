import { createRxDatabase, addRxPlugin } from 'rxdb'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

addRxPlugin(RxDBQueryBuilderPlugin)

let databasePromise

export function getDatabase() {
  if (!databasePromise) {
    databasePromise = createRxDatabase({
      name: 'dashboardDB',
      storage: getRxStorageDexie(),
      multiInstance: false,
    })
  }

  return databasePromise
}

export default getDatabase
