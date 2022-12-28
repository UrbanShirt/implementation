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

function getCompanyImage() {

}


function getCommunityImage() {

}