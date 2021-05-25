import BaseControl, { IAttr } from '../BaseControl/BaseControl';
import './button.scss';

class Button extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: {
      tagName: string;
      classes: string[];
      text?: string;
      attributes?: IAttr;
    },
    private onBtnClick: () => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(): void {
    this.onBtnClick();
  }
}

export default Button;
