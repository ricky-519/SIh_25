// This will use the 'idb' library, which we'll include in index.html

const DB_NAME = 'ocean-intel-db';
const STORE_NAME = 'sos-reports';

async function openDatabase() {
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }
  // The 'idb' library is loaded from a CDN and exposes 'idb' as a global.
  return await idb.openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

async function addSosReport(report) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add(report);
  await tx.done;
}

async function getAllSosReports() {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const reports = await store.getAll();
  await tx.done;
  return reports;
}

async function deleteSosReport(id) {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
    await tx.done;
}
