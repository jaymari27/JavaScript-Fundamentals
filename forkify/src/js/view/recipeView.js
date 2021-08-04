import View from './View';

// Importing icons since its only available in local
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We could not find that recipe. Please try another one!`;
  _message = '';

  /// Executing multiple event listeners
  // An example of "Publisher-Subscriber" pattern - the Publisher is the one listening to the event, so in this case it is addHandlerRender. This way we will be able to listen to the event and handle it
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" crossorigin />
            <h1 class="recipe__title">
            <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  this._data.cookingTime
                }</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
                  this._data.servings
                }</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--increase-servings">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings">
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
            </div>

            <div class="recipe__user-generated">
                </div>
                <button class="btn--round">
                <svg class="">
                    <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${this._data.ingredients
                  .map(this._generateMarkupIngredient)
                  .join('')}
            </div>
            <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                this._data.publisher
              }</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this._data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

// Exporting the RecipeView object this way so that other modules won't have access to its contents, just the object. The other modules won't be able to manipulate its contents. No data can be passed to this object.
export default new RecipeView();
