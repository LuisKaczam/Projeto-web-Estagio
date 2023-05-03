function createUser(userName) {
  var databaseReference = firebase.database();
  var id = firebase.auth().currentUser.uid;
  var data = new Date();
  var idUser = String(data.getHours()) + String(data.getMinutes()) + String(data.getSeconds()) + userName.replace(/\s+/g, '');

  var newUser = {
    idUser: idUser,
    name: userName,
    keys: {
    }
  };

  databaseReference.ref('admins/' + id).set(newUser)
    .then(() => {
      window.location.href = '/src/codigos.html';
    })
    .catch(function (error) {
      console.log("Erro ao cadastrar no banco de dados:", error);
    });
}
