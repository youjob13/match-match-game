import './winPopup.scss';

import Popup from '../../common/Popup/Popup';
import BaseControl from '../../BaseControl/BaseControl';

class WinPopup extends Popup {
  constructor() {
    const props = { tagName: 'div', classes: ['popup'] };
    super(props);
    this.render();
  }

  private render(): void {
    const popupContent = new BaseControl({
      tagName: 'p',
      classes: ['win-popup__content'],
      text: 'Congratulations! You successfully found all matches on 1.21 minutes.',
    });
    const popupButton = new BaseControl({
      tagName: 'button',
      classes: ['popup__button'],
      text: 'Ok',
    });

    this.popupInner.node.classList.add('win-popup');
    this.popupInner.node.append(popupContent.node, popupButton.node);
    document.body.append(this.node);
  }
}

export default WinPopup;
