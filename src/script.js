let submit = document.getElementById('submit');
let input = document.getElementById('input');
let db;
let request = indexedDB.open('firstDB', 1);




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

function wirteDB() {
    let txWrite = db.transaction('cdCollection', 'readwrite');
    let a = txWrite.objectStore('cdCollection');
    txWrite.onerror = (e) => alert(`error: ${e.target.error}`)

    a.add({ 'title': 'value' }); //write here avlue to add in db
}