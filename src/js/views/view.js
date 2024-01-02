// get the icons since we are using Parcel and it takes the icons from the dist
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
      this._data = data;
      const markup = this._generateMarkup();
      // get rid of the old HTML (static one)
      this._clear();
      // insert new HTML (dynamic one)
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  
    _clear() {
      this._parentElement.innerHTML = '';
    }
  
    renderSpinner = function () {
      const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `
      // // setting innerHTML into nothing
      this._clear();
      // setting the spinner to see it while loading
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  
    renderError(msg = this._errorMsg) {
      const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${msg}</p>
            </div>
            `
      // // setting innerHTML into nothing
      this._clear();
      // setting the spinner to see it while loading
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
  
    renderMsg(msg = this._successMsg) {
      const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${msg}</p>
            </div>
            `
      // // setting innerHTML into nothing
      this._clear();
      // setting the spinner to see it while loading
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}