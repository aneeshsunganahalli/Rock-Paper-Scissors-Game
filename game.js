const score = {
  wins: 0,
  loses: 0,
  ties: 0
}
updateScoreElement();
let isAutoplaying = false;
let intervalID;

function autoPlay(){
  if(!isAutoplaying){ 
    intervalID = setInterval(function(){
    const playerMove = pickComputerMove();
    playGame(playerMove);
  },1);
  isAutoplaying = true;
  document.querySelector('.js-auto-play-button').innerText = 'Stop Playing';
}
else {
  clearInterval(intervalID);
  isAutoplaying = false;
  document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
}
}

document.querySelector('.js-auto-play-button').addEventListener('click',() =>{
  autoPlay();
});

document.body.addEventListener('keydown',(event) => {
  if(event.key === 'a'){
    autoPlay();
  }
})

function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';


  if (playerMove === 'Scissors'){
    if(computerMove === 'Rock'){
      result = "You lose."
  }
  else if(computerMove === 'Paper'){
    result = "You win."
  }
    else if(computerMove === 'Scissors'){
      result = "Tie"
    }
  }


  else if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
      result = "Tie"
  }
  else if(computerMove === 'Paper'){
    result = "You lose."
  }
    else if(computerMove === 'Scissors'){
      result = "You win."
    }
  }


  else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){
      result = "You win."
  }
  else if(computerMove === 'Paper'){
    result = "Tie"
  }
    else if(computerMove === 'Scissors'){
      result = "You lose."
    }
  }

  if(result === 'You win.'){
    score.wins += 1;
  }
  else if (result === 'You lose.'){
    score.loses += 1;
  }
  else if(result === 'Tie'){
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
<img class="image" src="${playerMove}-emoji.png">
<img class="image" src="${computerMove}-emoji.png">
Computer`;
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber< 1/3){
    computerMove = 'Rock';
  }
  else if(randomNumber >= 1/3 && randomNumber< 2/3){
    computerMove = 'Paper';
  }
  else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissors';
  }

  return computerMove;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = 
`Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

document.querySelector('.js-reset-button').addEventListener('click',() => {
  resetScore();
  Sure();
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'Backspace'){
    resetScore();
    Sure();
  }
});
function resetScore(){
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');

}

function Sure(){
  document.querySelector('.js-sure-message').innerHTML = `Are you sure you want to reset the score?
  <button class="answer-button js-yes">Yes</button>
  <button class="answer-button js-no">No</button>`;
  document.querySelector('.js-yes').addEventListener('click', () =>{
    resetScore();
    updateScoreElement();
    document.querySelector('.js-sure-message').innerHTML = '';
  })
  document.querySelector('.js-no').addEventListener('click', () => {
    document.querySelector('.js-sure-message').innerHTML = '';
  })
}