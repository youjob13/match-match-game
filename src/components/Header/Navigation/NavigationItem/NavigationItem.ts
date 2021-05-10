import BaseControl from '../../../BaseControl/BaseControl';

class NavigationItem extends BaseControl {
  protected icon:string;

  protected text:string;

  constructor(tagName:string, classes:string[], text:string, iconUrl:string) {
    super(tagName, classes);
    this.icon = iconUrl;
    this.text = text;
    this.create();
  }

  create(): void {
    const navPath = new BaseControl('a', ['navigation__link']);
    navPath.node.setAttribute('href', '##');
    this.node.append(navPath.node);

    const icon = new BaseControl('img', ['navigation__icon']);
    icon.node.setAttribute('src', this.icon);
    navPath.node.append(icon.node);

    const navText = new BaseControl('p', ['navigation__text'], this.text);
    navPath.node.append(navText.node);
  }
}

export default NavigationItem;
