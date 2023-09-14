export function inputController(character) {
    document.addEventListener('keydown', function (event) {
        if (event.code === 'ArrowUp') {
            character.y -= 1;
        } else if (event.code === 'ArrowDown') {
            character.y += 1;
        } else if (event.code === 'ArrowLeft') {
            character.x -= 1;
        } else if (event.code === 'ArrowRight') {
            character.x += 1;
        } else if (event.code === 'Space') {
            return 'bomb';
        }
    });
}

