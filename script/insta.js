/* Original: https://popcat.xyz/static/insta.js */
const main = document.getElementById("main");
const search = document.getElementById("search");



async function getUser(username) {
    const resp = await fetch(`https://popcat.xyz/ig?user=${encodeURIComponent(username.toLowerCase())}`);
    const respData = await resp.json();
    createUserCard(respData);
}

function createUserCard(user) {
    if (user.error) return main.innerHTML = "<h2 style=\"color: white;\">User not found</h2>"
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="/ig/pfp/${user.username}" alt="${user.username}" />
            </div>
            <div class="user-info">
                <a class="username" href="https://instagram.com/${user.username}">${user.username}</a>
                <p>${user.biography ? `${user.biography}` : `${user.username} Has no bio set 😔`}</p>

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

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});