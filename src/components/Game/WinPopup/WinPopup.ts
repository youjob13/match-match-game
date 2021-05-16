import './winPopup.scss';

import Popup from '../../shared/Popup/Popup';
import BaseControl from '../../shared/BaseControl/BaseControl';
import timerValidator from '../../functions/timerValidator';

class WinPopup extends Popup {
  finishTime: number;

  constructor(finishTime: number) {
    const propsToBaseControl = { tagName: 'div', classes: ['popup'] };
    super(propsToBaseControl);
    this.finishTime = finishTime;
    this.render();
  }

  private render(): void {
    const popupContent = new BaseControl({
      tagName: 'p',
      classes: ['win-popup__content'],
      text: `Congratulations! You successfully found all matches on ${timerValidator(
        this.finishTime
      )} minutes.`, // TODO: minutes/seconds
    });

    const popupButton = new BaseControl({
      tagName: 'a',
      classes: ['popup__button'],
      text: 'Ok',
      attributes: { href: '#best-score' },
    });

    this.popupInner.node.classList.add('win-popup');
    this.popupInner.node.append(popupContent.node, popupButton.node);
    document.getElementById('app')?.append(this.node); // TODO: remove getElementById
  }
}

export default WinPopup;
