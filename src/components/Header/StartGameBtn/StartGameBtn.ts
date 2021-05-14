import BaseControl from '../../BaseControl/BaseControl';
import './start-game-btn.scss';

class StartGameBtn extends BaseControl {
  constructor(props: { tagName: string; classes: string[]; text: string }) {
    super(props);
    this.node.setAttribute('href', '#game');
  }
}

export default StartGameBtn;
