import './aboutGameItem.scss';

import BaseControl from '../../../shared/BaseControl/BaseControl';

class AboutGameItem extends BaseControl<HTMLElement> {
  image: string;

  text: string;

  constructor(
    propsToBaseControl: {
      tagName: string;
      classes: string[];
    },
    props: { text: string; image: string }
  ) {
    super({
      tagName: propsToBaseControl.tagName,
      classes: propsToBaseControl.classes,
    });
    this.image = props.image;
    this.text = props.text;
    this.render();
  }

  render(): void {
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
