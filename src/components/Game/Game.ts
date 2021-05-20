import './game.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import GameField from './GameField/GameField';
import Timer from '../shared/Timer/Timer';
import { IGameService } from '../services/GameService';

class Game extends BaseControl {
  gameField: GameField;

  timer: Timer;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private changeCurrentPage: (path: string) => void,
    private gameService: IGameService
  ) {
    super(propsToBaseControl);
    this.gameField = new GameField(
      {
        tagName: 'section',
        classes: ['game-field'],
      },
      this.gameService,
      this.stopTimer,
      this.changeCurrentPage
    );

    this.timer = new Timer({
      tagName: 'section',
      classes: ['game__timer', 'timer'],
    });

    this.render();
  }

  private stopTimer = (): number => {
    this.timer.stop();
    return this.timer.counter;
  };

  private render(): void {
    this.timer.start();
    const wrapper = ContainerWrapper(this.node);
    wrapper.append(this.timer.node, this.gameField.node);
  }
}

export default Game;
