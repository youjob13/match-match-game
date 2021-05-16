// import GameSettingItem from '../../shared/GameSettingsItem/GameSettingItem';

// class Setting extends GameSettingItem {
//   private typeSetting: string;

//   constructor(
//     propsToBaseControl: { tagName: string; classes: string[] },
//     props: { title: string; options: string[]; type: string },
//     protected changeGameSettings: (
//       typeSetting: string,
//       settings: string
//     ) => void
//   ) {
//     super(propsToBaseControl, props.title, props.options);
//     this.typeSetting = props.type;
//     this.init();
//   }

//   selectOnChange(): void {
//     const selectedSetting: string = this.select.node.value;
//     this.changeGameSettings(this.typeSetting, selectedSetting);
//   }

//   private init() {
//     super.render();
//   }
// }

// export default Setting;
