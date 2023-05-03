const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");
const btnLogin = document.getElementById("btnLogin");
const btnLoginGoogle = document.getElementById("btnLoginGoogle");

const auth = firebase.auth();

function validaButtonLogin() {
  const emailLogin = email.value;
  const passwordLogin = password.value;

  if (emailLogin.length == 0 || passwordLogin.length == 0) {
    document.getElementById('btnLogin').disabled = true;
  } else {
    document.getElementById('btnLogin').disabled = false;
  }
}
email.addEventListener("input", validaButtonLogin);
password.addEventListener("input", validaButtonLogin);

function recuperaSenha() {
  const emailField = prompt("Digite seu E-mail");
  if (emailField !== null) {
    auth.sendPasswordResetEmail(String(emailField)).then(() => {
      alert("E-mail enviado com sucesso!");
    }).catch(error => {
      alert("E-mail não reconhecido.");
      console.log(error);
    })
  }
}


function emailSenhaLogin(){
  const emailField = email.value;
  const passwordField = password.value;
  auth.signInWithEmailAndPassword(emailField, passwordField).then(() => {
    window.location.href="/src/codigos.html";

  }).catch(error => {
    document.getElementById('loginError').style.display = "block";
    console.log(error);
  });
}

function onSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const profile = result.additionalUserInfo.profile;
      const userName = profile.name;
      const isNewUser = result.additionalUserInfo.isNewUser;

      if (isNewUser) {
        createUser(userName);
      } else {
        window.location.href = "/src/codigos.html";
      }

    }
    ).catch((error) => {
      console.log(error);
    })
}

btnLogin.addEventListener('click', emailSenhaLogin);

btnLoginGoogle.addEventListener('click', onSignIn);


