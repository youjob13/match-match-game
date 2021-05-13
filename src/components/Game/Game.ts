import './game.scss';

import BaseControl from '../BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import GameField from './GameField/GameField';
import Timer from '../Timer/Timer';

class Game extends BaseControl {
  private gameField?: GameField;

  constructor(props: { tagName: string; classes: string[] }) {
    super(props);
    this.gameField = undefined;
    this.init();
  }

  async getCards(): Promise<void> {
    const res = await fetch('./cards.json');
    const cards = await res.json();
    console.log(cards[0].cards); // TODO: realize to select categories

    this.gameField?.setCards(cards[0].cards);
  }

  async init(): Promise<void> {
    this.render();
    this.getCards();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    const gameField = new GameField({
      tagName: 'section',
      classes: ['game-field'],
    });

    const timer = new Timer({
      tagName: 'section',
      classes: ['game__timer', 'timer'],
    });

    wrapper.append(timer.node, gameField.node);
    this.gameField = gameField;
  }
}

export default Game;
