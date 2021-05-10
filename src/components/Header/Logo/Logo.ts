import './logo.scss';
import BaseControl from '../../BaseControl/BaseControl';

class Logo extends BaseControl {
  constructor(tagName: string, classes: string[]) {
    super(tagName, classes);
    this.create();
  }

  private create():void {
    const spanUp = new BaseControl('span', ['logo__up'], 'Match');
    const spanDown = new BaseControl('span', ['logo__down'], 'Match');
    this.node.append(spanUp.node, spanDown.node);
  }
}

export default Logo;
