function logout(){
    firebase.auth().signOut().then(()=>{
        window.location.href ='/public/src/login.html';
    }).catch(()=>{
        alert("Erro ao sair da página");
    })
}