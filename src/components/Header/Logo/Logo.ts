import './logo.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';

class Logo extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: {
      tagName: string;
      classes: string[];
    },
    private changeCurrentPage: (path: string) => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('click', this.handleClick.bind(this));
    this.render();
  }

  private handleClick = (): void => {
    this.changeCurrentPage('');
  };

  private render(): void {
    const spanUp = new BaseControl<HTMLElement>({
      tagName: 'span',
      classes: ['logo__up'],
      text: 'Match',
    });

    const spanDown = new BaseControl<HTMLElement>({
      tagName: 'span',
      classes: ['logo__down'],
      text: 'Match',
    });

    this.node.append(spanUp.node, spanDown.node);
  }
}

export default Logo;
