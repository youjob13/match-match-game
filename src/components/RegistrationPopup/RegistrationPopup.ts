import './registrationPopup.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import Input from '../shared/Input/Input';
import Popup from '../shared/Popup/Popup';
import Button from '../shared/Button/Button';
import { IRegistrationService } from '../shared/interfaces/registration-service-model';

class RegistrationPopup extends Popup {
  constructor(
    private registrationService: IRegistrationService,
    private rerender: () => void
  ) {
    super({ tagName: 'div', classes: ['popup'] });
    this.render();
  }

  private handleInput = (value: string, name: string): void => {
    this.registrationService.changeValue(value, name);
  };

  private onAddUserBtnClick = (): void => {
    this.registrationService.sendData();
    this.closePopup();
    this.rerender(); // TODO: think about
  };

  private closePopup() {
    this.node.remove();
  }

  // private loadImage = (): void => {
  //   let f = inputImage.files[0];
  //   if (f) {
  //     userImage.src = URL.createObjectURL(f);
  //     localStorage.setItem('myImage', userImage.src);
  //   }
  // }

  private render() {
    const title = new BaseControl({
      tagName: 'h3',
      classes: ['popup-registr__title'],
      text: 'Registr new Player',
    });

    const form = new BaseControl({
      tagName: 'form',
      classes: ['popup-registr__form'],
    });

    const userImage = new BaseControl({
      tagName: 'img',
      classes: ['popup-registr__img'],
      attributes: { src: 'user_image_default.png', alt: '' },
    });
    // const inputImage = new Input(
    //   {
    //     tagName: 'input',
    //     classes: ['popup-registr__input'],
    //     attributes: { type: 'file', name: 'userImage' },
    //   },
    //   this.handleInput.bind(this)
    // );

    const inputsWrapper = new BaseControl({
      tagName: 'div',
      classes: ['popup-registr__inputs-wrapper'],
    });

    const labelFirstName = new BaseControl({
      tagName: 'label',
      classes: ['popup-registr__label'],
      text: 'First Name',
    });
    const inputFirstName = new Input(
      {
        tagName: 'input',
        classes: ['popup-registr__input'],
        attributes: {
          type: 'text',
          placeholder: 'Your first name',
          name: 'firstName',
          value: '',
        },
      },
      this.handleInput.bind(this)
    );

    const labelLastName = new BaseControl({
      tagName: 'label',
      classes: ['popup-registr__label'],
      text: 'Last Name',
    });
    const inputLastName = new Input(
      {
        tagName: 'input',
        classes: ['popup-registr__input'],
        attributes: {
          type: 'text',
          placeholder: 'Your last name',
          name: 'lastName',
          value: '',
        },
      },
      this.handleInput.bind(this)
    );

    const labelEmail = new BaseControl({
      tagName: 'label',
      classes: ['popup-registr__label'],
      text: 'E-mail',
    });
    const inputEmail = new Input(
      {
        tagName: 'input',
        classes: ['popup-registr__input'],
        attributes: {
          type: 'email',
          placeholder: 'Your e-mail',
          name: 'email',
          value: '',
        },
      },
      this.handleInput.bind(this)
    );

    const buttonsWrapper = new BaseControl({
      tagName: 'div',
      classes: ['popup-registr__buttons-wrapper'],
    });

    const addUserBtn = new Button(
      {
        tagName: 'button',
        classes: ['popup-registr__button', 'button', 'button__filled'],
        text: 'Add user',
      },
      this.onAddUserBtnClick
    );
    const cancelBtn = new Button(
      {
        tagName: 'button',
        classes: ['popup-registr__button', 'button'],
        text: 'Cancel',
      },
      this.closePopup.bind(this)
    );

    labelFirstName.node.append(inputFirstName.node);
    labelLastName.node.append(inputLastName.node);
    labelEmail.node.append(inputEmail.node);
    inputsWrapper.node.append(
      labelFirstName.node,
      labelLastName.node,
      labelEmail.node
    );
    form.node.append(inputsWrapper.node, userImage.node);
    buttonsWrapper.node.append(addUserBtn.node, cancelBtn.node);
    this.popupInner.node.append(title.node, form.node, buttonsWrapper.node);
  }
}

export default RegistrationPopup;
