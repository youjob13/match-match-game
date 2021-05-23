import './input.scss';
import BaseControl, { IAttr } from '../BaseControl/BaseControl';

interface IRegExp {
  exp: string;
  flags?: string;
}

class Input extends BaseControl {
  constructor(
    private propsToBaseControl: {
      tagName: string;
      classes: string[];
      attributes: IAttr;
    },
    private inputCallback?: (value: string, type: string) => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('input', this.handleInput.bind(this));
  }

  private validate(value: string, regExp: IRegExp, mode = false): void {
    if (!mode)
      this.node.value =
        value.replace(new RegExp(regExp.exp, regExp.flags), '') || '';

    this.node.value =
      value.match(new RegExp(regExp.exp, regExp.flags))?.join('') || '';
    if (this.node.value.length) {
      this.node.classList.add('valid');
    } else {
      this.node.classList.remove('valid');
    }
    // this.node.value.length ? this.node.classList.add('valid') : this.node.classList.remove('valid');
  }

  private handleInput(): void {
    this.validate(this.node.value, { exp: '[a-zA-Z\\s]+' }, true);

    if (this.inputCallback)
      this.inputCallback(
        this.node.value,
        this.propsToBaseControl.attributes.name || 'undefined'
      ); // TODO: decide problem
  }
}

export default Input;
