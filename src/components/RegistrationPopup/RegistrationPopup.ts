import './registrationPopup.scss';
import BaseControl from '../shared/BaseControl/BaseControl';
import Input from '../shared/Input/Input';
import Popup from '../shared/Popup/Popup';
import Button from '../shared/Button/Button';
import { IRegistrationService } from '../shared/interfaces/registration-service-model';

class RegistrationPopup extends Popup {
  private addUserBtn: Button;

  constructor(
    private registrationService: IRegistrationService,
    private renderHeader: () => void
  ) {
    super({ tagName: 'div', classes: ['popup'] });
    this.addUserBtn = new Button(
      {
        tagName: 'button',
        classes: ['popup-registr__button', 'button', 'button__filled'],
        text: 'Add user',
      },
      this.onAddUserBtnClick
    );
    this.render();
  }

  private handleInput = (
    value: string,
    name: string,
    validationRes?: boolean
  ): void => {
    this.registrationService.changeValue(value, name);

    if (validationRes !== undefined) {
      if (!validationRes) {
        this.addUserBtn.node.setAttribute('disabled', 'disabled');
        this.addUserBtn.node.style.backgroundColor = 'gray';
      } else {
        this.addUserBtn.node.removeAttribute('disabled');
        this.addUserBtn.node.style.backgroundColor = '';
      }
    }
  };

  private onAddUserBtnClick = (): void => {
    this.registrationService.sendData();
    this.closePopup();
    this.renderHeader(); // TODO: think about
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
    const title = new BaseControl<HTMLElement>({
      tagName: 'h3',
      classes: ['popup-registr__title'],
      text: 'Registr new Player',
    });

    const inputsValue = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['popup-registr__inputs'],
    });

    const form = new BaseControl<HTMLElement>({
      tagName: 'form',
      classes: ['popup-registr__form'],
    });

    const userImage = new BaseControl<HTMLElement>({
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

    const inputsWrapper = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['popup-registr__inputs-wrapper'],
    });

    const labelFirstName = new BaseControl<HTMLElement>({
      tagName: 'label',
      classes: ['popup-registr__label'],
      text: 'First Name',
    });
    const inputFirstName = new Input(
      {
        tagName: 'input',
        classes: ['input'],
        attributes: {
          type: 'text',
          placeholder: 'Your first name',
          name: 'firstName',
          value: '',
          maxLength: 30,
        },
      },
      this.handleInput.bind(this),
      { exp: '[a-zA-Z№]+' }
    );
    const validateIndicatorFirstName = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['validate-indicator'],
    });

    const labelLastName = new BaseControl<HTMLElement>({
      tagName: 'label',
      classes: ['popup-registr__label'],
      text: 'Last Name',
    });
    const inputLastName = new Input(
      {
        tagName: 'input',
        classes: ['input'],
        attributes: {
          type: 'text',
          placeholder: 'Your last name',
          name: 'lastName',
          value: '',
          maxLength: 30,
        },
      },
      this.handleInput.bind(this),
      { exp: '[a-zA-Z№]+' }
    );
    const validateIndicatorLastName = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['validate-indicator'],
    });

    const labelEmail = new BaseControl<HTMLElement>({
      tagName: 'label',
      classes: ['popup-registr__label'],
      text: 'E-mail',
    });
    const inputEmail = new Input(
      {
        tagName: 'input',
        classes: ['input'],
        attributes: {
          type: 'email',
          placeholder: 'Your e-mail',
          name: 'email',
          value: '',
          maxLength: 30,
        },
      },
      this.handleInput.bind(this),
      { exp: '^.+@[a-zA-z]+\\.[a-z]{2,3}' }
    );
    const validateIndicatorEmail = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['validate-indicator'],
    });

    const buttonsWrapper = new BaseControl<HTMLElement>({
      tagName: 'div',
      classes: ['popup-registr__buttons-wrapper'],
    });

    const cancelBtn = new Button(
      {
        tagName: 'button',
        classes: ['popup-registr__button', 'button'],
        text: 'Cancel',
      },
      this.closePopup.bind(this)
    );

    labelFirstName.node.append(
      inputFirstName.node,
      validateIndicatorFirstName.node
    );
    labelLastName.node.append(
      inputLastName.node,
      validateIndicatorLastName.node
    );
    labelEmail.node.append(inputEmail.node, validateIndicatorEmail.node);
    inputsWrapper.node.append(
      labelFirstName.node,
      labelLastName.node,
      labelEmail.node
    );
    inputsValue.node.append(inputsWrapper.node, userImage.node);
    buttonsWrapper.node.append(this.addUserBtn.node, cancelBtn.node);
    form.node.append(inputsValue.node, buttonsWrapper.node);
    this.popupInner.node.append(title.node, form.node);
  }
}

export default RegistrationPopup;
