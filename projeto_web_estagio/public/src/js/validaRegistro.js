const nameCad = document.getElementById("nome");
const emailCad = document.getElementById("email"); 
const passwordCad = document.getElementById("password");


function testEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}

function testName(userName){
    return /^[a-zA-ZÀ-ÿ ]+$/.test(userName);
}

function validaNome(){
    const userName = nameCad.value;
    if(!userName){
        return true;
    }
    else if(testName(userName)){
        document.getElementById('erroNome').style.display = "none";
        return false;
    }else{
        document.getElementById('erroNome').style.display = "block";
        return true;
        
    }
}

function validaEmail(){
    const email = emailCad.value;

    if(!email){
        return true;
    }
    else if(testEmail(email)){
        document.getElementById('erroEmail').style.display = "none";
        return false;
    }else{
        document.getElementById('erroEmail').style.display = "block";
        return true;
        
    }
}

    function validaButtonCadastro(){
        const email = validaEmail();
        const password = validaSenha();
        const userName = validaNome();
        

        if(email == true || password == true || userName == true){
            document.getElementById('btnCadastrar').disabled = true;
        }else{
            document.getElementById('btnCadastrar').disabled = false;
        }
    }

function validaSenha(){
    const password = passwordCad.value;

    if(!password){
        return true;
    }
    else if(password.length > 6){
        document.getElementById('erroSenha').style.display = "none";
        return false;
    }else{
        document.getElementById('erroSenha').style.display = "block";
        return true
        }
}

emailCad.addEventListener("input", validaButtonCadastro);
passwordCad.addEventListener("input", validaButtonCadastro);
nameCad.addEventListener("input", validaButtonCadastro);