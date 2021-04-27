import Game from './src/game.js';
import View from './src/view.js';

const $root = document.getElementById('root');
const options = {
  width: 480,
  height: 640,
  rows: 20,
  columns: 10,
}

const game = new Game();
const view = new View($root, options);

window.game = game;
window.view = view;


document.addEventListener('keydown', (evt) => {
  switch (evt.key) {
    case 'ArrowDown': 
      game.movePieceDown();
      view.render(game.getState());
      break;
    case 'ArrowLeft':
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 'ArrowRight':
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 'ArrowUp':
      game.rotatePiece();
      view.render(game.getState());
      break;
  }
});
