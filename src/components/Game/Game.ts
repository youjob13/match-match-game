import './game.scss';

import BaseControl from '../BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import GameField from './GameField/GameField';
import Timer from '../Timer/Timer';

class Game extends BaseControl {
  private gameField: GameField;

  timer: Timer;

  constructor(props: { tagName: string; classes: string[] }) {
    super(props);
    this.gameField = new GameField(
      {
        tagName: 'section',
        classes: ['game-field'],
      },
      this.stopGame
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
    const res = await fetch('./cards.json');
    const cards = await res.json();
    console.log(cards[0].cards); // TODO: realize to select categories

    this.gameField?.setCards(cards[0].cards);
  }

  async startGame(): Promise<void> {
    this.render();
    this.getCards();
    this.timer.start();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);
    wrapper.append(this.timer.node, this.gameField.node);
  }
}

export default Game;
