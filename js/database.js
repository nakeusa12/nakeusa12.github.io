let db = null;

const request = indexedDB.open("winplay", "1");

request.onupgradeneeded = (e) => {
  db = e.target.result;

  const sTeam = db.createObjectStore("saved_team", {
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
        };

        const tx = db.transaction("saved_team", "readwrite");
        const savedTeam = tx.objectStore("saved_team");
        savedTeam.put(dataTeam);
        M.toast({
          html: "Team Has Been Saved Succesfully",
        });
      });
  });
}

function saveTeamFav() {
  const tx = db.transaction("saved_team", "readonly");
  const readTeam = tx.objectStore("saved_team");
  const request = readTeam.openCursor();
  let savedTeamHTML = ``;
  request.onsuccess = (e) => {
    const cursor = e.target.result;

    if (cursor) {
      // do something
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

      cursor.continue();
    }

    const redTeam = document.getElementById("manageSavedTeam");

    if (redTeam) {
      redTeam.innerHTML = savedTeamHTML;
    }
  };
}

function deleteTeam(id) {
  console.log(id);
  const tx = db.transaction("saved_team", "readwrite");
  const deleteTeam = tx.objectStore("saved_team");
  deleteTeam.delete(id);

  M.toast({
    html: "Team Has Been Deleted Succesfully",
  });
  timedRefresh(20);
}

function timedRefresh(timeoutPeriod) {
  setTimeout("location.reload(true);", timeoutPeriod);
}
