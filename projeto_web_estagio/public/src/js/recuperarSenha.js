const email = document.getElementById("recuperaSenha");
const erroEmail = document.getElementById("emailError");


const auth = firebase.auth();

function recuperaSenha() {
  const emailField = email.value;
  if (emailField !== null) {
    auth.sendPasswordResetEmail(String(emailField)).then(() => {
      document.getElementById("emailSuccess").style.display= "block";
    }).catch(error => {
      erroEmail.style.display= "block";
      setTimeout(function() {
        erroEmail.style.display= "none";
      }, 2000);
      console.log(error);
    })
  }
}
document.getElementById("btnRecuperaSenha").addEventListener('click', function(){
    recuperaSenha();
});