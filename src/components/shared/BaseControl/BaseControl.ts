// TODO: recast
export interface IAttr {
  href?: string;
  src?: unknown;
  alt?: string;
  placeholder?: string;
  type?: string;
  name?: string;
}

class BaseControl {
  readonly node: HTMLInputElement | HTMLElement;

  constructor(controlSettings: {
    tagName: string;
    classes: string[];
    text?: string;
    attributes?: IAttr;
  }) {
    const elem = document.createElement(controlSettings.tagName);
    elem.classList.add(...controlSettings.classes);
    elem.textContent = controlSettings.text || '';
    const keys = Object.keys(controlSettings.attributes || []);
    const values = Object.values(controlSettings.attributes || []);
    keys.forEach((key, index) => elem.setAttribute(key, `${values[index]}`));

    this.node = elem;
  }
}

export default BaseControl;
