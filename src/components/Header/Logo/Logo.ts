import './logo.scss';
import BaseControl from '../../BaseControl/BaseControl';

class Logo extends BaseControl {
  constructor(props: { tagName: string, classes: string[] }) {
    super(props);
    this.init();
  }

  init():void {
    this.render();
  }

  private render():void {
    const spanUp = new BaseControl({ tagName: 'span', classes: ['logo__up'], text: 'Match' });
    const spanDown = new BaseControl({ tagName: 'span', classes: ['logo__down'], text: 'Match' });
    this.node.append(spanUp.node, spanDown.node);
  }
}

export default Logo;
