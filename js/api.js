const base_url = "https://api.football-data.org/";

const fetchApi = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": "9a354b4b915c43f087b471a99fab5dad",
    },
  });
};

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

function json(response) {
  // Mengembalikan sebuah Promise berupa objek/array JavaScript
  // yang diubah dari teks JSON.
  return response.json();
}

function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getStandingMatches() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2021/matches")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let standingHTML = "";
            data.standings[0].table.forEach(function (standing) {
              standingHTML += `
              <tr class="row-first centered">
                <th class="centered">${standing.position}</th>
                <th class="centered club">${standing.team.name}</th>
                <th class="centered">${standing.playedGames}</th>
                <th class="centered">${standing.won}</th>
                <th class="centered">${standing.draw}</th>
                <th class="centered">${standing.lost}</th>
                <th class="centered">${standing.goalsFor}</th>
                <th class="centered">${standing.goalsAgainst}</th>
                <th class="centered">${standing.goalDifference}</th>
                <th class="centered points">${standing.points}</th>
              </tr>
              `;
            });

            document.getElementById("standing-league").innerHTML = standingHTML;
          });
        }
      });
  }

  fetchApi(base_url + "v2/competitions/2021/standings")
    .then(status)
    .then(json)
    .then(function (data) {
      let standingHTML = "";
      data.standings[0].table.forEach(function (standing) {
        standingHTML += `
      <tr class="mid centered">
        <th class="centered">${standing.position}</th>
        <th class="centered club">${standing.team.name}</th>
        <th class="centered">${standing.playedGames}</th>
        <th class="centered">${standing.won}</th>
        <th class="centered">${standing.draw}</th>
        <th class="centered">${standing.lost}</th>
        <th class="centered">${standing.goalsFor}</th>
        <th class="centered">${standing.goalsAgainst}</th>
        <th class="centered">${standing.goalDifference}</th>
        <th class="centered points">${standing.points}</th>
      </tr>
      `;
      });

      document.getElementById("standing-league").innerHTML = standingHTML;
    });
}

function getStandingMatches() {}

function getTeams() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2021/teams")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let teamHTML = "";
            data.teams.forEach(function (team) {
              var urlTeamImage = team.crestUrl;
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
              teamHTML += `<a href=./pages/detailteam.html?id=${team.id}>
                                <div class="team-info">
                                    <div class="club-image">
                                        <img src="${urlTeamImage}" alt="">
                                    </div>
                                    <p>${team.name}</p>
                                    </div>
                                </a>`;
            });

            document.getElementById("team-inggris").innerHTML = teamHTML;
          });
        }
      });
  }

  fetchApi(base_url + "v2/competitions/2021/teams")
    .then(status)
    .then(json)
    .then(function (data) {
      let teamHTML = "";
      data.teams.forEach(function (team) {
        var urlTeamImage = team.crestUrl;
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
        teamHTML += `<a href=./pages/detailteam.html?id=${team.id}&saved=true>
                          <div class="team-info">
                              <div class="club-image">
                                  <img src="${urlTeamImage}" alt="">
                              </div>
                              <p>${team.name}</p>
                              </div>
                          </a>`;
      });

      document.getElementById("team-inggris").innerHTML = teamHTML;
    });
}

function getTeamsById() {
  return new Promise((resolve, reject) => {
    // Mengambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "v2/teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            let urlTeamImage = data.crestUrl;
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
            let logoTeam = `<img src="${urlTeamImage}" alt="">`;
            let nameTeam = data.name;
            let detailTeam = `
              <li>Name : ${data.name}</li>
              <li>Short Name : ${data.shortName}</li>
              <li>Website : ${data.website}</li>
              <li>Phone : ${data.phone}</li>
              <li>Address : ${data.address}</li>
              <li>Stadium : ${data.venue}</li>
              <li>Founded : ${data.founded}</li>
              <li>Club Colors : ${data.clubColors}</li>
            `;

            let teamDetail = "";
            data.squad.forEach(function (player) {
              teamDetail += `
              <tr>
                <th>${player.name}</th>
                <th>${player.position}</th>
                <th>${player.nationality}</th>
                <th>${player.role}</th>
              </tr>
              `;
            });

            document.querySelector(".logo-team").innerHTML = logoTeam;
            document.querySelector(".team-name").innerHTML = nameTeam;
            document.querySelector(".detail-info-team").innerHTML = detailTeam;
            document.querySelector(".detail-team").innerHTML = teamDetail;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchApi(base_url + "v2/teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        let urlTeamImage = data.crestUrl;
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
        let logoTeam = `<img src="${urlTeamImage}" alt="">`;
        let nameTeam = data.name;
        let detailTeam = `
              <li><b>Name</b> : ${data.name}</li>
              <li><b>Short Name</b> : ${data.shortName}</li>
              <li><b>Website</b> : ${data.website}</li>
              <li><b>Phone</b> : ${data.phone}</li>
              <li><b>Address</b> : ${data.address}</li>
              <li><b>Stadium</b> : ${data.venue}</li>
              <li><b>Founded</b> : ${data.founded}</li>
              <li><b>Club Colors</b> : ${data.clubColors}</li>
            `;

        let teamDetail = "";
        data.squad.forEach(function (player) {
          teamDetail += `
              <tr>
                <th class="gray-main">${player.name}</th>
                <th>${player.position}</th>
                <th class="gray-main">${player.nationality}</th>
                <th >${player.role}</th>
              </tr>
              `;
        });

        document.querySelector(".logo-team").innerHTML = logoTeam;
        document.querySelector(".team-name").innerHTML = nameTeam;
        document.querySelector(".detail-info-team").innerHTML = detailTeam;
        document.querySelector(".detail-team").innerHTML = teamDetail;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}
