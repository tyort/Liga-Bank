import AbstractSmartComponent from './abstract-smart-component.js';

const pointersNumbers = [`first`, `second`, `third`, `forth`];
const pointersNames = [`Вклады`, `Кредиты`, `Страхование`, `Онлайн-сервисы`];

const getCheckedSlickSlide = (element) => {
  const pageOffersMenu = document.querySelector(`.page-offers-menu`);

  switch (element) {
    case `menu__nav-item-first`:
      return pageOffersMenu.querySelector(`#slick-slide-control00`);
    case `menu__nav-item-second`:
      return pageOffersMenu.querySelector(`#slick-slide-control01`);
    case `menu__nav-item-third`:
      return pageOffersMenu.querySelector(`#slick-slide-control02`);
    case `menu__nav-item-forth`:
      return pageOffersMenu.querySelector(`#slick-slide-control03`);
    case 0:
      return pageOffersMenu.querySelector(`.menu__nav-item-first`);
    case 1:
      return pageOffersMenu.querySelector(`.menu__nav-item-second`);
    case 2:
      return pageOffersMenu.querySelector(`.menu__nav-item-third`);
    case 3:
      return pageOffersMenu.querySelector(`.menu__nav-item-forth`);
    default:
      return null;
  }
};

const createButtons = () => {
  return pointersNumbers
      .map((item, index) => {
        const isElementChecked = index === 0 ? `#F6F7FF` : ``;
        return (
          `<button class="menu__nav-item-${item}" style="background: ${isElementChecked}">${pointersNames[index]}</button>`
        );
      })
      .join(``);
};

const createOffersMenuTemplate = () => {
  return (
    `<div class="page-offers-menu">
      <div class="page-offers-menu__nav">
        ${createButtons()}
      </div>

      <div class="page-offers__slider">

        <div class="page-offers-item__view first-item">
          <div class="page-offers-item__view-inner">
            <div class="page-offers__service-description">
              <h3 class="page-offers__service-title">
                Вклады Лига Банка &ndash; это выгодная</br>инвестиция в свое будущее
              </h3>
              <ul class="page-offers__service-advantages">
                <li>Проценты по вкладам до 7%</li>
                <li>Разнообразные условия</li>
                <li>Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
              </ul>
              <a class="page-offers__service-btn" href="#">Узнать подробнее</a>
            </div>
            <div class="page-offers__service-photo piggy-pic">
              <img src="img/piggybank.svg" alt="piggybank">
            </div>
          </div>
        </div>

        <div class="page-offers-item__view second-item">
          <div class="page-offers-item__view-inner">
            <div class="page-offers__service-description">
              <h3 class="page-offers__service-title">
                Лига Банк выдает кредиты</br>под любые цели
              </h3>
              <ul class="page-offers__service-advantages">
                <li>Ипотечный кредит</li>
                <li>Автокредит</li>
                <li>Потребительский кредит</li>
              </ul>
              <div class="page-offers__service-link">
                <p>Рассчитайте ежемесячный платеж</p>
                <p>и ставку по кредиту воспользовавшись</p>
                <p>нашим <a href="#page-calculator">кредитным калькулятором</a></p>
              </div>
            </div>
            <div class="page-offers__service-photo car-pic">
              <img class="car-on-coins" src="img/car.svg" alt="car">
            </div>
          </div>
        </div>

        <div class="page-offers-item__view third-item">
          <div class="page-offers-item__view-inner">
            <div class="page-offers__service-description">
              <h3 class="page-offers__service-title">
                Лига Страхование &ndash; застрахуем</br>все что захотите
              </h3>
              <ul class="page-offers__service-advantages">
                <li>Автомобильное страхование</li>
                <li>Страхование жизни и здоровья</li>
                <li>Страхование недвижимости</li>
              </ul>
              <a class="page-offers__service-btn" href="#">Узнать подробнее</a>
            </div>
            <div class="page-offers__service-photo">
              <img class="lock-love" src="img/lock.svg" alt="lock">
            </div>
          </div>
        </div>

        <div class="page-offers-item__view forth-item">
          <div class="page-offers-item__view-inner">
            <div class="page-offers__service-description">
              <h3 class="page-offers__service-title">
                Лига Банк &ndash; это огромное количество онлайн-сервисов для вашего удобства
              </h3>
              <ul class="page-offers__service-advantages">
                <li>Мобильный банк,</br>который всегда под рукой</li>
                <li>Приложение Лига-проездной позволит вам оплачивать билеты по всему миру</li>
              </ul>
              <a class="page-offers__service-btn" href="#">Узнать подробнее</a>
            </div>
            <div class="page-offers__service-photo">
              <img class="device-mobile" src="img/device.svg" alt="device">
            </div>
          </div>
        </div>

      </div>
      
    </div>`);
};


export default class OffersMenu extends AbstractSmartComponent {
  constructor() {
    super();
    this._getInitSlider();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createOffersMenuTemplate();
  }

  _getInitSlider() {
    window.$(document).ready(() => {
      window.$(`.page-offers__slider`).slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
      });

      window.$(`.page-offers__slider`).on(`afterChange`, function (event, slick, currentSlide) {
        getCheckedSlickSlide(currentSlide).click();
      });
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.page-offers-menu__nav`)
        .addEventListener(`click`, (evt) => {
          const neededElement = evt.target.tagName === `P` ? evt.target.parentElement : evt.target;

          if (getCheckedSlickSlide(neededElement.className.trim()) !== null) {
            getCheckedSlickSlide(neededElement.className.trim()).click();

            Array.from(document.querySelector(`.page-offers-menu__nav`).children)
                .forEach((it) => {
                  it.style.backgroundColor = `white`;
                });

            neededElement.style.backgroundColor = `#F6F7FF`;
          }
        });
  }
}

