import BaseControl from '../../../shared/BaseControl/BaseControl';

class NavigationItem extends BaseControl {
  private icon: string;

  private text: string;

  private path: string;

  constructor(
    propsToBaseControl: {
      tagName: string;
      classes: string[];
      text: string;
    },
    settings: { iconUrl: string; path: string }
  ) {
    super({
      tagName: propsToBaseControl.tagName,
      classes: propsToBaseControl.classes,
    });
    this.text = propsToBaseControl.text;
    this.icon = settings.iconUrl;
    this.path = settings.path;
    this.init();
  }

  private init(): void {
    this.render();
  }

  private render(): void {
    const navPath = new BaseControl({
      tagName: 'a',
      classes: ['navigation__link'],
      attributes: { href: `#${this.path}` }, // TODO: check on
    });

    const icon = new BaseControl({
      tagName: 'img',
      classes: ['navigation__icon'],
      attributes: { src: this.icon },
    });

    const navText = new BaseControl({
      tagName: 'p',
      classes: ['navigation__text'],
      text: this.text,
    });

    navPath.node.append(icon.node, navText.node);
    this.node.append(navPath.node);
  }
}

export default NavigationItem;
