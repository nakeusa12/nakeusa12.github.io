// Informasi dari Developer Mozilla

// Untuk menyimpan data sementara dari  target btn yg di klick
let db = null;

function createDB() {
  const request = indexedDB.open("DBwinplay", 1);

  //on upgrade needed
  request.onupgradeneeded = (e) => {
    db = e.target.result;

    const saveTeam = db.createObjectStore("teams", {
      keyPath: "id",
    });

    console.log("Upgrade is Called");
  };

  request.onsuccess = (e) => {
    db = e.target.result;
    console.log("success is called ");
  };

  request.onerror = (e) => {
    console.error("Error", request.error);
  };
}

function saveFavTeam() {
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

      const tx = db.transaction("teams", "readwrite");
      tx.onerror = (e) => alert(` Error! ${e.target.error}  `);
      const storeTeam = tx.objectStore("teams");
      storeTeam.add(dataTeam);
    });
}

function viewFavTeam() {
  const tx = db.transaction("teams", "readonly");
  const sTeams = tx.objectStore("teams");
  const request = sTeams.openCursor();
  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      let urlTeamImage = cursor.value.image;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
      savedTeamHTML += `
      <div class="team-info">
      <p>${cursor.value.name}</p>
        <div class="club-image">
        <img src="${urlTeamImage}" alt="">
        </div>
        <div class="trash" onClick="deleteTeam(${cursor.key});" >
        <i class="material-icons">clear</i>
        </div>
      </div>`;
      //do something with the cursor
      cursor.continue();
    }
  };
  document.getElementById("place-save-team").innerHTML = savedTeamHTML;
}
