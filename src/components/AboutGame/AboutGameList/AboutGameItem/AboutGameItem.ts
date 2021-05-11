import './aboutGameItem.scss';

import BaseControl from '../../../BaseControl/BaseControl';

class AboutGameItem extends BaseControl {
  image:string;

  text:string;

  constructor(tagName: string, classes: string[], text:string, image:string) {
    super(tagName, classes);
    this.image = image;
    this.text = text;
    this.init();
  }

  init():void {
    const figure = new BaseControl('figure', ['about-game__item-inner']);
    this.node.append(figure.node);
    const img = new BaseControl('img', ['about-game__item-img']);
    img.node.setAttribute('src', this.image);
    img.node.setAttribute('alt', '');
    const text = new BaseControl('figcaption', ['about-game__item-text'], this.text);
    figure.node.append(text.node, img.node);
  }
}

export default AboutGameItem;
