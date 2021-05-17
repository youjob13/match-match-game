import './game.scss';

import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import GameField from './GameField/GameField';
import Timer from '../shared/Timer/Timer';
import { ICardsJSON } from '../shared/interfaces/card-model-json';

class Game extends BaseControl {
  gameField: GameField;

  timer: Timer;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private getData: () => Promise<Array<ICardsJSON>>,
    private gameSettings: any, // TODO: remove any,
    private changeCurrentPage: (path: string) => void
  ) {
    super(propsToBaseControl);
    this.gameField = new GameField(
      {
        tagName: 'section',
        classes: ['game-field'],
      },
      this.stopGame,
      this.gameSettings,
      this.changeCurrentPage
    );

    this.timer = new Timer({
      tagName: 'section',
      classes: ['game__timer', 'timer'],
    });

    this.startGame();
  }

  stopGame = (): number => {
    this.timer.stop();
    return this.timer.counter;
  };

  async getCards(): Promise<void> {
    const gameData: Array<ICardsJSON> = await this.getData();
    gameData.forEach((data) => {
      if (data.category === this.gameSettings.category) {
        this.gameField?.setCards(data);
      }
    });
  }

  private eventListeners(): void {
    this.node.onload = () => this.getCards();
  }

  startGame(): void {
    this.eventListeners();
    this.getCards();
    this.timer.start();
    this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);
    wrapper.append(this.timer.node, this.gameField.node);
  }
}

export default Game;
