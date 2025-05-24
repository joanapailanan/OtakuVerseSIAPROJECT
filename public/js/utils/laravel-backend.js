async function fetchData() {
    try {
        const response = await fetch('http://localhost:8000/api/data');
        const data = await response.json();
        document.getElementById('data').innerText = data.message;
    } catch (error) {
        console.error('Error:', error);
    }
}
fetchData();