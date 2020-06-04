// Informasi dari Developer Mozilla
// Dan Video Tutorial IndexdDB di YOUTUBE

// Untuk menyimpan data sementara dari  target btn yg di klick
let db = null;

const request = indexedDB.open("winplay", "1");

request.onupgradeneeded = (e) => {
  db = e.target.result;

  const sTeam = db.createObjectStore("team_saving", {
    keyPath: "id",
  });

  console.log("Upgrade is called");
};

request.onsuccess = (e) => {
  db = e.target.result;

  // continue to work with database using db object
  console.log("database success ");
};

request.onerror = (e) => {
  console.error("Error", request.error);
};

const btnSaveTeam = document.getElementById("save-team");
if (btnSaveTeam) {
  btnSaveTeam.addEventListener("click", () => {
    let urlTeam = new URLSearchParams(window.location.search);
    let idTeam = urlTeam.get("id");
    console.log(idTeam);
    fetchApi(base_url + "v2/teams/" + idTeam)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);

        const dataTeam = {
          id: data.id,
          image: data.crestUrl,
          name: data.name,
          shortName: data.shortName,
          website: data.website,
          phone: data.phone,
          address: data.address,
          venue: data.venue,
          founded: data.founded,
          color: data.clubColors,
        };
        console.log(dataTeam);

        const tx = db.transaction("team_saving", "readwrite");
        tx.onerror = (e) => alert(` Error! ${e.target.error}  `);
        const storeTeam = tx.objectStore("team_saving");
        storeTeam.add(dataTeam);
        M.toast({
          html: "Team Has Been Saved Succesfully",
        });
      });
  });
}

function saveTeamFav() {
  const tx = db.transaction("team_saving", "readonly");
  const readTeam = tx.objectStore("team_saving");
  const request = readTeam.openCursor();
  let savedTeamHTML = ``;
  request.onsuccess = (e) => {
    const cursor = e.target.result;

    if (cursor) {
      // do something
      let urlTeamImage = cursor.value.image;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
      savedTeamHTML += `
      
      <div class="area-favorite-team">
        <div class="logo-fav-team">
          <img src="${urlTeamImage}" alt="logoClub">
        </div>
        <div class="info-team-fav">
          <p class="team-name-fav">${cursor.value.name}</p>
          <ul class="detail-info-team-fave">
            <li>
              <b>Short Name</b> : ${cursor.value.shortName}
            </li>
            <li>
              <b>Website</b> : ${cursor.value.website}
            </li>
            <li>
              <b>Phone</b> : ${cursor.value.phone}
            </li>
            <li>
              <b>Address</b> : ${cursor.value.address}
            </li>
            <li>
              <b>Stadium</b> : ${cursor.value.venue}
            </li>
            <li>
              <b>Founded</b> : ${cursor.value.founded}
            </li>
            <li>
              <b>Club Colors</b> : ${cursor.value.color}
            </li>
          </ul>
        </div>
        <div class="btn-fav">
          <div class="trash" onClick="deleteTeam(${cursor.key});" >
          <i class="material-icons">clear</i>
          </div>
          <a class="detail-fav" href="./pages/detailteam.html?id=${cursor.key}" >
          <i class="material-icons">info</i>
          </a>
        </div>
      </div>`;

      cursor.continue();
    }

    document.getElementById("place-save-team").innerHTML = savedTeamHTML;
  };
}

function deleteTeam(id) {
  console.log(id);
  const tx = db.transaction("team_saving", "readwrite");
  const deleteTeam = tx.objectStore("team_saving");
  deleteTeam.delete(id);

  M.toast({
    html: "Team Has Been Deleted Succesfully",
  });
}
