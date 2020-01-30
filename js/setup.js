'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_MAGES = 4;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

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

  userDialog.classList.remove('hidden');

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

init();
