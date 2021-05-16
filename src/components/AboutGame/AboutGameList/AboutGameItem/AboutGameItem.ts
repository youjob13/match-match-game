import './aboutGameItem.scss';

import BaseControl from '../../../shared/BaseControl/BaseControl';

class AboutGameItem extends BaseControl {
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
    this.init();
  }

  init(): void {
    this.render();
  }

  render(): void {
    const figure = new BaseControl({
      tagName: 'figure',
      classes: ['about-game__item-inner'],
    });

    this.node.append(figure.node);

    const img = new BaseControl({
      tagName: 'img',
      classes: ['about-game__item-img'],
      attributes: { src: this.image, alt: '' },
    });

    const text = new BaseControl({
      tagName: 'figcaption',
      classes: ['about-game__item-text'],
      text: this.text,
    });

    figure.node.append(text.node, img.node);
  }
}

export default AboutGameItem;
