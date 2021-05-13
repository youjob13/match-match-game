class BaseControl {
  node: HTMLElement;

  constructor(controlObj: {
    tagName: string;
    classes: string[];
    text?: string;
  }) {
    const elem = document.createElement(controlObj.tagName);
    elem.classList.add(...controlObj.classes);
    elem.textContent = controlObj.text || '';
    this.node = elem;
  }
}

export default BaseControl;
