const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let cryptoData = [];

function fetchDataWithThen() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

async function fetchDataWithAsync() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        cryptoData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const tableBody = document.getElementById('cryptoTable').querySelector('tbody');
    tableBody.innerHTML = '';
    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}"></td>
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
            <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
        `;
        tableBody.appendChild(row);
    });
}

function searchData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(searchValue));
    renderTable(filteredData);
}

function sortData(criteria) {
    const sortedData = [...cryptoData];
    if (criteria === 'market_cap') {
        sortedData.sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'percentage_change') {
        sortedData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    renderTable(sortedData);
}
