class BaseControl {
  node: HTMLElement;

  constructor(tagName: string, classes: string[], text?: string) {
    const elem = document.createElement(tagName);
    elem.classList.add(...classes);
    elem.textContent = text || '';
    this.node = elem;
  }
}

export default BaseControl;
