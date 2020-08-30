let submit = document.getElementById('form');
let input = document.getElementById('input');
let ul = document.getElementById('list');
let db;
let request = indexedDB.open('firstDB', 1);
let arr = [];

form.addEventListener("submit", writeIndexedDB);

request.onupgradeneeded = (e) => {
    db = e.target.result;
    let cdCollection = db.createObjectStore('claster', { keyPath: 'value' });
}

request.onsuccess = (e) => {
    db = e.target.result;

}

request.onerror = (e) => {
    alert(`following error ${e.target.error}`)
}

function writeIndexedDB(event) {
    let txWrite = db.transaction('claster', 'readwrite');
    let access = txWrite.objectStore('claster');
    txWrite.onerror = (e) => alert(`error: ${e.target.error}`);
    access.add({ 'value': input.value });
    input.value = '';
    event.preventDefault(event);
}

function readIndexedDB() {
    let txRead = db.transaction('claster', 'readonly');
    let access = txRead.objectStore('claster');
    let request = access.openCursor();

    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            cursor.continue();
        }
        if (!arr.includes(cursor.key)) {
            arr.push(cursor.key);
            show(cursor.key);
        }
    }
}

arr.forEach(item => show(item));

function show(item) {
    let list = document.createElement("li");
    list.textContent(item);
    ul.appendChild(list);
}