const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./css/style.css">
  <div class="window colors-window">
    <div class="icons">
      <svg class="icon icons__save-icon" width="25" height="25" viewBox="0 0 25 25" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M19 9.49323V19H6V6H15.1985L19 9.49323ZM15.5882 5L20 9.05405V20H5V5H15.5882Z" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 15H9V19H16V15ZM8 14V20H17V14H8Z" />
      </svg>
      <svg class="icon icons__close-icon" width="25" height="25" viewBox="0 0 25 25" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="1.06064" height="11.6671" transform="matrix(0.707115 0.707099 -0.707115 0.707099 16.25 8)" />
        <rect width="1.06064" height="11.6671"
          transform="matrix(-0.707114 0.707099 -0.707114 -0.707099 16.9999 16.25)" />
      </svg>
    </div>
    <h2 class="window-name">Таблица цветов</h2>
    <table class="table">
      <tr class="table__row">
        <th class="table__column-heading table__cell">Цвет</th>
        <th class="table__column-heading table__cell">Название</th>
        <th class="table__column-heading table__cell">Тип</th>
        <th class="table__column-heading table__cell">Код</th>
        <th class="table__column-heading table__cell">Изменить</th>
        <th class="table__column-heading table__cell">Удалить</th>
      </tr>
    </table>
    <button class="button" id="add-button">Добавить цвет</button>
  </div>  
