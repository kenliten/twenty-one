const ui = {
  menu: {
    newGame: document.querySelector('#new-game-option')
  },
  controls: {
    p1: document.querySelector('#player-one'),
    p2: document.querySelector('#player-two'),
  },
  runningTotal: document.querySelector('#running-total'),
  history: document.querySelector('#history'),
  modal: document.querySelector('.modal'),
  modalCloser: document.querySelector('.closer'),
  modalMessages: document.querySelector('#modal-messages'),
  gameModes: {
    pvp: document.querySelector('.pvp-mode'),
    pvc: document.querySelector('.pvc-mode'),
    cvc: document.querySelector('.cvc-mode')
  }
}

const history = [];
var runningTotal = 0;
var next;

const players = {
  p1: {}, p2: {}
}

const showModal = function(message) {
  if (typeof message === 'string') {
    ui.modalMessages.innerHTML = message;
    setTimeout(function() {
      window.location.reload();
    }, 3000)
  }
  ui.modal.style.display = 'block';
}

const hideModal = function() {
  ui.modal.style.display = 'none';
}

const init = function() {
  history.splice(0, history.length);
  runningTotal = 0;
  next = null;
  ui.runningTotal.innerHTML = `Running Total:<br><span>${runningTotal}</span>`;
  ui.history.innerHTML = '';
}

const record = function(c) {
  runningTotal += c.choice;
  history.push(c);

  if (turn(players.p1)) {
    next = players.p2.name;
  } else {
    next = players.p1.name;
  }

  ui.history.innerHTML = '';

  history.forEach((item, index) => {
    let li = document.createElement('li');
    li.textContent = `${index + 1}: ${item.player} have choose ${item.choice}`;
    ui.history.appendChild(li);
  });

  ui.runningTotal.innerHTML = `Running Total:<br><span>${runningTotal}</span>`;

  if (runningTotal >= 21) {
    showModal(`<strong>Game Over!</strong><br/>${c.player} won the game!`);
  }
}

const turn = function(player = null) {
  if (player) {
    if (next == player.name) {
      return true;
    } else {
      return false;
    }
  } else {
    let arr = [];
    arr.push(players.p1.name);
    arr.push(players.p2.name);

    next = arr[Math.round(Math.random())];

    let li = document.createElement('li');
    li.textContent = `${next} go first!`;
    ui.history.appendChild(li);
  }
}

const playGame = function(mode) {
  switch (mode) {
    case 'pvp':
      ui.controls.p1.style.visibility = 'visible';
      ui.controls.p2.style.visibility = 'visible';
      players.p1 = new Player('Player1');
      ui.controls.p1.children[1].addEventListener('click', function(e) {
        turn(players.p1) ? players.p1.play(1) : alert("Isn't your turn");
      });
      ui.controls.p1.children[2].addEventListener('click', function(e) {
        turn(players.p1) ? players.p1.play(2) : alert("Isn't your turn");
      });
      ui.controls.p1.children[3].addEventListener('click', function(e) {
        turn(players.p1) ? players.p1.play(3) : alert("Isn't your turn");
      });
      players.p2 = new Player('Player2');
      ui.controls.p2.children[1].addEventListener('click', function(e) {
        turn(players.p2) ? players.p2.play(1) : alert("Isn't your turn");
      });
      ui.controls.p2.children[2].addEventListener('click', function(e) {
        turn(players.p2) ? players.p2.play(2) : alert("Isn't your turn");
      });
      ui.controls.p2.children[3].addEventListener('click', function(e) {
        turn(players.p2) ? players.p2.play(3) : alert("Isn't your turn");
      });
      turn();
      break;
    case 'pvc':
      ui.controls.p1.style.visibility = 'visible';
      ui.controls.p2.style.visibility = 'hidden';
      players.p2 = new Computer('Computer');
      players.p1 = new Player('Player');
      ui.controls.p1.children[1].addEventListener('click', function() {
        if (turn(players.p1)) {
          players.p1.play(1)
          if (runningTotal < 21) {
            setTimeout(function(){players.p2.play();}, 2000);
          }
        } else {
          alert("Isn't your turn");
        }
      });
      ui.controls.p1.children[2].addEventListener('click', function() {
        if (turn(players.p1)) {
          players.p1.play(2)
          if (runningTotal < 21) {
            setTimeout(function(){players.p2.play();}, 2000);
          }
        } else {
          alert("Isn't your turn");
        }
      });
      ui.controls.p1.children[3].addEventListener('click', function() {
        if (turn(players.p1)) {
          players.p1.play(3)
          if (runningTotal < 21) {
            setTimeout(function(){players.p2.play();}, 2000);
          }
        } else {
          alert("Isn't your turn");
        }
      });
      turn();
      if (turn(players.p2)) {
        players.p2.play();
      }
      break;
    case 'cvc':
      ui.controls.p1.style.visibility = 'hidden';
      ui.controls.p2.style.visibility = 'hidden';
      players.p1 = new Computer('Computer1');
      players.p2 = new Computer('Computer2');
      turn();
      while(runningTotal <= 20) {
        if (turn(players.p1)) {
          // nextMove = setTimeout(players.p1.play, 2000);
          players.p1.play();
        } else {
          // nextMove = setTimeout(players.p2.play, 2000);
          players.p2.play();
        }
      }
      break;
  }
  console.log(`Game started with ${mode} mode`);
}

const chooseGameMode = function(mode) {
  hideModal();
  init();
  playGame(mode);
}

ui.menu.newGame.addEventListener('click', showModal);

ui.gameModes.pvp.addEventListener('click', function() {
  chooseGameMode('pvp');
});

ui.gameModes.pvc.addEventListener('click', function() {
  chooseGameMode('pvc');
});

ui.gameModes.cvc.addEventListener('click', function() {
  chooseGameMode('cvc');
});

ui.modalCloser.addEventListener('click', hideModal)