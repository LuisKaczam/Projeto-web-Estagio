function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href ='/src/loginAdmin.html';
    }).catch(()=>{
        alert("Erro ao sair da página");
    })
}