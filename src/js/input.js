export function inputController(character, sound) {
    let keysPressed = {};
    let arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    document.addEventListener('keydown', function (event) {
        if (arrowKeys.includes(event.code)) {
            keysPressed[event.code] = true;
            event.preventDefault();
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.code === 'ArrowUp' && keysPressed['ArrowUp']) { 
            character.y -= 1;
        } else if (event.code === 'ArrowDown' && keysPressed['ArrowDown']) {
            character.y += 1;
        } else if (event.code === 'ArrowLeft' && keysPressed['ArrowLeft']) {
            character.x -= 1;
        } else if (event.code === 'ArrowRight' && keysPressed['ArrowRight']) {
            character.x += 1;
        }
        playSound(sound);
        keysPressed[event.code] = false;
    });
}

function playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
  
