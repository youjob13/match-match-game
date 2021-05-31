import BaseControl from '../BaseControl/BaseControl';
import { IAttr, IPropsToBaseControl } from '../interfaces/api';
import './button.scss';

class Button extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private onBtnClick: () => void
  ) {
    super(propsToBaseControl);
    this.node.onclick = () => this.onBtnClick();
  }
}

export default Button;
