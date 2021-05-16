import './logo.scss';
import BaseControl, { IAttr } from '../../shared/BaseControl/BaseControl';

class Logo extends BaseControl {
  constructor(propsToBaseControl: {
    tagName: string;
    classes: string[];
    attributes: IAttr;
  }) {
    super(propsToBaseControl);
    this.init();
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    const spanUp = new BaseControl({
      tagName: 'span',
      classes: ['logo__up'],
      text: 'Match',
    });

    const spanDown = new BaseControl({
      tagName: 'span',
      classes: ['logo__down'],
      text: 'Match',
    });

    this.node.append(spanUp.node, spanDown.node);
  }
}

export default Logo;
