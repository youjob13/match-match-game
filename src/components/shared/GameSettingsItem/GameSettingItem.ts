import BaseControl from '../BaseControl/BaseControl';

class GameSettingItem extends BaseControl {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    readonly title: string,
    readonly options: string[]
  ) {
    super(propsToBaseControl);
  }

  protected render() {
    const title = new BaseControl({
      tagName: 'h4',
      classes: ['game-settings__item-title'],
      text: this.title,
    });
    const select = new BaseControl({
      tagName: 'select',
      classes: ['game-settings__item-select'],
    });
    this.options.forEach((option) => {
      const newOption = new BaseControl({
        tagName: 'option',
        classes: ['game-settings__item-option'],
        text: option,
      });
      select.node.append(newOption.node);
    });

    this.node.append(title.node, select.node);
  }
}

export default GameSettingItem;
