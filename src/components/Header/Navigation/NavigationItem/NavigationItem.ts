import BaseControl from '../../../BaseControl/BaseControl';

class NavigationItem extends BaseControl {
  protected icon: string;

  protected text: string;

  protected path: string;

  constructor(props: {
    tagName: string;
    classes: string[];
    text: string;
    iconUrl: string;
    path: string;
  }) {
    super({ tagName: props.tagName, classes: props.classes });
    this.icon = props.iconUrl;
    this.text = props.text;
    this.path = props.path;
    this.init();
  }

  init(): void {
    this.render();
  }

  render(): void {
    const navPath = new BaseControl({
      tagName: 'a',
      classes: ['navigation__link'],
    });
    navPath.node.setAttribute('href', `#${this.path}`);
    this.node.append(navPath.node);

    const icon = new BaseControl({
      tagName: 'img',
      classes: ['navigation__icon'],
    });
    icon.node.setAttribute('src', this.icon);
    navPath.node.append(icon.node);

    const navText = new BaseControl({
      tagName: 'p',
      classes: ['navigation__text'],
      text: this.text,
    });
    navPath.node.append(navText.node);
  }
}

export default NavigationItem;
