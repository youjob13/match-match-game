import { IPropsToBaseControl } from '../../shared/interfaces/api';
import './logo.scss';
import BaseControl from '../../shared/BaseControl/BaseControl';

class Logo extends BaseControl<HTMLElement> {
  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private changeCurrentPage: (path: string) => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('click', this.onLogoClick.bind(this));
    this.render();
  }

  private onLogoClick = (): void => {
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
