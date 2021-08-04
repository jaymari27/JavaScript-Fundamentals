import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // Finding out which button is pressed
      const btn = e.target.closest('.btn--inline');
      //console.log('btn ', btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      //console.log("goToPage",goToPage);
      handler(goToPage);
    });
  }

  // Our webpages need this method in order to display their contents
  _generateMarkup() {
    const curPage = this._data.page;
    // Computating number of pages to determine if the button needs to be displayed
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //console.log('numpages', numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    // Page 1, no other pages
    if (curPage === numPages && numPages < 1) return `last page`;

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
    return ``;
  }
}

export default new PaginationView();
