import './aboutGameItem.scss';
import BaseControl from '../../../shared/BaseControl/BaseControl';
import { IPropsToBaseControl } from '../../../shared/interfaces/api';

class AboutGameItem extends BaseControl<HTMLElement> {
  private readonly image: string;

  private readonly text: string;

  constructor(
    propsToBaseControl: IPropsToBaseControl,
    props: { text: string; image: string }
  ) {
    super(propsToBaseControl);
    this.image = props.image;
    this.text = props.text;
    this.render();
  }

  private render(): void {
    const figure = new BaseControl<HTMLElement>({
      tagName: 'figure',
      classes: ['about-game__item-inner'],
    });

    const img = new BaseControl<HTMLElement>({
      tagName: 'img',
      classes: ['about-game__item-img'],
      attributes: { src: this.image, alt: '' },
    });

    const text = new BaseControl<HTMLElement>({
      tagName: 'figcaption',
      classes: ['about-game__item-text'],
      text: this.text,
    });

    figure.node.append(text.node, img.node);
    this.node.append(figure.node);
  }
}

export default AboutGameItem;
