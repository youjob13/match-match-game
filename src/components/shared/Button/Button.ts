import BaseControl, { IAttr } from '../BaseControl/BaseControl';
import './button.scss';

class Button extends BaseControl {
  constructor(
    propsToBaseControl: {
      tagName: string;
      classes: string[];
      text?: string;
      attributes?: IAttr;
    },
    private eventCallback: () => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('click', this.handleEvent.bind(this));
  }

  private handleEvent(): void {
    this.eventCallback();
  }
}

export default Button;
