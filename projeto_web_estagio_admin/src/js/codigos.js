window.addEventListener('load', function () {
    var loader = document.querySelector('.loader');
    setTimeout(function () {
        loader.style.display = 'none';
    }, 2000);
});

var databaseReference = firebase.database().ref('admins');

databaseReference.on('value', function (snapshot) {
  var tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';


  var table = document.createElement('table');
  table.classList.add('table-auto', 'w-full', 'bg-white', 'shadow-lg');

  snapshot.forEach(function (admin) {
    var adminData = admin.val();
    var keys = adminData.keys;

    if (keys) {
      document.getElementById("avisoCodigos").style.display="none";
      var deletarTodos = document.createElement('button');
      deletarTodos.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 inline-block align-text-bottom mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        Deletar todas as chaves`;
      deletarTodos.classList.add('bg-red-500', 'text-red-500', 'p-2', 'ml-6', 'mt-4', 'bg-white', 'mb-2', 'rounded-lg', 'flex');
      deletarTodos.addEventListener('click', deleteTodasChaves);
      tableContainer.appendChild(deletarTodos);
      table.innerHTML = `
      <thead>
        <tr>
          <th class="px-4 py-2">Chave</th>
          <th class="px-4 py-2">Pontos</th>
          <th class="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
    `;
    Object.keys(keys).forEach(function (key) {
      var rowData = keys[key];
      var row = document.createElement('tr');
      row.innerHTML = `
        <td class="border px-4 py-2">${rowData.nomeDaChave}</td>
        <td class="border px-4 py-2">${rowData.valorDaChave}</td>
        <td class="flex justify-center border px-4 py-2">
        <button onclick="deleteChave('${key}')" class="flex items-center text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>        
          </button>
        </td>
      `;
      table.appendChild(row);
    });
  }else{
      document.getElementById("avisoCodigos").style.display="block";
  }
  });

  tableContainer.appendChild(table);
  tableContainer.appendChild(document.createElement('br'));
});


function deleteChave(chave) {
  var id = firebase.auth().currentUser.uid;
  var databaseReference = firebase.database().ref('admins/' + id + '/keys/' + chave);
  databaseReference.remove()
    .then(() => {
      console.log('Chave excluída com sucesso');
    })
    .catch(function (error) {
      console.log('Erro ao excluir chave:', error);
    });
}

function deleteTodasChaves() {
  var id = firebase.auth().currentUser.uid;
  var databaseReference = firebase.database().ref('admins/' + id + '/keys');
  databaseReference.remove()
    .then(() => {
      console.log('Chaves excluídas com sucesso');
    })
    .catch(function (error) {
      console.log('Erro ao excluir chaves:', error);
    });
}


const textAreaInput = document.getElementById('inputChaves');
const countCaracteres = document.getElementById('countCaracteres');
textAreaInput.addEventListener('input', () => {
    countCaracteres.textContent = `${textAreaInput.value.length} caracteres`;
});



const counter = document.getElementById("counter-input");
document.getElementById("btnChaves").addEventListener('click', function () {
    const inputTextArea = textAreaInput.value;
    let keysArray = inputTextArea.split(';')
      .map(word => word.trim())
      .filter(word => word !== '' && word !== '\n');

    console.log(keysArray);
    cadastrarPalavras(keysArray, counter.value);

});



function cadastrarPalavras(keysArray, pnts) {
  var databaseReference = firebase.database();
  var id = firebase.auth().currentUser.uid;

  databaseReference.ref('admins/' + id + '/keys').once('value')
    .then(function (snapshot) {
      var existingKeys = snapshot.val() || {};

      keysArray.forEach(function (word) {
        var keyIndex = 'key' + (Object.keys(existingKeys).length + 1);

        existingKeys[keyIndex] = {
          nomeDaChave: word,
          valorDaChave: pnts
        };
      });

      databaseReference.ref('admins/' + id + '/keys').set(existingKeys)
        .then(() => {
          console.log('Cadastrado com Sucesso');
        })
        .catch(function (error) {
          console.log('Erro ao cadastrar no banco de dados:', error);
        });
    })
    .catch(function (error) {
      console.log('Erro ao acessar o banco de dados:', error);
    });

    document.getElementById("inputChaves").value = "";
    document.getElementById("counter-input").value = 0;
    countCaracteres.textContent= "";
}


