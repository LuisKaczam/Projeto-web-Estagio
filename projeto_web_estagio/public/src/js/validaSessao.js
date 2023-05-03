firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.href= "/public/src/login.html";
    }
});