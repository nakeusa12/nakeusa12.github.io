let db = null;

const openRequest = indexedDB.open("winplay", "1");

openRequest.onupgradeneeded = (event) => {
  db = event.target.result;
  let teamSaved = db.createObjectStore("saved_teams", {
    keyPath: "id",
  });

  console.log("Upgradde is called");
};

openRequest.onerror = (e) => {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = (e) => {
  db = event.target.result;

  // continue to work with database using db object
  console.log("database success ");
};

const saveButton = document.getElementById("save-team");
if (saveButton) {
  saveButton.addEventListener("click", () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    fetchApi(base_url + "v2/teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);

        const dataTeam = {
          id: data.id,
          image: data.crestUrl,
          name: data.name,
        };

        const tx = db.transaction("saved_teams", "readwrite");
        const savedTeam = tx.objectStore("saved_teams");
        savedTeam.add(dataTeam);
      });
  });
}

function saveTeamFav() {
  const tx = db.transaction("saved_teams", "readonly");
  const savedTeams = tx.objectStore("saved_teams");
  const request = savedTeams.openCursor();

  let savedTeamHTML = ``;
  request.onsuccess = (e) => {
    const cursor = e.target.result;

    if (cursor) {
      // do something
      let urlTeamImage = cursor.value.image;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
      savedTeamHTML += `<div class="team-info">
        <div class="club-image">
        <img src="${urlTeamImage}" alt="">
        </div>
        <p>${cursor.value.name}</p>
        <div class="trash" onClick="deleteTeam(${cursor.key});" >
        <i class="far fa-trash-alt"></i>
        </div>
        </div>`;

      cursor.continue();
    }

    const redTeam = (document.getElementById(
      "saveTeam"
    ).innerHTML = savedTeamHTML);
  };
}
