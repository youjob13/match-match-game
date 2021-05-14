import './popup.scss';

import BaseControl from '../../BaseControl/BaseControl';

class Popup extends BaseControl {
  popupInner: BaseControl;

  constructor(props: { tagName: string; classes: string[] }) {
    super(props);
    this.popupInner = new BaseControl({
      tagName: 'div',
      classes: ['popup__inner'],
    });
    this.node.append(this.popupInner.node);
  }
}

export default Popup;
