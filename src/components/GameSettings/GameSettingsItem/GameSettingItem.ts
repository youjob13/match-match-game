import BaseControl from '../../shared/BaseControl/BaseControl';
import { IBaseControl } from '../../shared/interfaces/base-control-model';

class GameSettingItem extends BaseControl<HTMLElement> {
  private select: IBaseControl<HTMLInputElement>;

  private title: string;

  private options: string[];

  private typeSetting: string;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    props: { title: string; options: string[]; type: string },
    private changeGameSettings: (typeSetting: string, settings: string) => void
  ) {
    super(propsToBaseControl);
    this.select = new BaseControl<HTMLInputElement>({
      tagName: 'select',
      classes: ['game-settings__item-select'],
      attributes: { type: 'text' },
    });
    this.select.node.addEventListener('change', this.handleChange.bind(this));
    this.options = props.options;
    this.title = props.title;
    this.typeSetting = props.type;
    this.render();
  }

  private handleChange(): void {
    const selectedSetting: string = this.select.node.value;
    this.changeGameSettings(this.typeSetting, selectedSetting);
  }

  private render(): void {
    const title = new BaseControl<HTMLElement>({
      tagName: 'h4',
      classes: ['game-settings__item-title'],
      text: this.title,
    });

    this.options.forEach((option) => {
      const newOption = new BaseControl<HTMLElement>({
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
