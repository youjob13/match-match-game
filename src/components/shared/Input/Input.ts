import BaseControl, { IAttr } from '../BaseControl/BaseControl';
import './input.scss';

class Input extends BaseControl {
  constructor(
    private propsToBaseControl: {
      tagName: string;
      classes: string[];
      attributes: IAttr;
    },
    private inputCallback: (value: string, type: string) => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('input', this.handleInput.bind(this));
  }

  private handleInput(): void {
    this.inputCallback(
      this.node.value,
      this.propsToBaseControl.attributes.name || 'undefined'
    ); // TODO: decide problem
  }
}

export default Input;
