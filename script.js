rotation = {
  playerCommitted: ''
};

document.addEventListener("DOMContentLoaded", function () {

  loadGun((Math.floor(Math.random() * (6 - 1 + 1) + 1)))
  if ((Math.floor(Math.random() * 2)) == 1) {
    rotation.playerCommitted = player1.name
    window.alert(player1.name + ' is your turn')
  } else {
    rotation.playerCommitted = player2.name
    window.alert(player2.name + ' is your turn')
  }

  let shotgunElem = document.querySelector('#Shotgun');
  let div = document.createElement('div');
  div.innerHTML =
  `
  <div class="">
  <p class="mb-0 " id="magazine"><i>There are ${shotgun.magazine.length} more Bullets </i></p>
  </div>
  `
  shotgunElem.appendChild(div)

  //extracted updatePlayersBoard
  updatePlayersBoard();


})

//reverted array
player1 = {
  name: 'PLAYER 1', lp: 6, canBuff: true
},

player2 = {
  name: 'PLAYER 2', lp: 6, canBuff: true
}


let shotgun = {
  magazine: [], isPowered: false
}


function loadGun(ammount) {
  for (let i = 0; i < ammount; i++) {
    shotgun.magazine.push(new Shell(Math.floor(Math.random() * 2)))
  }
}


function shoot(target) {
  if (shotgun.magazine[0].isLive) {
    target.lp = target.lp - 1
    if (shotgun.isPowered) {
      target.lp = target.lp - 1
    }
  } shotgun.magazine.shift()

  if (rotation.playerCommitted == player1.name) {
    rotation.playerCommitted = player2.name
  } else {
    rotation.playerCommitted = player1.name
  }
  //newcheck for lp
  target.name == player1.name ? player1 = target : player2 = target


  updatePlayersBoard()

  updateShotugunBoard()
  if (player1.lp <= 0) {
    window.alert(player2.name + ' YOU HAVE WON')
  } else if (player2.lp <= 0) {
    window.alert(player1.name + ' YOU HAVE WON')
  }

  if (shotgun.magazine.length == 0) {
    let reloadElem = document.querySelector('#Reload');
    let reloadDiv = document.createElement('div');
    reloadDiv.innerHTML =
    `
    <div class="mt-3">
    <button type="button" class="btn btn-lg btn-dark">RELOAD</button>
    </div>
    `
    reloadElem.appendChild(reloadDiv)

    reloadElem.addEventListener('click', function () {

      loadGun((Math.floor(Math.random() * (6 - 1 + 1) + 1)))

      updateShotugunBoard()
      reloadElem.innerHTML = '';

    })
  }
}

function updateShotugunBoard() {
  let shotgunElem = document.querySelector('#Shotgun');
  shotgunElem.innerHTML = '';
  let shotgunDiv = document.createElement('div');
  shotgunDiv.innerHTML =
  `
  <div class="">
  <p class="mb-0 " id="magazine"><i>There are ${shotgun.magazine.length} more Bullets </i></p>
  </div>
  `
  shotgunElem.appendChild(shotgunDiv)
}

function updatePlayersBoard() {
  let giocatori = document.querySelector('#giocatori');
  giocatori.innerHTML = '';
  let div = document.createElement('div');

  console.log("THAT" + rotation.playerCommitted)

  let bangPlayer1 = ''
  let bangPlayer2 = ''

  if (rotation.playerCommitted == player1.name) {
    bangPlayer1 = 'Bang Me'
    bangPlayer2 = 'Bang Opponent'
  } else {
    bangPlayer1 = 'Bang Opponent'
    bangPlayer2 = 'Bang Me'
  }

  //changed to old style
  div.innerHTML =
  `
  <div class="contact-card">
  <h3 class="my-2" id="player1-name">${player1.name}</h3>
  <h5 class="my-2 text-success" id="player1-lp">HP ${player1.lp}</h5>
  <button type="button" class="btn btn-danger" id="spara-1">${bangPlayer1}</button>
  <div>
  <button type="button" class="btn btn-secondary btn-lg mt-5" id="powerUp">SHOW ME THE MAG</button>
  </div>
  <h3 class="mt-5" id="player2-name">${player2.name}</h3>
  <h5 class="text-success" id="player2-lp">HP ${player2.lp}</h5>
  <button type="button" class="btn btn-danger" id="spara-2">${bangPlayer2}</button>
  </div>
  `
  giocatori.appendChild(div)


  let bang1 = document.querySelector('#spara-1');
  bang1.addEventListener('click', function () { shoot(player1) })
  let bang2 = document.querySelector('#spara-2');
  bang2.addEventListener('click', function () { shoot(player2) })
  let powerUp = document.querySelector('#powerUp');
  powerUp.addEventListener('click', function () {
    window.alert('There are ' + shotgun.magazine.map(bullet => bullet.isLive).filter(Boolean).length + ' Lethal bullets in the magazine')
    if (rotation.playerCommitted == player1.name) {
      player1.canBuff = false;
    } else {
      player2.canBuff = false;
    }
  })
  if (rotation.playerCommitted == player1.name) {
    if (!player1.canBuff) {
      powerUp.hidden = true;
    }
  } else if (!player2.canBuff) {
    powerUp.hidden = true;
  }
}






class Shell {
  constructor(isLive) {
    this.isLive = isLive
  }
}
