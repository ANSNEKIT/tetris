export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer()
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();

    if (state.isGameOver) {
      this.view.renderEndScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;

    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update();
      }, speed > 0 ? speed : 100);
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
  }

  handleKeyDown(evt) {
    const state = this.game.getState();

    switch (evt.key) {
      case 'Enter':
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause()
        } else {
          this.play()
        }
        
        break;
      case 'ArrowDown':
        if (this.isPlaying) {
          this.stopTimer();
          this.game.movePieceDown();
          this.updateView();
          break;
        } else {
          break;
        }
        
      case 'ArrowLeft':
        if (this.isPlaying) {
          this.game.movePieceLeft();
          this.updateView();
          break;
        } else {
          break;
        }
        
      case 'ArrowRight':
        if (this.isPlaying) {
          this.game.movePieceRight();
          this.updateView();
          break;
        } else {
          break;
        }
        
      case 'ArrowUp':
        if (this.isPlaying) {
          this.game.rotatePiece();
          this.updateView();
          break;
        } else {
          break;
        }
    }
  }
  
  handleKeyUp(evt) {
    switch (evt.key) {
      case 'ArrowDown':
        if (this.isPlaying) {
          this.startTimer(); 
          this.game.movePieceDown();
          this.updateView();
          break;
        } else {
          break;
        }
    }
  }
}
