import './button.scss';
import BaseControl from '../BaseControl/BaseControl';

class Button extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[]; text?: string },
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
