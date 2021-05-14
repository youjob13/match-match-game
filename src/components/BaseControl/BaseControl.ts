class BaseControl {
  readonly node: HTMLElement;

  constructor(controlSettings: {
    tagName: string;
    classes: string[];
    text?: string;
  }) {
    const elem = document.createElement(controlSettings.tagName);
    elem.classList.add(...controlSettings.classes);
    elem.textContent = controlSettings.text || '';
    this.node = elem;
  }
}

export default BaseControl;
