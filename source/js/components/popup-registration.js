import AbstractSmartComponent from './abstract-smart-component.js';

const createPopupTemplate = (options = {}) => {
  const {isPopupHidden} = options;
  const isElementHidden = isPopupHidden ? `visually-hidden` : ``;

  return (`<div class="popup-registration ${isElementHidden}">
            <div class="popup-registration__body">
              <div class="popup-registration__content">
                <div class="popup-registration__content-header">
                  <img src="img/reglogo.svg" alt="ЛИГА Банк" width="150" height="27">
                  <a href="#" class="popup-registration__close"></a>
                </div>
                <form class="popup-registration__form">
                  <fieldset class="field--login__field">
                    <label for="block-login">Логин</label>
                    <input 
                      class="field--login__input"
                      type="text"
                      name="login"
                      value=""
                      id="block-login"
                      placeholder="Login"
                      autocomplete="off"
                      autofocus
                      required
                    />
                  </fieldset>
                  <fieldset class="field--password__field">
                    <label for="block-password">Пароль</label>
                    <input 
                      class="field--password__input"
                      type="password"
                      name="password"
                      value=""
                      id="block-password"
                      placeholder="Password"
                      autocomplete="off"
                      required
                    />
                  </fieldset>
                  <button class="popup-registration__btn" type="submit">Войти</button>
                </form>
              </div>
            </div>
          </div>`);
};

export default class Popup extends AbstractSmartComponent {
  constructor() {
    super();
    this.isPopupHidden = true;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createPopupTemplate({
      isPopupHidden: this.isPopupHidden
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reRender(request) {
    this.isPopupHidden = request.isPopupHidden;
    super.reRender();
    this.recoveryListeners();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    document.addEventListener(`keydown`, this._onEscKeyDown);

    element.querySelector(`.popup-registration__close`)
        .addEventListener(`click`, () => {
          this.reRender({isPopupHidden: true});
        });
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.reRender({isPopupHidden: true});
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}