import './popup.scss';
import BaseControl from '../BaseControl/BaseControl';
import { IPropsToBaseControl } from '../interfaces/api';

class Popup extends BaseControl<HTMLElement> {
  popupInner: BaseControl<HTMLElement>;

  constructor(propsToBaseControl: IPropsToBaseControl) {
    super(propsToBaseControl);
    this.popupInner = new BaseControl({
      tagName: 'div',
      classes: ['popup__inner'],
    });
    this.node.append(this.popupInner.node);
  }
}

export default Popup;
