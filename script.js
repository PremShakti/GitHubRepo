const apiUrl = "https://api.github.com/users/{username}/repos";
const apiUrlUserInfo = "https://api.github.com/users/{username}";
let perPage = 5;
let currentPage = 1;
let u = 2;
// let count=totalCount;
$("#perPagecardView").val(perPage);
$("#nextnumbers").click(() => {
  const urll = apiUrlUserInfo.replace("{username}", "premshakti");

  $.get(urll, function (userData) {
    u = userData.public_repos;
  });

  if (perPage < u) {
    perPage++;

    $("#perPagecardView").text(perPage);
    fetchUserInfo("premshakti");
  }
});

$("#preview").click(() => {
  if (perPage >= 2) {
    perPage--;

    $("#perPagecardView").text(perPage);
    fetchUserInfo("premshakti");
  } else {
    $("#preview").prop("disabled", true);
  }
});

function fetchUserInfo(username) {
  const url = apiUrlUserInfo.replace("{username}", username);

  $.get(url, function (userData) {
    console.log(userData);
    const totalCount = userData.public_repos;
    const name = userData.name;
    const blog = userData.blog;
    const bio = userData.bio;
    const location = userData.location;
    let avatar = userData.avatar_url;
    fetchRepositories(username, totalCount);
    displayProfile(name, blog, location, bio, location, avatar);
  });
}

function fetchRepositories(username, totalCount) {
  const url =
    apiUrl.replace("{username}", username) +
    `?per_page=${perPage}&page=${currentPage}`;

  $.get(url, function (data) {
    displayRepositories(data);
    displayPagination(totalCount);
  });
}

function displayProfile(name, blog, location, bio, avatar) {
  console.log(avatar);
  $("#profilecard").empty();
  const profile = `<div class="profileCard">
    <div class="profileImage">
      <img src="https://avatars.githubusercontent.com/u/112472700?v=4" alt="photo" />
    </div>

    <div class="profileTexts">
      <h1>${name}</h1>
      <p>${bio}</p>
      <p>${location}</p>
      <p>Twiter :httpss://twiter.com/premdas</p>
    </div>
  </div>
  <p class="linkofrepo">${blog}</p>`;

  $("#profilecard").append(profile);
}

function displayRepositories(repositories) {
  const repoList = $("#repoList");
  repoList.empty();

  repositories.forEach((repo) => {
    const card = $('<div class="card"></div>');

    const inercard = `  <h2>${repo.name}</h2>
       <p>${repo.description || "No description available"}</p>
       <div class="cardBTNS">
         <div>${repo.language || "N/A"}</div>
         
       </div>`;

    card.append(inercard);
    repoList.append(card);
  });
}

function displayPagination(totalCount) {
  let totalPages = Math.ceil(totalCount / perPage);
  let indexstart = 1;
  const pagination = $("#pagination");
  // const nextandpreviewcontainer = $("#nextandpreviewcontainer");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const button = $(` <div class="pagebtn">${i}</div>`);
    button.click(() => {
      currentPage = i;
      fetchRepositories("premshakti", totalCount);
    });

    let pag = `<div class="pagebtn">${i}</div>`;
    pagination.append(pag);
  }
}

$(document).ready(function () {
  fetchUserInfo("premshakti"); // Replace 'your-github-username' with the GitHub username you want to display
  $("#perPagecardView").text(perPage);
});
