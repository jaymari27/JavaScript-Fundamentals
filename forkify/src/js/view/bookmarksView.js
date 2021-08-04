import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it! :D`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  // this will be called by render()
  _generateMarkup() {
    return (
      this._data
        // the DOM elements are converted to string since the render parameter is set to "false", which returns markup text
        .map(bookmarks => previewView.render(bookmarks, false))
        .join('')
    );
  }
}

export default new BookmarksView();
