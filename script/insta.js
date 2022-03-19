/* Original: https://popcat.xyz/static/insta.js */

const main = document.getElementById("main");
const search = document.getElementById("search");

async function getUser(username) {
    const resp = await fetch(`https://badboy.is-a.dev/api/json/instauser?username=${encodeURIComponent(username.toLowerCase())}`);
    const respData = await resp.json();
    createUserCard(respData);
}

function createUserCard(user) {
  if(user.error) return main.innerHTML = "<h2>User not found</h2>"
    const cardHTML = `
<div class="card">
<a class="username" href="${user.url}">${user.username}</a>
      <a download="${user.username}.jpg" href="${user.profile_pic}"><img class="avatar" src="${user.profile_pic}" alt="${user.username}"/></a>
   <div class="user-info">
      <span>${user.name}</span>
      <p>${user.biography}</p>
      <ul class="info">
         <li>${user.followers.toLocaleString()}<strong>Followers</strong></li>
         <li>${user.following.toLocaleString()}<strong>Following</strong></li>
         <li>${user.posts}<strong>Posts</strong></li>
      </ul>
      <div id="repos"></div>
   </div>
</div>
    `;

    main.innerHTML = cardHTML;
}

getUser("_itz.bad.boy_");

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});