let submit = document.getElementById("form");
let input = document.getElementById("input");
let ul = document.getElementById("list");
let db;
let request = indexedDB.open("firstDB", 1);
let arr = [];

form.addEventListener("submit", writeIndexedDB);

request.onupgradeneeded = (e) => {
    db = e.target.result;

    let claster = db.createObjectStore("claster", { keyPath: "value" });
};

request.onsuccess = (e) => {
    db = e.target.result;
    readIndexedDB();
};

request.onerror = (e) => {
    alert(`following error ${e.target.error}`);
};

function writeIndexedDB(event) {
    let txWrite = db.transaction("claster", "readwrite");
    let access = txWrite.objectStore("claster");
    let obj = {
        value: input.value,
        date: new Date().getDate(),
    };

    access.add(obj);
    if (!arr.includes(input.value)) show(input.value);
    input.value = "";
    event.preventDefault(event);
}

function readIndexedDB() {
    let txRead = db.transaction("claster", "readonly");
    let access = txRead.objectStore("claster");
    let request = access.openCursor();

    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            arr.push(cursor.key);
            cursor.continue();
        } else {
            arr.forEach((item) => show(item));
        }
    };
}


function show(item) {
    let list = document.createElement("li");
    list.textContent = item;
    ul.appendChild(list);
}