import './input.scss';
import BaseControl, { IAttr } from '../BaseControl/BaseControl';

interface IRegExp {
  exp: string;
  flags?: string;
}

class Input extends BaseControl<HTMLInputElement> {
  constructor(
    private propsToBaseControl: {
      tagName: string;
      classes: string[];
      attributes: IAttr;
    },
    private inputCallback?: (
      value: string,
      type: string,
      validationRes?: boolean
    ) => void,
    private regExp?: IRegExp
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('input', this.handleInput.bind(this));
  }

  private validate(value: string, regExp: IRegExp): boolean {
    const validationRes = new RegExp(regExp.exp, regExp.flags).test(value);
    this.node.value = value.replace(/\s+/gi, '');

    if (validationRes && this.node.value.length <= 30) {
      this.node.classList.remove('no-valid');
      this.node.classList.add('valid');
    } else {
      this.node.classList.remove('valid');
      this.node.classList.add('no-valid');
    }

    return validationRes;
  }

  private handleInput(): void {
    let validationRes;
    if (this.regExp)
      validationRes = this.validate(this.node.value, this.regExp);

    if (this.inputCallback)
      this.inputCallback(
        this.node.value,
        this.propsToBaseControl.attributes.name || 'undefined',
        validationRes
      ); // TODO: decide problem
  }
}

export default Input;
