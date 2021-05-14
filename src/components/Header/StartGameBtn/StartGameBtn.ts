import BaseControl from '../../BaseControl/BaseControl';
import './start-game-btn.scss';

class StartGameBtn extends BaseControl {
  private startGame: () => void;

  constructor(
    props: { tagName: string; classes: string[]; text: string },
    startGame: () => void
  ) {
    super(props);
    this.startGame = startGame;
    this.init();
  }

  private start(): void {
    this.startGame();
  }

  private init(): void {
    this.eventListeners();
  }

  private eventListeners(): void {
    this.node.addEventListener('click', this.start.bind(this));
  }
}

export default StartGameBtn;
