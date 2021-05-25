import BaseControl from '../../../shared/BaseControl/BaseControl';
import Button from '../../../shared/Button/Button';

class NavigationItem extends BaseControl<HTMLElement> {
  private icon: string;

  private text: string;

  private path: string;

  constructor(
    props: {
      tagName: string;
      classes: string[];
      text: string;
      iconUrl: string;
      path: string;
    },
    private readonly goToPage: (path: string) => void
  ) {
    super({
      tagName: props.tagName,
      classes: props.classes,
    });
    this.text = props.text;
    this.icon = props.iconUrl;
    this.path = props.path;
    this.render();
  }

  private handleClick = (): void => {
    this.node.classList.add('active');
    this.goToPage(this.path);
  };

  private render(): void {
    const navPath = new Button(
      {
        tagName: 'a',
        classes: ['navigation__link'],
      },
      this.handleClick
    );

    const icon = new BaseControl<HTMLElement>({
      tagName: 'img',
      classes: ['navigation__icon'],
      attributes: { src: this.icon },
    });

    const navText = new BaseControl<HTMLElement>({
      tagName: 'p',
      classes: ['navigation__text'],
      text: this.text,
    });

    navPath.node.append(icon.node, navText.node);
    this.node.append(navPath.node);
  }
}

export default NavigationItem;
