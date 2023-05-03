  const userName = document.getElementById("nome");
  const email = document.getElementById("email"); 
  const password = document.getElementById("password"); 
  const btnCadastrar = document.getElementById("btnCadastrar");

  const auth = firebase.auth();

 
  btnCadastrar.addEventListener('click', function(e){
    const emailField = email.value;
    const passwordField = password.value;
    const nameField = userName.value;
    e.preventDefault();
    auth.createUserWithEmailAndPassword(emailField, passwordField).then(()=>{
        createUser(nameField, 0, '');

    }).catch(error =>{
      console.log("Erro ao criar user" + error)

        document.getElementById('cadError').style.display = "block";
        console.log(error)
    });

  });


  
  
  