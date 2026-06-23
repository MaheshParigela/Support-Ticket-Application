const CLIENT_ID = "607ckqlcamvuit4okaj9nugkti";

const DOMAIN =
"https://ap-south-1trzv7pn9u.auth.ap-south-1.amazoncognito.com";

function login() {

window.location.href =
`${DOMAIN}/login?client_id=${CLIENT_ID}&response_type=code&scope=openid+email+phone&redirect_uri=https://maheshparigela.online/dashboard.html`;

}

function signup() {

window.location.href =
`${DOMAIN}/signup?client_id=${CLIENT_ID}&response_type=code&scope=openid+email+phone&redirect_uri=https://maheshparigela.online/dashboard.html`;

}

function logout() {

window.location.href =
`${DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=https://maheshparigela.online`;

}