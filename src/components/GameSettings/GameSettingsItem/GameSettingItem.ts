import BaseControl from '../../shared/BaseControl/BaseControl';
import { IBaseControl } from '../../shared/interfaces/base-control-model';

class GameSettingItem extends BaseControl {
  select: IBaseControl | any;

  title: string;

  options: string[];

  type: string;

  private typeSetting: string;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    props: { title: string; options: string[]; type: string },
    private changeGameSettings: (typeSetting: string, settings: string) => void
  ) {
    super(propsToBaseControl);
    this.select = new BaseControl({
      tagName: 'select',
      classes: ['game-settings__item-select'],
      attributes: { type: 'text' },
    });
    this.options = props.options;
    this.title = props.title;
    this.type = props.type;
    this.typeSetting = props.type;
    this.init();
  }

  private selectOnChange(): void {
    const selectedSetting: string = this.select.node.value;
    this.changeGameSettings(this.typeSetting, selectedSetting);
  }

  private init(): void {
    this.eventListeners();
    this.render();
  }

  private eventListeners(): void {
    this.select.node.addEventListener('change', this.selectOnChange.bind(this));
  }

  protected render(): void {
    const title = new BaseControl({
      tagName: 'h4',
      classes: ['game-settings__item-title'],
      text: this.title,
    });

    this.options.forEach((option) => {
      const newOption = new BaseControl({
        tagName: 'option',
        classes: ['game-settings__item-option'],
        attributes: { value: option },
        text: option,
      });
      this.select.node.append(newOption.node);
    });

    this.node.append(title.node, this.select.node);
  }
}

export default GameSettingItem;
