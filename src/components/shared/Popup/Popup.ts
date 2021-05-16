import './popup.scss';

import BaseControl from '../BaseControl/BaseControl';

class Popup extends BaseControl {
  popupInner: BaseControl;

  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.popupInner = new BaseControl({
      tagName: 'div',
      classes: ['popup__inner'],
    });
    this.node.append(this.popupInner.node);
  }
}

export default Popup;
