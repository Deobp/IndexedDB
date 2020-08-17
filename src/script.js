const request = indexedDB.open('notes', 5);

request.onupgradeneeded = (e) => {
    alert('upgrade is called')
}

request.onsuccess = (e) => {
    console.log(e)
    alert('success is called')
}

request.onerror = (e) => {
    alert('error')
}