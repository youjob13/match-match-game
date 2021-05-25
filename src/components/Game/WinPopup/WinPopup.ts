import './winPopup.scss';

import Popup from '../../shared/Popup/Popup';
import BaseControl from '../../shared/BaseControl/BaseControl';
import timerValidator from '../../functions/timerValidator';
import Button from '../../shared/Button/Button';

class WinPopup extends Popup {
  finishTime: number;

  constructor(
    finishTime: number,
    private changeCurrentPage: (path: string) => void
  ) {
    super({ tagName: 'div', classes: ['popup'] });
    this.finishTime = finishTime;
    this.render();
  }

  protected closePopup = (): void => {
    this.changeCurrentPage('best-score');
    this.node.remove();
  };

  private render(): void {
    const popupContent = new BaseControl<HTMLElement>({
      tagName: 'p',
      classes: ['win-popup__content'],
      text: `Congratulations! You successfully found all matches on ${timerValidator(
        this.finishTime
      )} minutes.`, // TODO: minutes/seconds
    });

    const popupButton = new Button(
      {
        tagName: 'a',
        classes: ['popup__button', 'button', 'button__filled'],
        text: 'Ok',
      },
      this.closePopup
    );

    this.popupInner.node.classList.add('win-popup');
    this.popupInner.node.append(popupContent.node, popupButton.node);
    document.body.append(this.node);
  }
}

export default WinPopup;
