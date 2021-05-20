import { IBaseControl } from '../../shared/interfaces/base-control-model';
import BaseControl from '../../shared/BaseControl/BaseControl';
// TODO: refactor code
class GameSettingItem extends BaseControl {
  select: any | IBaseControl; // TODO: remove any

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
    });
    this.options = props.options;
    this.title = props.title;
    this.type = props.type;
    this.typeSetting = props.type;
    this.init();
  }

  selectOnChange(): void {
    const selectedSetting: string = this.select.node.value;
    this.changeGameSettings(this.typeSetting, selectedSetting);
  }

  private init(): void {
    this.render();
  }

  protected render(): void {
    const title = new BaseControl({
      tagName: 'h4',
      classes: ['game-settings__item-title'],
      text: this.title,
    });

    this.select.node.addEventListener('change', this.selectOnChange.bind(this));

    this.options.forEach((option) => {
      const newOption = new BaseControl({
        tagName: 'option',
        classes: ['game-settings__item-option'],
        text: option,
      });
      this.select.node.append(newOption.node);
    });

    this.node.append(title.node, this.select.node);
  }
}

export default GameSettingItem;
