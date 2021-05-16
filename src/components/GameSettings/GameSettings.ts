import './gameSettings.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
// import Setting from './settings/Setting';
import { ISetting } from '../shared/interfaces/setting-model';
import { ICardsJSON } from '../shared/interfaces/card-model-json';
import GameSettingItem from './GameSettingsItem/GameSettingItem';

class GameSettings extends BaseControl {
  settings: Array<ISetting>;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private getData: () => Promise<Array<ICardsJSON>>,
    private changeGameSettings: (typeSetting: string, settings: string) => void
  ) {
    super(propsToBaseControl);
    this.settings = [
      {
        settingName: 'category',
        options: [],
        title: 'Game cards',
      },
      {
        settingName: 'difficulty',
        options: ['select game type', '4 ✕ 4', '6 ✕ 6', '8 ✕ 8'],
        title: 'Difficulty',
      },
    ];
    this.init();
  }

  async getCategories(): Promise<void> {
    const cards: Array<ICardsJSON> = await this.getData();
    await this.setCategory(cards);
  }

  setCategory(cards: Array<ICardsJSON>): void {
    this.settings[0].options.push('select game cards type');
    cards.forEach((cardInfo) => {
      this.settings[0].options.push(cardInfo.category);
    });
  }

  async init(): Promise<void> {
    await this.getCategories();
    await this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    this.settings.forEach((settingItem: ISetting) => {
      const newSetting = new GameSettingItem(
        {
          tagName: 'div',
          classes: ['game-settings__item'],
        },
        {
          type: settingItem.settingName,
          title: settingItem.title,
          options: settingItem.options,
        },
        this.changeGameSettings
      );
      wrapper.append(newSetting.node);
    });
  }
}

export default GameSettings;