`;

export default class ColorTable extends HTMLElement {

  // ------Life Cycles------

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.notesList = [];
  }

  connectedCallback() {

    // Активация окна добавления записи

    const button = this.shadowRoot.querySelector('#add-button');
    button.addEventListener('click', () => {
      document.querySelector('color-picker').classList.add('visible');
    });

    // this.setStorage([]); 

    // Сохранить данные

    const save = this.shadowRoot.querySelector('.icons__save-icon');
    save.addEventListener('click', () => {
      const data = JSON.parse(this.getAttribute('notesList'));
      console.log(data); // []
      this.setStorage(data);
      console.log(this.getStorage());
    });

    // Рендер имеющихся данных

    const storage = this.getStorage();
    console.log(storage);
    this.renderTable(storage);

    this.addEventListenersToButtons();

    this.addDnD();
  }

  disconnectedCallback() {

  }

  attributeChangedCallback(attr, oldValue, newValue) {

    // Рендер данных 

    if (attr === 'noteslist') {
      const list = JSON.parse(this.getAttribute('noteslist'));
      this.renderTable(list);
    }
    this.addEventListenersToButtons();
    this.addDnD();
  }

  // -------Watchers------

  static get observedAttributes() {
    return ['noteslist'];
  }

  // -------Getters-------

  get notesList() {
    return this.getAttribute('notesList');
  }

  // -------Setters-------

  set notesList(value) {
    this.setAttribute('notesList', JSON.stringify(this.getStorage()));
  }

  // -------Methods-------

  renderNote(note) {
    return `
    <tr class="table__row">
      <th class="table__cell">
        <div class="color-rectangle" style="background-color: ${note.color}"></div>
      </th>
      <th class="table__cell color-name">${note.name}</th>
      <th class="table__cell">${(note.type)}</th>
      <th class="table__cell">${note.color}</th>
      <th class="table__cell">
        <button class="change-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.8701 3.60447C13.0429 3.41283 13.2481 3.26081 13.4739 3.1571C13.6997 3.05338 13.9417 3 14.1861 3C14.4306 3 14.6726 3.05338 14.8984 3.1571C15.1242 3.26081 15.3293 3.41283 15.5022 3.60447C15.675 3.79611 15.8121 4.02362 15.9056 4.27401C15.9991 4.5244 16.0473 4.79277 16.0473 5.06379C16.0473 5.33481 15.9991 5.60317 15.9056 5.85356C15.8121 6.10395 15.675 6.33146 15.5022 6.5231L6.61905 16.3735L3 17.468L3.98701 13.4549L12.8701 3.60447Z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                
        </button>
      </th>
      <th class="table__cell">
        <button class="remove-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4H4L5.26923 16H13.7308L15 4ZM13.8887 5H5.11135L6.16904 15H12.831L13.8887 5Z" />
            <rect x="4" y="3" width="11" height="2"/>
            </svg>
        </button>
      </th>
    </tr>
    `;
  };

  renderTable(list) {
    let table = `
    <tr class="table__row">
      <th class="table__column-heading table__cell">Цвет</th>
      <th class="table__column-heading table__cell">Название</th>
      <th class="table__column-heading table__cell">Тип</th>
      <th class="table__column-heading table__cell">Код</th>
      <th class="table__column-heading table__cell">Изменить</th>
      <th class="table__column-heading table__cell">Удалить</th>
    </tr>
    `;
    list.forEach(note => {
      table += this.renderNote(note);
    });
    this.shadowRoot.querySelector('.table').innerHTML = table;
  }

  removeNote(name) {
    const list = JSON.parse(document.querySelector('color-table')
      .getAttribute('notesList'));
    const noteIndex = list
      .indexOf(list.find(element => element.name === name));
    list.splice(noteIndex, 1);
    document.querySelector('color-table')
      .setAttribute('notesList', JSON.stringify(list));
  }

  addEventListenersToButtons() {

    // Удаление записи

    const removeButtonsCollection = this.shadowRoot
      .querySelectorAll('.remove-button');
    removeButtonsCollection.forEach(removebtn => {
      removebtn.addEventListener('click', (event) => {
        const row = event.target.closest('.table__row');
        const rowName = row.querySelector('.color-name').textContent;
        row.remove();
        this.removeNote(rowName);
      });
    });

    // Редактирование записи 

    const editButtonsCollection = this.shadowRoot
      .querySelectorAll('.change-button');
    editButtonsCollection.forEach(changebtn => {
      changebtn.addEventListener('click', (event) => {
        const changer = document.querySelector('#changeWindow');
        changer.classList.add('visible');

        const row = event.target.closest('.table__row');
        const rowName = row.querySelector('.color-name').textContent;
        const list = JSON.parse(document.querySelector('color-table')
          .getAttribute('notesList'));
        const currentNote = (list.find(element => element.name === rowName));
        changer.setAttribute('name', currentNote.name); // 1
        changer.setAttribute('type', currentNote.type); // 2
        changer.setAttribute('color', currentNote.color); // 3
        changer.setAttribute('color', currentNote.color); // Костыльный вызов
        changer.setAttribute('noteindex', list.indexOf(currentNote));
      });
    });
  }

  // ----------Хранение данных----------

  // Получить данные с хранилища

  getStorage() {
    return JSON.parse(localStorage.getItem('tableList'));
  }

  // Записать данные в хранилище

  setStorage(value) {
    localStorage.setItem('tableList', JSON.stringify(value));
  }

  // Обновить данные в хранилище

  updateStorage() {
    // Пустой массив нужен для методов добавления и удаления в список
    if (this.getStorage() === null) {
      this.setStorage([]);
      return;
    }
    this.setStorage(this.notesList);
  }

  // -----------Drag and Drop----------
  // Иногда переносит, чаще жалуется на завершение переноса, не сохраняет порядок
  // Вместо переноса - выделение

  addDnD() {

    function dragstartHandler(event) {
      // event.dataTransfer.setData('text/html', document.querySelector('.table__row'));
      // event.dataTransfer.effectAllowed = 'move';
      event.target.classList.add('dragged')
      console.log(event);
    }

    function dragendHandler(event) {
      event.target.classList.remove('dragged')
      console.log(event);
    }

    function dragoverHandler(event) {
      event.preventDefault();
      console.log(event);
      event.dataTransfer.dropEffect = 'move';
    }

    function dropHandler(event) {
      console.log(event);
      const draggedEl = dropContainer.querySelector(`.table__row`);

      dropContainer.append(draggedEl);
    }

    const rows = document.querySelectorAll('.table__row');
    rows.forEach(row => {
      row.draggable = true;
      row.addEventListener('dragstart', dragstartHandler);
      row.addEventListener('dragend', dragendHandler);
    });

    const dropContainer = this.shadowRoot.querySelector('.table');
    dropContainer.addEventListener('dragover', dragoverHandler);
    dropContainer.addEventListener('drop', dropHandler);
  }
}