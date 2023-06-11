// Define the player class
class Player {
    constructor(name) {
      this.name = name;
      this.score = 0;
    }
  
    rollDice() {
      const dice = [];
      for (let i = 0; i < 6; i++) {
        dice.push(Math.floor(Math.random() * 6) + 1);
      }
      return dice;
    }
  
    updateScore(points) {
      this.score += points;
    }
  }
  
  function hasStraight(dice) {
    return dice.length === 6 && new Set(dice).size === 6;
  }
  
  function hasThreeOfKind(dice, value) {
    const count = dice.filter((d) => d === value).length;
    return count >= 3;
  }
  
  function calculateScore(dice) {
    let score = 0;
  
    if (hasStraight(dice)) {
      score += 1500;
    } else {
      const counts = new Array(7).fill(0);
  
      for (const value of dice) {
        counts[value]++;
      }
  
      for (let i = 1; i <= 6; i++) {
        if (counts[i] >= 3) {
          if (i === 1) {
            score += 1000;
          } else {
            score += i * 100;
          }
          counts[i] -= 3;
        }
  
        if (i === 1 || i === 5) {
          score += counts[i] * (i === 1 ? 100 : 50);
        }
      }
    }
  
    return score;
  }
  
  function addPlayer(name) {
    const player = new Player(name);
    players.push(player);
    const playerElement = document.createElement('div');
    playerElement.textContent = `${name}: 0`;
    document.getElementById('players').appendChild(playerElement);
  }
  
  function updatePlayerScore(player) {
    const playerElement = document.querySelector(`#players div:contains(${player.name})`);
    playerElement.textContent = `${player.name}: ${player.score}`;
  }
  
  function animateDice() {
    const diceElements = document.querySelectorAll('.dice');
    const rollButton = document.getElementById('rollButton');
    rollButton.disabled = true;
  
    diceElements.forEach((diceElement) => {
      diceElement.classList.add('rolling');
    });
  
    setTimeout(() => {
      diceElements.forEach((diceElement) => {
        diceElement.classList.remove('rolling');
      });
  
      const dice = currentPlayer.rollDice();
      const score = calculateScore(dice);
      currentPlayer.updateScore(score);
      updatePlayerScore(currentPlayer);
  
      dice.forEach((value, index) => {
        const diceElement = diceElements[index];
        diceElement.className = `dice dice${value}`;
      });
  
      if (currentPlayer.score >= 10000) {
        document.getElementById('game').textContent = `${currentPlayer.name} wins!`;
        rollButton.disabled = true;
        return;
      }
  
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      currentPlayer = players[currentPlayerIndex];
      rollButton.disabled = false;
    }, 1000);
  }

  
  const players = [];
  let currentPlayerIndex = 0;
  let currentPlayer = null;
  
  const numPlayers = parseInt(prompt('Enter the number of players (1-4):'), 10);
  
  if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 4) {
    alert('Invalid number of players. Please refresh the page to try again.');
  } else {
    for (let i = 1; i <= numPlayers; i++) {
      const playerName = prompt(`Enter the name of Player ${i}:`);
      addPlayer(playerName);
    }
  
    currentPlayer = players[currentPlayerIndex];
    document.getElementById('rollButton').addEventListener('click', animateDice);
  }
  