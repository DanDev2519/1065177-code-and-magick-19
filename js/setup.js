'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// __Функция которая уже была в файле start.js и она подключена раньше
// __Может ее здесь не повторять? или нужно объявлять заново
var getRandomUpTo = function (max) {
  return Math.floor(Math.random() * max);
};

// функция генерации случайных данных
var getWizardList = function (quantity, names, surnamse, coatColors, eyesColors) {
  var wizardList = [];

  for (var i = 0; i < quantity; i++) {
    var wizard = {};

    wizard.name = names[getRandomUpTo(names.length)] + ' ' + surnamse[getRandomUpTo(surnamse.length)];
    wizard.coatColor = coatColors[getRandomUpTo(coatColors.length)];
    wizard.eyesColor = eyesColors[getRandomUpTo(eyesColors.length)];

    wizardList.push(wizard);
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

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var wizards = getWizardList(4, WIZARD_NAMES, WIZARD_SURNAME, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
