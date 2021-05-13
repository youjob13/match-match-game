import './aboutGameItem.scss';

import BaseControl from '../../../BaseControl/BaseControl';

class AboutGameItem extends BaseControl {
  image: string;

  text: string;

  constructor(props: {
    tagName: string;
    classes: string[];
    text: string;
    image: string;
  }) {
    super({ tagName: props.tagName, classes: props.classes });
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
    });
    img.node.setAttribute('src', this.image);
    img.node.setAttribute('alt', '');
    const text = new BaseControl({
      tagName: 'figcaption',
      classes: ['about-game__item-text'],
      text: this.text,
    });
    figure.node.append(text.node, img.node);
  }
}

export default AboutGameItem;
