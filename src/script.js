let btn = document.getElementById('btn');

btn.addEventListener('click', createDB)

function createDB() {
    let database = document.getElementById('db');
    let version = document.getElementById('version');

    const request = indexedDB.open(database.value, version.value);

    request.onupgradeneeded = (e) => {
        alert('version upgraded')

    }

    request.onsuccess = (e) => {
        console.log(e)
        alert('success is called')
    }

    request.onerror = (e) => {
        alert('error')
    }
}