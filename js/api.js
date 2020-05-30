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

// function getMatches() {
//   if ("caches" in window) {
//     caches
//       .match(base_url + "v2/competitions/2001/matches")
//       .then(function (response) {
//         if (response) {
//           response.json().then(function (data) {
//             let matchHTML = "";
//             data.matches.forEach(function (match) {
//               matchHTML += `
//                 <tr class="row-first centered">
//                   <th class="centered">${match.homeTeam.name}</th>
//                   <th class="centered">Vs</th>
//                   <th class="centered">${match.awayTeam.name}</th>
//                   <th class="centered">${match.score.fullTime.awayTeam} - ${match.score.fullTime.awayTeam}</th>
//                   <th class="centered">${match.status}</th>
//                 </tr>
//               `;
//             });

//             document.getElementById("matchUEFA").innerHTML = matchHTML;
//           });
//         }
//       });
//   }

//   fetchApi(base_url + "v2/competitions/2001/matches")
//     .then(status)
//     .then(json)
//     .then(function (data) {
//       let matchHTML = "";
//       data.matches.forEach(function (match) {
//         matchHTML += `
//                 <tr class="row-first centered">
//                 <th class="centered">${match.homeTeam.name}</th>
//                   <th class="centered">Vs</th>
//                   <th class="centered">${match.awayTeam.name}</th>
//                   <th class="centered">${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</th>
//                   <th class="centered">${match.status}</th>
//                 </tr>
//               `;
//       });

//       document.getElementById("matchUEFA").innerHTML = matchHTML;
//     });
// }

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
