function login() {

}

function getShirtOfTheWeek() {

    fetch('/getWeeklyShirt').then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("weeklyShirt").src = data.image;
            document.getElementById("label_weeklyShirt").textContent = data.name;
        });

}

function openFormWeeklyShirt() {
    const modal = document.querySelector('#modal');
    fetch('/getWeeklyShirt').then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("shirt").src = data.image;
        });
    modal.showModal();
}

function closeFormWeeklyShirt() {
    const modal = document.querySelector('#modal');
    modal.close();
}

function getCompanyShirts() {
    fetch('/getCompanyShirts').then((resp) => resp.json())
        .then(function (data) {
            renderDataInTheTable(data);
        });
}

function renderDataInTheTable(data) {
    const trs = document.getElementById("company-table");
    const arr = Array.from(data);
    let newRow = document.createElement("tr");

    for (i = 0; i < arr.length; i++) {
        let cell = document.createElement("td");
        let imagee = document.createElement("img");
        cell.innerText = arr[i].name;
        imagee.setAttribute('src', arr[i].image);
        imagee.style.border = '5px, solid purple';
        newRow.appendChild(cell);
        newRow.appendChild(imagee);
    }
    trs.appendChild(newRow);
}

function getCommunityShirts() {

}