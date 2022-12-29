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

function registraUtente() {
    //var psw = document.getElementById("register").elements["psw"].value;
    var psw = document.getElementById("register").psw.value;
    var confirmPsw = document.getElementById("register").confirmPsw.value;

    if (psw != confirmPsw) {
        alert("Password e Conferma Password non corrispondono");
        document.getElementById("register").psw.value = "";
        document.getElementById("register").confirmPsw.value = "";
        return;
    }

    var firstName = document.getElementById("register").firstName.value;
    var lastName = document.getElementById("register").lastName.value;
    var birthDate = document.getElementById("register").birthDate.value;
    var email = document.getElementById("register").email.value;
    var address = document.getElementById("register").address.value;
    var username = document.getElementById("register").username.value;

    fetch('/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            email: email,
            address: address,
            username: username,
            psw: psw
        })
    }).then(function (res) {
        //console.log(res);
    }).catch(error => console.log(res));//.then((resp) => resp.json()).then(function(data) { })


}
