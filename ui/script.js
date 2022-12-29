function getHomePageShirts() {
    getHomePageCompanyShirt();
    getShirtOfTheWeek();
    getHomePageCommunityShirt();
    isUserLogged();
}

function isUserLogged() {
    if (localStorage.getItem("username")) {
        document.getElementById("pr").style.display = "none";
        document.getElementById("ua").style.display = "flex";
    } else {
        document.getElementById("pr").style.display = "flex";
        document.getElementById("ua").style.display = "none";
    }
}

function getShirtOfTheWeek() {
    fetch('/getWeeklyShirt').then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("weeklyShirt").src = data.image;
            document.getElementById("label_weeklyShirt_name").textContent = "name: " + data.name;
            document.getElementById("label_weeklyShirt_creationDate").textContent = "creationDate: " + data.creationDate;
            document.getElementById("label_weeklyShirt_creator").textContent = "creator: " + data.creator;
            document.getElementById("label_weeklyShirt_color").textContent = "color: " + data.color;
            document.getElementById("label_weeklyShirt_material").textContent = "material: " + data.material;
            document.getElementById("label_weeklyShirt_likes").textContent = "likes: " + data.likes;
        });
}

function getHomePageCompanyShirt() {
    fetch('/getHomepageCompanyShirt').then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("companyShirt").src = data;
        });
}

function getHomePageCommunityShirt() {
    fetch('/getHomepageCommunityShirt').then((resp) => resp.json())
        .then(function (data) {
            document.getElementById("communityShirt").src = data;
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

function getFilteredCompanyShirts() {
    var filterName = document.getElementById("search").value;
    fetch('/getFilteredCompanyShirts/' + filterName).then((resp) => resp.json())
        .then(function (data) {
            clearShirtsTable(true);
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
    fetch('/getCommunityShirts').then((resp) => resp.json())
        .then(function (data) {
            renderDataInTheTableCommunity(data);
        });
}

function getFilteredCommunityShirts() {
    var filterName = document.getElementById("search").value;
    fetch('/getFilteredCommunityShirts/' + filterName).then((resp) => resp.json())
        .then(function (data) {
            clearShirtsTable(false);
            renderDataInTheTableCommunity(data);
        });
}

function renderDataInTheTableCommunity(data) {
    const trs = document.getElementById("community-table");
    const arr = Array.from(data);
    let newRow = document.createElement("tr");

    for (i = 0; i < arr.length; i++) {
        let cell = document.createElement("td");
        let imagee = document.createElement("img");
        let btnLike = document.createElement("button");
        btnLike.setAttribute("id", "btn_" + arr[i].name);
        btnLike.innerText = "like";
        btnLike.setAttribute("onclick", "likeShirt(\"" + arr[i].name + "\")");
        cell.innerText = arr[i].name + "\n" + arr[i].creationDate + "\n"
            + arr[i].creator + "\n" + arr[i].color + "\n" + arr[i].material
            + "\n" + arr[i].likes;
        imagee.setAttribute('src', arr[i].image);
        imagee.style.border = '5px, solid purple';
        newRow.appendChild(cell);
        newRow.appendChild(btnLike);
        newRow.appendChild(imagee);
    }
    trs.appendChild(newRow);
}

function likeShirt(shirtName) {
    if (!localStorage.getItem("username") || !localStorage.getItem("token")) {
        alert("Non hai eseguito il login!");
        return;
    }

    fetch('/likeCommunityShirt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: shirtName,
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        })
    }).then(function (res) {
        return res.json();
    }).then(function (suegResp) {
        if (suegResp.error) {
            throw new Error(suegResp.error);
        }
        alert(suegResp.message);
    }).catch((error) => {
        alert(error);
    });
}

function clearShirtsTable(isCompany) {
    var shirtTable;
    if (isCompany) {
        shirtTable = "company-table";
    } else {
        shirtTable = "community-table";
    }

    console.log(shirtTable);

    var trs = document.getElementById(shirtTable);
    var rows = document.getElementsByTagName("tr");

    trs.removeChild(rows[0]);
}

function registraUtente() {
    var password = document.getElementById("register").password.value;
    var confirmPsw = document.getElementById("register").confirmPsw.value;

    if (password != confirmPsw) {
        alert("Password e Conferma Password non corrispondono");
        document.getElementById("register").password.value = "";
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
            password: password
        })
    }).then(function (res) {
        return res.json();
    }).then(function (suegResp) {
        if (suegResp.error) {
            throw new Error(suegResp.error);
        }
        alert("user " + suegResp.username + " correctly registered");
        document.getElementById("register").reset();
    }).catch((error) => {
        alert(error);
        document.getElementById("register").reset();
    });
}

function login() {
    var username = document.getElementById("login").username.value;
    var password = document.getElementById("login").password.value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(function (res) {
        return res.json();
    }).then(function (suegResp) {
        if (suegResp.error) {
            throw new Error(suegResp.error);
        }
        document.getElementById("login").reset();
        localStorage.setItem("username", suegResp.username);
        localStorage.setItem("token", suegResp.token);
        alert(suegResp.message);
    }).catch((error) => {
        alert(error);
        document.getElementById("login").reset();
    });
}

function logout() {
    localStorage.clear();
}

function viewPassword() {
    var x = document.getElementById("hiddenPassword");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getUserData() {
    fetch('/getUserData/' + localStorage.getItem("username")).then(function (res) {
        return res.json();
    }).then(function (suegResp) {
        if (suegResp.error) {
            throw new Error(suegResp.error);
        }
        document.getElementById("username").textContent = suegResp.username;
        document.getElementById("email").textContent = suegResp.email;
        document.getElementById("firstName").textContent = suegResp.firstName;
        document.getElementById("lastName").textContent = suegResp.lastName;
        document.getElementById("address").textContent = suegResp.address;
        document.getElementById("birthDate").textContent = suegResp.birthDate;
        document.getElementById("password").textContent = suegResp.password;
    }).catch((error) => {
        alert(error);
    });
}
