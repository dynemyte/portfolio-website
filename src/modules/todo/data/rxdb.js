import { createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

let databasePromise

export function getDatabase() {
  if (!databasePromise) {
    databasePromise = createRxDatabase({
      name: 'dashboardDB',
      storage: getRxStorageDexie(),
      multiInstance: false,
      ignoreDuplicate: true,
    })
  }

  return databasePromise
}

export default getDatabase
