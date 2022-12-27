function login() {

}

function getShirtOfTheWeek() {

    fetch('/getWeeklyShirt').then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("weeklyShirt").src = data.image;
        });

}


function getCompanyImage() {

}


function getCommunityImage() {

}