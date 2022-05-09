// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const heartUIs = document.getElementsByClassName('like-glyph');
  for(let i=0; i<heartUIs.length; i++) {
    registerHeartUiClicks(heartUIs[i]);
  }
})

function registerHeartUiClicks(heartUI) {
  heartUI.addEventListener('click', handleHeartUiClick);
}

async function handleHeartUiClick(event) {
  event.preventDefault();
  mimicServerCall()
  .then(changeHeart(event))
  .catch(handleHeartClickError);
}

function changeHeart(event) {
    const heart = event.target;
    if(heart.innerText === EMPTY_HEART) {
      heart.innerText = FULL_HEART;
      heart.setAttribute('class', 'activated-heart');
    }
    else {
      heart.innerText = EMPTY_HEART;
      heart.removeAttribute('class');
    }
}

function handleHeartClickError(error) {
  document.getElementById('modal').removeAttribute('class');
  document.getElementById('modal-message').innerText = error;
  const ERROR_DISPLAY_MILISECONDS = 3000;
  const errorDisplayTimeout = setTimeout(hideErrorDisplay, ERROR_DISPLAY_MILISECONDS);
}

function hideErrorDisplay() {
  document.getElementById('modal').setAttribute('class', 'hidden');
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
