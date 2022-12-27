function login() {

}

function getShirtOfTheWeek() {

    fetch('/getWeeklyShirt').then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
        });

}
getShirtOfTheWeek();

function getCompanyImage() {

}
getCompanyImage();

function getCommunityImage() {

}