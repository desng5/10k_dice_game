
//DOM - Doc Obj Model 
document.addEventListener("DOMContentLoaded", function () {
    const playerNames = [];
    const playerScores = [];
    let currentPlayer = 0;
  
    const numPlayersInput = document.getElementById("num-players");
    const playerNamesButton = document.getElementById("player-names-button");
    const startGameButton = document.getElementById("start-game-button");
    const nameInputsContainer = document.getElementById("name-inputs");
    const audioContainer = document.getElementById("audio-container");
    const rollButton = document.getElementById("roll-button");
    const diceContainer = document.getElementById("dice-container");
    const playerScoresContainer = document.getElementById("player-scores");
    const gameMessages = document.getElementById("game-messages");
    // const newGameButton = document.getElementById("new-game-btn")
  
    playerNamesButton.addEventListener("click", function () {
      const numPlayers = parseInt(numPlayersInput.value);
      if (numPlayers < 1 || numPlayers > 4) {
        // alert("Pleae select number of Players (1-4).");
        return;
      }

        // Clear existing name inputs
        nameInputsContainer.innerHTML = "";

        // Inputs for each player
        for (let i = 0; i < numPlayers; i++) {
            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.placeholder = "Player " + (i + 1) + " name";
            nameInputsContainer.appendChild(nameInput);
        }
        
        //start button display and new line
        startGameButton.style.display = "block";
    });

    //func will run when player click's
    startGameButton.addEventListener("click", function () {
        const nameInputs = nameInputsContainer.getElementsByTagName("input");
        for (let i = 0; i < nameInputs.length; i++) {
          const playerName = nameInputs[i].value.trim();
          if (!playerName) {
            alert("Please enter names for all players!");
            return;
          }
          playerNames[i] = "Player " + (i + 1) + ": " + playerName;
          playerScores[i] = 0;
        }

        // Hide input fields and buttons
        numPlayersInput.style.display = "none";
        playerNamesButton.style.display = "none";
        nameInputsContainer.style.display = "none";
        startGameButton.style.display = "none";

        // Show game elements
        diceContainer.style.display = "block";
        playerScoresContainer.style.display = "block";
        rollButton.style.display = "block";
        rollButton.disabled = false;

        updatePlayerScoresUI();
});
    });


    rollButton.addEventListener("click", function () {
        const dice = rollDice();
        const score = calculateScore(dice);
    
        playerScores[currentPlayer] += score;
    
        // Update UI
        updateDiceUI(dice);
        updatePlayerScoresUI();
    
        if (playerScores[currentPlayer] >= 10000) {
            gameMessages.textContent = playerNames[currentPlayer]+ " is the winner!";
            rollButton.disabled = true;
            // newGameButton.style.display = "block";
            return;
        }
        //cycle through order of players turns
        currentPlayer = (currentPlayer + 1) % playerNames.length;

        const audioElement = document.createElement("audio");
        audioElement.id = "dice-sound";
        audioElement.src = "/static/audio/dice-142528.mp3";
        audioContainer.appendChild(audioElement);

        // Play the dice roll sound
        audioElement.play();
    });
    
    // Reset the game and clear UI elements
//   function resetGame() {
//     playerNames.length = 0;
//     playerScores.length = 0;
//     currentPlayer = 0;
//     numPlayersInput.value = "";
//     nameInputsContainer.innerHTML = "";
//     gameMessages.textContent = "";
//     diceContainer.innerHTML = "";
//     playerScoresContainer.innerHTML = "";
//     numPlayersInput.style.display = "block";
//     playerNamesButton.style.display = "block";
//     rollButton.style.display = "none";
//     startGameButton.style.display = "none";
//     // newGameButton.style.display = "none";
//     };


// //   newGameButton.addEventListener("click", function () {
// //     resetGame();
// //   });


    function updateDiceUI(dice) {
        diceContainer.innerHTML = "";
        for (const value of dice) {
            const diceElement = document.createElement("img");
            diceElement.classList.add("dice");
            diceElement.src = "/static/images/dice1.png";
            diceElement.src = "/static/images/dice2.png";
            diceElement.src = "/static/images/dice2.png";
            diceElement.src = "/static/images/dice4.png";
            diceElement.src = "/static/images/dice5.png";
            diceElement.src = "/static/images/dice6.png";
            diceContainer.appendChild(diceElement);
        }
    }
    
    // dice [] stores values of rolled dice
    //simulates random 6 dice roll
    function rollDice() {
        const dice = [];
        for (let i = 0; i < 6; i++) {
            dice.push(Math.floor(Math.random() * 6) + 1);
        }
        return dice;
    }

    function calculateScore(dice) {
        const count = Array.from({ length: 7 }, () => 0);
        let score = 0;

        for (const value of dice) {
            count[value]++;
        }

        // Single 5's
        score += count[5] * 50;

        // Single 1's
        score += count[1] * 100;

        // Three of a Kind
        for (let i = 1; i <= 6; i++) {
            if (count[i] >= 3) {
                if (i === 1) {
                    score += 1000;
                } else {
                    score += i * 100;
                }
                count[i] -= 3;
            } 
        }

        
        // if (count[2] >= 3) {
        //     score += 200;
        //     count[2] -= 3;
        // }
        // if (count[3] >= 3) {
        //     score += 300;
        //     count[3] -= 3;
        // }
        // if (count[4] >= 3) {
        //     score += 400;
        //     count[4] -= 3;
        // }
        // if (count[5] >= 3) {
        //     score += 500;
        //     count[5] -= 3;
        // }

        // Straight
        if (count.slice(1).every(val => val === 1)) {
            score += 1500;
        }

        return score;
    }

    function updateDiceUI(dice) {
        diceContainer.innerHTML = "";
        for (const value of dice) {
            const diceElement = document.createElement("img");
            diceElement.classList.add("dice");
            diceElement.src = "./static/images/dice" + value + ".png";
            diceContainer.appendChild(diceElement);
        }
    }

    function updatePlayerScoresUI() {
        playerScoresContainer.innerHTML = "";
        for (let i = 0; i < playerNames.length; i++) {
          const scoreElement = document.createElement("div");
          scoreElement.textContent = playerNames[i] + ": " + playerScores[i];
          playerScoresContainer.appendChild(scoreElement);
        }
      }
    });
