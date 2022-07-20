const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./css/style.css">
<form action="#" class="window color-picker-window ">
  <slot name="windowName"></slot>
  <label for="colorName" class="label">
    Название цвета
    <input type="text" 
      name="colorName" 
      class="input" 
      id="colorName" 
      placeholder="Введите название" 
      required
    >
  </label>
  <label for="colorType" class="label">
    Выберите тип
    <select name="colorType" id="colorType" class="input">
      <option value="Main" class="color-type-option">Main</option>
      <option value="Primary" class="color-type-option">Primary</option>
      <option value="Secondary" class="color-type-option">Secondary</option>
      <option value="Base" class="color-type-option">Base</option>
    </select>
  </label>
  <input data-jscolor="{}" id="colorPicker" value="#fff">
  <input type="submit" value="Добавить" id="submit-button" class="button button_active">
</form>
`;

export default class ColorPicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.note = {
      name: '',
      type: '',
      color: ''
    }
  }

  connectedCallback() {

    // Отслеживание ввода 

    const name = this.shadowRoot.querySelector('#colorName');
    name
      .addEventListener('input', () => this.note.name = name.value);
    const type = this.shadowRoot.querySelector('#colorType');
    type
      .addEventListener('input', () => this.note.type = type.value);
    const color = this.shadowRoot.querySelector('#colorPicker');
    color
      .addEventListener('input', () => this.note.color = color.value);

    // Отправление данных в таблицу

    const submitBtn = this.shadowRoot.querySelector('#submit-button');
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (this.id === 'changeWindow') {
        this.changeNote(this.getAttribute('noteindex'));
        document.querySelector('#changeWindow').classList.remove('visible');
      } else {
        this.createNote(this.note.name, this.note.type, this.note.color);
        document.querySelector('color-picker').classList.remove('visible');
      }
    });

    // Действие компонента, если он используется для изменения записей

    if (this.id === 'changeWindow') {
      this.setCurrentNote();
    }
  }

  disconnectedCallback() {
    
  }

  attributeChangedCallback(attr, oldValue, newValue) {

    // Установка стартовых значений, если компонент используется для изменения записей
    
    if (this.id === 'changeWindow') {
      this.setCurrentNote();
    }
    
    // Отслеживание атрибутов компонента

    if (attr === 'name') {
      this.note.name = this.getAttribute('name');
    } else if (attr === 'type') {
      this.note.type = this.getAttribute('type');
    } else if (attr === 'color') {
      this.note.color = this.getAttribute('color');
    }


    // TODO Валидация

    // console.log(this.note);
    // const button = this.shadowRoot.querySelector('#submit-button');
    // if (this.note.name && this.note.type && this.note.color) {
    //   button.disabled = 'false';
    // } else {
    //   button.disabled = 'true';
    // }
    // // Либо так
    // (name && type && color) 
    //   ? button.disabled = 'false' 
    //   : button.disabled = 'true';

  }

  // -------Watchers------

  static get observedAttributes() {
    return ['name', 'type', 'color'];
  }

  // -------Getters-------

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.getAttribute('type');
  }

  get color() {
    return this.getAttribute('color');
  }

  // -------Setters-------

  set name(value) {
    this.setAttribute('name', value);
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  // -------Methods-------

  createNote(name, type, color) {
    const newNote = {
      name: name,
      type: type,
      color: color
    }
    const list = JSON.parse(document.querySelector('color-table')
      .getAttribute('notesList'));
    list.push(newNote);
    document.querySelector('color-table')
      .setAttribute('notesList', JSON.stringify(list));
  }

  setCurrentNote() {
    this.shadowRoot.querySelector('#colorName').value = this.note.name;
    const select = this.shadowRoot.querySelector('#colorType');
    select.querySelectorAll('option').forEach(option => {
      if (option.value === this.note.type) {
        option.setAttribute('selected', true);
      } else {
        option.removeAttribute('selected');
      }
    });
    this.shadowRoot.querySelector('#colorPicker').value = this.note.color;
  }

  changeNote(index) {
    const list = JSON.parse(document.querySelector('color-table')
      .getAttribute('notesList'));
    list[index] = this.note;
    document.querySelector('color-table')
     .setAttribute('notesList', JSON.stringify(list));
  }
}