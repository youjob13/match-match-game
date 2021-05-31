import './game.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../shared/HOC/Container';
import GameField from './GameField/GameField';
import Timer from '../shared/Timer/Timer';
import { IGameService } from '../shared/interfaces/game-service-model';
import { IPropsToBaseControl } from '../shared/interfaces/api';

class Game extends BaseControl<HTMLElement> {
  timer: Timer;

  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private changeCurrentPage: (path: string) => void,
    private gameService: IGameService
  ) {
    super(propsToBaseControl);

    this.timer = new Timer({
      tagName: 'section',
      classes: ['game__timer', 'timer'],
    });

    this.init();
  }

  private async init(): Promise<void> {
    await this.gameService.startGame();
    this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    const gameField = new GameField(
      {
        tagName: 'section',
        classes: ['game-field'],
      },
      this.gameService,
      this.changeCurrentPage,
      this.timer
    );

    wrapper.append(this.timer.node, gameField.node);
  }
}

export default Game;
