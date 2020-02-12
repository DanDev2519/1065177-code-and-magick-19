'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_MAGES = 4;
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_CODE = 27;
var ENTER_CODE = 13;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var userWizard = userDialog.querySelector('.setup-wizard');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var userWizardCoatColorInput = userDialog.querySelector('input[name="coat-color"]');
var userWizardEyesColorInput = userDialog.querySelector('input[name="eyes-color"]');
var userWizardFireballColorInput = userDialog.querySelector('input[name="fireball-color"]');
// var filterInputs = document.querySelectorAll('input[type="radio"]');

// Функция генерации случайного числа "вплоть до"
var getRandomUpTo = function (max) {
  return Math.floor(Math.random() * max);
};
// функция генерации случайных данных
var getWizardList = function (quantity, names, surnamse, coatColors, eyesColors) {
  var wizardList = [];

  for (var i = 0; i < quantity; i++) {
    wizardList.push({
      name: names[getRandomUpTo(names.length)] + ' ' + surnamse[getRandomUpTo(surnamse.length)],
      coatColor: coatColors[getRandomUpTo(coatColors.length)],
      eyesColor: eyesColors[getRandomUpTo(eyesColors.length)]
    });
  }

  return wizardList;
};
// функция создания DOM-элемента на основе JS-объекта
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
// Функция инициализации
var init = function () {
  var wizards = getWizardList(NUMBER_OF_MAGES, WIZARD_NAMES, WIZARD_SURNAME, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  openPopup();

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};
// Функция события нажатия ESC на popup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE && !(userNameInput === document.activeElement)) {
    closePopup();
  }
};
// Функция открытия popup
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// Функция закрытия popup
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
// Функция получения следующего элемента массива
var getNexElementOfArray = function (array, current) {
  var elementIndex = array.indexOf(current);
  if (elementIndex === array.length - 1) {
    elementIndex = 0;
  } else {
    elementIndex += 1;
  }
  return array[elementIndex];
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userWizardCoat.addEventListener('click', function () {
  userWizardCoatColorInput.value = getNexElementOfArray(WIZARD_COAT_COLOR, userWizardCoatColorInput.value);
  userWizardCoat.style.fill = userWizardCoatColorInput.value;
});

userWizardEyes.addEventListener('click', function () {
  userWizardEyesColorInput.value = getNexElementOfArray(WIZARD_EYES_COLOR, userWizardEyesColorInput.value);
  userWizardEyes.style.fill = userWizardEyesColorInput.value;
});

userWizardFireball.addEventListener('click', function () {
  userWizardFireballColorInput.value = getNexElementOfArray(WIZARD_FIREBALL_COLOR, userWizardFireballColorInput.value);
  userWizardFireball.style.backgroundColor = userWizardFireballColorInput.value;
});

init();
