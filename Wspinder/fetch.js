async function fetchData() {
    try {
        const api = `https://my.api.mockaroo.com/wspinder.json/?key=bd2463b0`;

        const odp = await fetch(api);
        const data = await odp.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

    async function filterData() {
const data = await fetchData();

const sexualityFilter = document.getElementById('sexuality').value;
const genderFilter = document.getElementById('gender').value;
const climbingTypeFilter = document.getElementById('climbingType').value;
const residenceFilter = document.getElementById('residence').value;
const minAgeFilter = parseInt(document.getElementById('minAge').value) || 0;
const maxAgeFilter = parseInt(document.getElementById('maxAge').value) || Number.MAX_SAFE_INTEGER;

const filteredData = data.filter(item => (
    (sexualityFilter === '' || item['sexual orientation'] === sexualityFilter) &&
    (genderFilter === '' || item['gender'] === genderFilter) &&
    (climbingTypeFilter === '' || item['favorite type of climbing'] === climbingTypeFilter) &&
    (residenceFilter === '' || item['place of residence'] === residenceFilter) &&
    (item.age >= minAgeFilter && item.age <= maxAgeFilter)
));

    displayData(filteredData);
}

function displayData(data) {
const partnerlist = document.getElementById('partnerlist');
partnerlist.innerHTML = '';

if (data.length === 0) {
    partnerlist.textContent = 'No users fitting your criteria.';
} else {
    const table = document.createElement('table');
    table.classList.add('record-table');

    const header = document.createElement('tr');
    for (const key in data[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        header.appendChild(th);
    }
    table.appendChild(header);

    data.forEach(item => {
        const row = document.createElement('tr');
        for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        table.appendChild(row);
    });

    partnerlist.appendChild(table);
}
}