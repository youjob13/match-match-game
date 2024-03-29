import { IPropsToBaseControl, ISettings } from '../shared/interfaces/api';
import './gameSettings.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import ContainerWrapper from '../shared/HOC/Container';
import GameSettingItem from './GameSettingsItem/GameSettingItem';

import { IGameService } from '../shared/interfaces/game-service-model';

class GameSettings extends BaseControl<HTMLElement> {
  private settings: ISettings[];

  constructor(
    propsToBaseControl: IPropsToBaseControl,
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
    await this.gameService.configureGameSettings();
    this.setCategory();
    this.render();
  }

  private render(): void {
    const wrapper = ContainerWrapper(this.node);

    this.settings.forEach((settingItem) => {
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
