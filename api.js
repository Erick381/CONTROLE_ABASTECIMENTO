let API_URL;

fetch('../../config.json')
    .then(response => response.json())
    .then(config => {
        API_URL = config.API_URL;
    });

async function apiGet(endpoint) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.json();
}

async function apiPost(endpoint, data) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.json();
}
