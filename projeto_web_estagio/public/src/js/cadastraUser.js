function createUser(userName, pnts, avatar){
    var databaseReference = firebase.database();
    const id = firebase.auth().currentUser.uid;
    const data = new Date();
    const idUser = String(data.getHours()) + String(data.getMinutes()) + String(data.getSeconds()) + userName
    var newUser = {
      idUser: idUser.replace(/\s+/g, ''),
      uid: id,
      name: userName,
      pnts: pnts,
      userAvatar: avatar,
      keyStoreged: ['0'],
      auth: '0'
    };
    databaseReference.ref('usuarios').child(id).set(newUser).then(()=>{
      window.location.href ='/public/src/home.html';
    }).catch(function(error) {
      console.log("Erro ao cadastrar no banco de dados:", error);
    });
  }