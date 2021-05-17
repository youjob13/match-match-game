import './gameSettings.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../HOC/Container';
import { ISetting } from '../shared/interfaces/setting-model';
import GameSettingItem from './GameSettingsItem/GameSettingItem';
import { IGameService } from '../services/GameService';

class GameSettings extends BaseControl {
  settings: Array<ISetting>;

  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    private gameService: IGameService
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

  private changeGameSetting = (typeSetting: string, setting: string): void => {
    this.gameService.changeSettings(typeSetting, setting);
  };

  private setCategory(): void {
    this.settings[0].options.push('select game cards type');
    this.gameService.categories.forEach((category) => {
      this.settings[0].options.push(category);
    });
  }

  private async init(): Promise<void> {
    await this.gameService.getData();
    this.setCategory();
    this.render();
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
        this.changeGameSetting
      );
      wrapper.append(newSetting.node);
    });
  }
}

export default GameSettings;
