function userAvatar() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var databaseReference = firebase.database().ref('usuarios');
            databaseReference.once('value', function (snapshot) {
                snapshot.forEach(function (user) {
                    var dado = user.val();
                    if (user.key == userId) {
                        if (dado['userAvatar'] == '') {
                            document.getElementById("header").style.display = "none"
                            document.getElementById("divInputChave").style.display = "none"
                            document.getElementById("divBtnChave").style.display = "none"
                            document.getElementById("cardUsuario").style.display = "none"
                            ModalEvento(userId);
                        } else {
                            document.getElementById("header").style.display = "flex"
                            document.getElementById("divInputChave").style.display = "flex"
                            document.getElementById("divBtnChave").style.display = "block"
                            document.getElementById("cardUsuario").style.display = "flex"
                        }
                    }
                });
            });
        }
    });
}
window.addEventListener('load', function () {
    var loader = document.querySelector('.loader');
    setTimeout(function () {
        loader.style.display = 'none';
    }, 2000);
    userAvatar();
});


document.getElementById('icone-edit').addEventListener('click', function () {
    const user = firebase.auth().currentUser.uid;
    document.getElementById("textAvatar").textContent = "Trocar Avatar";
    ModalEvento(user);
    const modalEvento = document.getElementById("modalWindowEvento")
    modalEvento.addEventListener('click', (e) => {
        if (e.target.id == 'modalWindowEvento') {
            modalEvento.classList.remove('open');
        }
    })
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      var databaseReference = firebase.database().ref('usuarios');
      databaseReference.once('value', function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
          var dado = userSnapshot.val();
          if (userSnapshot.key === userId) {
            const userName = dado['name'];
            const userId = dado['idUser'];
            var userPnts = dado['pnts'];
            const avatar = dado['userAvatar'];
            document.getElementById("iconAvatar").src = avatar;
            document.getElementById("NomeUser").textContent = userName;
            document.getElementById("IdUsuario").textContent = "id: " + userId;
            document.getElementById("PntUsuario").textContent = "Pontos: " + userPnts;
            document.getElementById("cardUsuario").style.display = "flex";
  
            document.getElementById("btnChave").addEventListener('click', () => {
              const keyInput = document.getElementById("inputKey").value;
              var databaseReferenceAdmin = firebase.database().ref('admins');
  
              databaseReferenceAdmin.once('value', function (snapshot) {
                var keyFound = false;
  
                snapshot.forEach(function (adminSnapshot) {
                  var adminData = adminSnapshot.val();
                  var keys = adminData.keys;
  
                  if (keys) {
                    Object.keys(keys).forEach(function (key) {
                      var rowData = keys[key];
                      const pnts = parseInt(rowData.valorDaChave);
  
                      if (keyInput === rowData.nomeDaChave) {
                        keyFound = true;
                        keyValidation(keyInput).then(validation => {
                          if (validation === false) {
                            var contAux = userPnts;
                            contAux += pnts;
                            userPnts = contAux;
                            updateUserPnts(userPnts);
                            updateKeyUsers(keyInput);
                            document.getElementById("PntUsuario").innerHTML = "Pontos: " + userPnts;
                            document.getElementById("erroCodigo").style.display = "block";
                            document.getElementById("erroCodigo").style.color = "green";
                            document.getElementById("erroCodigo").innerHTML = "Código cadastrado com sucesso";
                            setTimeout(function () {
                              document.getElementById("erroCodigo").style.display = 'none';
                            }, 2000);
                          } else {
                            document.getElementById("erroCodigo").style.display = "block";
                            document.getElementById("erroCodigo").innerHTML = "Código já cadastrado";
                            document.getElementById("erroCodigo").style.color = "red";
                            setTimeout(function () {
                              document.getElementById("erroCodigo").style.display = 'none';
                            }, 2000);
                          }
                        });
                      }
                    });
                  }
                });
  
                if (!keyFound) {
                  document.getElementById("erroCodigo").style.display = "block";
                  document.getElementById("erroCodigo").innerHTML = "Código Inválido";
                  setTimeout(function () {
                    document.getElementById("erroCodigo").style.display = 'none';
                  }, 2000);
                } else if (snapshot.numChildren() === 0) {
                  document.getElementById("erroCodigo").style.display = "block";
                  document.getElementById("erroCodigo").innerHTML = "Nenhum Código Encontrado";
                }
              });
            });
          }
        });
      }).catch(error => {
        console.log(error);
      });
    }
  });
  



function updateUserPnts(userPnts) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var id = firebase.auth().currentUser.uid;
            var databaseReference = firebase.database().ref('usuarios/' + id);
            databaseReference.update({ pnts: userPnts }).then(() => {
            }).catch(function (error) {
                console.log("Erro ao cadastrar chave ", error);
            });
        }
    });

}

function keyValidation(codigo) {
    return new Promise((resolve, reject) => {
        const userId = firebase.auth().currentUser.uid;
        const databaseReference = firebase.database().ref('usuarios/' + userId);
        databaseReference.once('value').then((snapshot) => {
            const keys = snapshot.val().keyStoreged;
            if (keys.includes(codigo)) {
                resolve(true);
            } else {
               resolve(false)
            }
        }).catch((error) => {
            console.log("Erro ao buscar usuários ", error);
            reject(error);
        });
    });
}

function updateKeyUsers(codigo) {
    const userId = firebase.auth().currentUser.uid;
    const databaseReference = firebase.database().ref('usuarios/' + userId);
    databaseReference.once('value').then((snapshot) => {
      const keys = snapshot.val().keyStoreged;
      if (!keys.includes(codigo)) {
        const newKeys = keys.slice();
        newKeys.push(codigo);
        databaseReference.update({ keyStoreged: newKeys }).then(() => {
          console.log("Nova chave inserida pelo usuário");
        }).catch((error) => {
          console.log("Erro ao inserir chave:", error);
        });
      }
    });
  }
  

