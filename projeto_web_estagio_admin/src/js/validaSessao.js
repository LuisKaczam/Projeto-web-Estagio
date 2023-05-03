firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.href= "/src/loginAdmin.html";
    }
});
