export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    } else {
      this._renderer(this._renderedItems);
    }
  }
}
