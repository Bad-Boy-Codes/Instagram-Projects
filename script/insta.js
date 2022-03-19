/* Original: https://popcat.xyz/static/insta.js */
let main = document.getElementById("main"),
    cardHTML = null;

async function getUser(username) {
    const resp = await fetch(`https://badboy.is-a.dev/api/json/instauser?username=${encodeURIComponent(username.toLowerCase())}`);
    const respData = await resp.json();
    createUserCard(respData);
}

function createUserCard(user) {
    if (user.error) cardHTML = "<h2>User not found</h2>"
    else cardHTML = `
<div class="card">
<a class="username" href="${user.url}">${user.username}</a>
      <a download="${user.username}.jpg" href="${user.profile_pic}"><img class="avatar" src="${user.profile_pic}" alt="${user.username}"/></a>
   <div class="user-info">
      <span>${user.name}</span>
      <p>${user.biography + (!user.external_url ? "":`<br/><br/> <a href="${user.external_url}">${user.external_url}</a>`)}</p>
      <ul class="info">
<li>${user.posts} <strong>Posts</strong></li><li>${user.followers.toLocaleString()} <strong>Followers</strong></li><li>${user.following.toLocaleString()} <strong>Following</strong></li>
      </ul>
      <div id="repos"></div>
   </div>
</div>
`;
    main.innerHTML = cardHTML;
}

getUser("_itz.bad.boy_");
const search = document.getElementById("search");
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});