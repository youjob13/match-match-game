import './game.scss';

import BaseControl from '../BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
// import GameField from './GameField/GameField';
import Timer from '../Timer/Timer';

class Game extends BaseControl {
  constructor(props: { tagName: string, classes: string[] }) {
    super(props);
    this.init();
  }

  init():void {
    this.render();
  }

  private render():void {
    const wrapper = ContainerWrapper(this.node);
    // const gameField = new GameField({ tagName: 'section', classes: ['game-field'] });
    const timer = new Timer({ tagName: 'section', classes: ['game__timer', 'timer'] });
    wrapper.append(timer.node);
  }
}

export default Game;
