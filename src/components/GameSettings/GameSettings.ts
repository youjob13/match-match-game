import './gameSettings.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import Setting from './settings/Setting';
import { ISetting } from '../shared/interfaces/setting-model';
import getCards from '../api/CardsApi';
import { ICardsJSON } from '../shared/interfaces/card-model-json';

class GameSettings extends BaseControl {
  settings: Array<ISetting>;

  constructor(propsToBaseControl: { tagName: string; classes: string[] }) {
    super(propsToBaseControl);
    this.settings = [
      {
        settingName: 'category',
        options: ['select game cards type', 'animal'],
        title: 'Game cards',
      },
      {
        settingName: 'difficulty',
        options: ['select game type', '2 ✕ 2', '4 ✕ 4', '8 ✕ 8'],
        title: 'Difficulty',
      },
    ];
    this.init();
  }

  // async getCategories(): Promise<void> {
  //   const cards: Array<ICardsJSON> = await getCards();
  // }

  private init() {
    const wrapper = ContainerWrapper(this.node);

    this.settings.forEach((settingItem: ISetting) => {
      const newSetting = new Setting(
        {
          tagName: 'div',
          classes: ['game-settings__item'],
        },
        {
          title: settingItem.title,
          options: settingItem.options,
        }
      );
      wrapper.append(newSetting.node);
    });
  }
}

export default GameSettings;
