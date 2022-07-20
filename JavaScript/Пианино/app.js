// Питание

const powerBtn = document.querySelector('.power-panel__btn');

powerBtn.addEventListener('click', () => {
  powerBtn.classList.toggle('power-panel__btn_active');
});

// Громкость

// Отображение уровня громкости

let volumeLevel = 2;
const indicators = document.querySelectorAll('.volume-panel__indicator');

function displayVolumeLevel(indicators, volumeLevel) {
  for (let i = 0; i < 5; i++) {
    indicators[i].classList.remove('volume-panel__indicator_active');
  }
  for (let indicator = 0; indicator < volumeLevel; indicator++) {
    indicators[indicator].classList.add('volume-panel__indicator_active');
  }
}

displayVolumeLevel(indicators, volumeLevel); // Громкость по умолчанию

// Регулировка громкости

const addVolumeBtn = document.querySelector('.volume-panel__addVolumeBtn');
const reduceVolumeBtn = document
  .querySelector('.volume-panel__reduceVolumeBtn');

function setVolumeLevel(volumeLevel) {
  arrOctave.forEach(audio => {
    audio.volume = volumeLevel * 0.2;
  });
}

addVolumeBtn.addEventListener('click', () => {
  if (volumeLevel < 5) {
    volumeLevel++;
    setVolumeLevel(volumeLevel);
  }
  displayVolumeLevel(indicators, volumeLevel);
});

reduceVolumeBtn.addEventListener('click', () => {
  if (volumeLevel > 0) {
    volumeLevel--;
    setVolumeLevel(volumeLevel);
  }
  displayVolumeLevel(indicators, volumeLevel);
});

// Клавиатура

const arrOctave = [
  new Audio('audio/note1.wav'),
  new Audio('audio/note2.wav'),
  new Audio('audio/note3.wav'),
  new Audio('audio/note4.wav'),
  new Audio('audio/note5.wav'),
  new Audio('audio/note6.wav'),
  new Audio('audio/note7.wav'),
];

function makeKey() {
  return `<div class="key"></div>`;
}

function makeBkey() {
  return `<div class="key"><div class="bkey"></div></div>`;
}

function renderOctave(octave) {
  let octaveHTML = '<div class="octave">';
  for (let note = 1; note <= octave.length; note++) {
    if (note === 1 || note === 4) {
      octaveHTML += makeKey();
    } else {
      octaveHTML += makeBkey();
    }
  }
  octaveHTML += '</div>';
  return octaveHTML;
}

// Рендер клавиатуры

let keypadHTML = '';

keypadHTML += makeKey(); // Первая клавиша
keypadHTML += makeBkey(); // Вторая клавиша

let octavesAmount = 3;
for (let octaves = 0; octaves < octavesAmount; octaves++) {
  keypadHTML += renderOctave(arrOctave);
}

const keypad = document.querySelector('#keypad');
keypad.insertAdjacentHTML('afterbegin', keypadHTML);

// Нажатие и отжатие обычной клавиши

const makeKeyPressed = function () {
  if (powerBtn.classList.contains('power-panel__btn_active')) {
    this.classList.add('key_pressed');
  }
}

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('mousedown', makeKeyPressed);
  key.addEventListener('mouseup', () => key.classList.remove('key_pressed'));
});

document.querySelectorAll('.bkey').forEach(key => {
  if (powerBtn.classList.contains('power-panel__btn_active')) {
    key.addEventListener('mousedown', (event) => {
      event.stopPropagation();
      key.classList.add('bkey_pressed');
    });
  }
  key.addEventListener('mouseup', () => {
    key.classList.remove('bkey_pressed');
  });

  // TODO
  // Черные клавиши объединяют две белых, нужна логика и звук
});

// Звук клавиш

const octavesCollection = document.querySelectorAll('.octave');
octavesCollection.forEach(currentOctave => {
  currentOctave.querySelectorAll('.key').forEach((key, index) => {
    key.addEventListener('mousedown', () => {
      if (powerBtn.classList.contains('power-panel__btn_active')) {
        arrOctave[index].currentTime = 0;
        arrOctave[index].play();
      }
    });
  });
});

window.addEventListener('keydown', (event) => {
  const octave = document.querySelector('.octave');

  if (powerBtn.classList.contains('power-panel__btn_active')) {
    if (event.key === 'a') {
      octave.childNodes[0].classList.add('key_pressed');
      arrOctave[0].currentTime = 0;
      arrOctave[0].play();
    } else if (event.key === 's') {
      octave.childNodes[1].classList.add('key_pressed');
      arrOctave[1].currentTime = 0;
      arrOctave[1].play();
    } else if (event.key === 'd') {
      octave.childNodes[2].classList.add('key_pressed');
      arrOctave[2].currentTime = 0;
      arrOctave[2].play();
    } else if (event.key === 'f') {
      octave.childNodes[3].classList.add('key_pressed');
      arrOctave[3].currentTime = 0;
      arrOctave[3].play();
    } else if (event.key === 'g') {
      octave.childNodes[4].classList.add('key_pressed');
      arrOctave[4].currentTime = 0;
      arrOctave[4].play();
    } else if (event.key === 'h') {
      octave.childNodes[5].classList.add('key_pressed');
      arrOctave[5].currentTime = 0;
      arrOctave[5].play();
    } else if (event.key === 'j') {
      octave.childNodes[6].classList.add('key_pressed');
      arrOctave[6].currentTime = 0;
      arrOctave[6].play();
    }
  }

});

window.addEventListener('keyup', (event) => {
  const octave = document.querySelector('.octave');

  if (event.key === 'a') {
    octave.childNodes[0].classList.remove('key_pressed');
  } else if (event.key === 's') {
    octave.childNodes[1].classList.remove('key_pressed');
  } else if (event.key === 'd') {
    octave.childNodes[2].classList.remove('key_pressed');
  } else if (event.key === 'f') {
    octave.childNodes[3].classList.remove('key_pressed');
  } else if (event.key === 'g') {
    octave.childNodes[4].classList.remove('key_pressed');
  } else if (event.key === 'h') {
    octave.childNodes[5].classList.remove('key_pressed');
  } else if (event.key === 'j') {
    octave.childNodes[6].classList.remove('key_pressed');
  }
});