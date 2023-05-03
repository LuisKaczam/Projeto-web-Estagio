var databaseReference = firebase.database().ref('usuarios');

window.addEventListener('load', function() {
  var loader = document.querySelector('.loader');
  setTimeout(function() {
    loader.style.display = 'none';
  }, 2000); 
});

databaseReference.on('value', function (snapshot) {
    var users = [];
    snapshot.forEach(function (user) {
        users.push(user.val());
    });
    users.sort((a, b) => b.pnts - a.pnts);

    const cardsContainer = document.getElementById('cards-container');

    cardsContainer.innerHTML = '';

    users.forEach((user, index) => {
      var laurel;
      var tamAvatar;
  
      if(index == 0){
        laurel = "./images/wreath-gold.png";
        tamAvatar = "style=' width: 4rem;height: 4rem; margin-top: -5.2rem; margin-left: 1.25rem'";
        tamLaurel = "style=' width: 6.5rem; height: 6.5rem;'";
      }
      else if(index == 1){
        laurel = "./images/silver-laurel-wreath.png";
        tamAvatar = "style=' width: 4rem;height: 4rem; margin-top: -5.45rem; margin-left: 1.10rem'";
        tamLaurel = "style=' width: 6.25rem; height: 6.20rem;'";
      }
      else if(index == 2){
        laurel = "./images/bronze.png";
        tamAvatar = "style=' width: 4rem;height: 4rem; margin-top: -5.5rem; margin-left: 1.25rem'";
        tamLaurel = "style=' width: 6.5rem; height: 6.5rem;'";
      }
      else{
        laurel = null;
        tamAvatar = "style=' width: 5rem;height: 5rem;  margin-left: 0.5rem; margin-top: 0.5rem'";
      }
  
      const card = document.createElement('div');
      card.classList.add('mt-8', 'bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'my-4');
      card.innerHTML = `
  <div class="p-4 flex items-center">
    <h2 class="p-4 text-gray-800 font-bold text-xl mb-2">${index + 1}º</h2>
    <div class="flex rounded-full text-center">
    <div id="laurel"  ${tamLaurel}>
        ${laurel ? `<img id="IconLaurel" src="${laurel}"  alt="${user.name}">` : ''}
        <div class="avatar-container" style="width: 5rem;">
          <img id="rankingAvatar" src="${user.userAvatar}" ${tamAvatar} avatar" alt="${user.name}">
        </div>
      </div>
    </div>
    <div class="w-2/3 p-4">
      <h2 class="text-gray-800 font-bold text-xl mb-2">${user.name}</h2>
      <p class="text-gray-600 text-base">ID: ${user.idUser}</p>
      <p class="text-gray-600 text-base">Pontos: ${user.pnts}</p>
    </div>
  </div>
`;
        
      cardsContainer.appendChild(card);
    });
  });
