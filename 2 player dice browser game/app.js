/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, winAmt;

//INITIALIZATION
init();

document.querySelector('.btn-rules').addEventListener('click', function() {
    alert("Rules: - The game has 2 players, playing in rounds. In each turn, a player rolls a pair of dice as many times as the player whishes. Each result get added to his ROUND score BUT, if the player rolls a 1, all his ROUND score is lost. If the player rolls a pair of 6\'s, they lose their entire global score. After that, it\'s the next player\'s turn. The player can choose to \'Hold\', which means that his ROUND score gets added to his GLOBAL score. After that, it\'s the next player\'s turn. The first player to reach 100 points with their GLOBAL score wins the game.");
});


//ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; 
        
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png'; 
    
    // 3. update the round score if the rolled score is not a 1 
    if ((dice !== 1 && dice2 !== 1)&&(dice !== 6 || dice2 !== 6)) {
        //add score
        roundScore += (dice+dice2);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else if (dice === 6 && dice2 === 6){
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    } else {
        //next player
        nextPlayer();
    }
 }
    
});

//NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);

//HOLD
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if the player won the game
    if (scores[activePlayer] >= winAmt) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else {
        //switch turns
        nextPlayer();
    }
    }
});

//SWITCH TURNS
function nextPlayer () {
roundScore = 0;
document.getElementById('current-' + activePlayer).textContent = roundScore; 

document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

document.querySelector('.dice').style.display = 'none';
document.querySelector('.dice2').style.display = 'none';
    
};

//SET WIN CONDITION
document.querySelector('.btn-win-condition').addEventListener('click', function winCondition(){
    
    winAmt = prompt("Enter the winning value");
    
});


//INITIALIZATION
function init() {
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    gamePlaying = true;
};


































