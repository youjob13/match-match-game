import { IPropsToBaseControl, IBaseControl } from '../../shared/interfaces/api';
import BaseControl from '../../shared/BaseControl/BaseControl';
import InputFile from './InputFile/InputFile';
import { IRegistrationService } from '../../shared/interfaces/registration-service-model';

class UserAvatar extends BaseControl<HTMLElement> {
  private userImage: IBaseControl<HTMLElement>;

  constructor(
    propsToBaseControl: IPropsToBaseControl,
    private registrationService: IRegistrationService
  ) {
    super(propsToBaseControl);
    this.userImage = new BaseControl<HTMLElement>({
      tagName: 'img',
      classes: ['popup-registr__img'],
      attributes: { src: 'user_image_default.png', alt: '' },
    });
    this.render();
  }

  private handleInputFile = (dataURL: string, name: string) => {
    this.registrationService.changeValue(dataURL, name);
    this.userImage.node.setAttribute('src', dataURL);
  };

  private render(): void {
    const userAvatar = new InputFile(
      {
        tagName: 'input',
        classes: ['input_file'],
        attributes: { type: 'file', name: 'userImage' },
      },
      this.handleInputFile
    );
    this.node.append(userAvatar.node, this.userImage.node);
  }
}

export default UserAvatar;
