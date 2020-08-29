let btn = document.getElementById('btn');
let cd = document.getElementById('cdBtn');
let view = document.getElementById('view');
let db;

btn.addEventListener('click', createDB);

cd.addEventListener('click', insertCd);

view.addEventListener('click', viewCd);


function viewCd() {
    let tx = db.transaction('cdCollection', 'readonly');
    let cdCollection = tx.objectStore('cdCollection');
    let request = cdCollection.openCursor();

    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            cursor.continue();
        }
    }
    console.log(request)

}


function insertCd() {
    let cd = {
        title: 'winter songs',
        artist: 'Grigoriy',
    }
    let tx = db.transaction('cdCollection', 'readwrite')

    tx.onerror = (e) => alert(`error: ${e.target.error}`)
    let cdCollection = tx.objectStore('cdCollection');
    cdCollection.add(cd);
}



function createDB() {
    let database = document.getElementById('db');
    let version = document.getElementById('version');

    const request = indexedDB.open(database.value, version.value);

    request.onupgradeneeded = (e) => {
        db = e.target.result;


        let cdCollection = db.createObjectStore('cdCollection', { keyPath: 'title' });
    }

    request.onsuccess = (e) => {
        db = e.target.result;

    }

    request.onerror = (e) => {
        alert(`following error ${e.target.error}`)
    }
}