function ModalEvento(user) {
    const modalEvento = document.getElementById("modalWindowEvento")
    modalEvento.classList.add("open");
    const imgAvatar = document.getElementById('avatares');
    imgAvatar.addEventListener('click', function (e) {
        const avatar = e.target.id;
        const endImgAvatar = e.target.src
        escolhaAvatar(avatar);
        document.getElementById("btnAvatar").addEventListener("click", updateUserAvatar(endImgAvatar, user));

    });
}

function updateUserAvatar(userAvatar, id) {
    var databaseReference = firebase.database().ref('usuarios/' + id);
    const avatar = userAvatar;
    databaseReference.update({ userAvatar: avatar }).then(() => {
        const modalEvento = document.getElementById("modalWindowEvento")
        modalEvento.addEventListener("click", (e) => {
            if (e.target.id == "btnAvatar") {
                window.location.href = "/public/src/home.html";
            }
        })
    }).catch(function (error) {
        console.log("Erro ao cadastrar no banco de dados:", error);
    });

}

function escolhaAvatar(avatar) {
    const escolha = avatar;
    switch (avatar) {
        case "avatar1":
            document.getElementById('btnAvatar').style.display = "block";
            document.getElementById('avatarBackround1').style.backgroundColor = "blue";
            document.getElementById('avatarBackround2').style.backgroundColor = "white";
            document.getElementById('avatarBackround3').style.backgroundColor = "white";
            document.getElementById('avatarBackround4').style.backgroundColor = "white";
            document.getElementById('avatarBackround5').style.backgroundColor = "white";
            document.getElementById('avatarBackround6').style.backgroundColor = "white";
            break;
        case "avatar2":
            document.getElementById('btnAvatar').style.display = "block";
            document.getElementById('avatarBackround1').style.backgroundColor = "white";
            document.getElementById('avatarBackround2').style.backgroundColor = "blue";
            document.getElementById('avatarBackround3').style.backgroundColor = "white";
            document.getElementById('avatarBackround4').style.backgroundColor = "white";
            document.getElementById('avatarBackround5').style.backgroundColor = "white";
            document.getElementById('avatarBackround6').style.backgroundColor = "white";;
            break;
        case "avatar3":
            document.getElementById('btnAvatar').style.display = "block";
            document.getElementById('avatarBackround1').style.backgroundColor = "white";
            document.getElementById('avatarBackround2').style.backgroundColor = "white";
            document.getElementById('avatarBackround3').style.backgroundColor = "blue";
            document.getElementById('avatarBackround4').style.backgroundColor = "white";
            document.getElementById('avatarBackround5').style.backgroundColor = "white";
            document.getElementById('avatarBackround6').style.backgroundColor = "white";
            break;
        case "avatar4":
            document.getElementById('btnAvatar').style.display = "block";
            document.getElementById('avatarBackround1').style.backgroundColor = "white";
            document.getElementById('avatarBackround2').style.backgroundColor = "white";
            document.getElementById('avatarBackround3').style.backgroundColor = "white";
            document.getElementById('avatarBackround4').style.backgroundColor = "blue";
            document.getElementById('avatarBackround5').style.backgroundColor = "white";
            document.getElementById('avatarBackround6').style.backgroundColor = "white";
            break;
        case "avatar5":
            document.getElementById('btnAvatar').style.display = "block";
            document.getElementById('avatarBackround1').style.backgroundColor = "white";
            document.getElementById('avatarBackround2').style.backgroundColor = "white";
            document.getElementById('avatarBackround3').style.backgroundColor = "white";
            document.getElementById('avatarBackround4').style.backgroundColor = "white";
            document.getElementById('avatarBackround5').style.backgroundColor = "blue";
            document.getElementById('avatarBackround6').style.backgroundColor = "white";
            break;
        case "avatar6":
            document.getElementById('btnAvatar').style.display = "block";
            document.getElementById('avatarBackround1').style.backgroundColor = "white";
            document.getElementById('avatarBackround2').style.backgroundColor = "white";
            document.getElementById('avatarBackround3').style.backgroundColor = "white";
            document.getElementById('avatarBackround4').style.backgroundColor = "white";
            document.getElementById('avatarBackround5').style.backgroundColor = "white";
            document.getElementById('avatarBackround6').style.backgroundColor = "blue";
            break;

    }
    return escolha;
}
