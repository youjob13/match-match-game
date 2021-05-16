import GameSettingItem from '../../shared/GameSettingsItem/GameSettingItem';

class Setting extends GameSettingItem {
  constructor(
    propsToBaseControl: { tagName: string; classes: string[] },
    props: { title: string; options: string[] }
  ) {
    super(propsToBaseControl, props.title, props.options);
    this.init();
  }

  private init() {
    super.render();
  }
}

export default Setting;
