import { isEscapeKey } from '/js/utility.js';

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}/i;

const formLoadPicture = document.querySelector('#upload-select-image');
const buttonLoad = formLoadPicture.querySelector('#upload-file');
const modalEditPicture = formLoadPicture.querySelector('.img-upload__overlay');
const closeFormButton = modalEditPicture.querySelector('#upload-cancel');
const textHashtags = modalEditPicture.querySelector('.text__hashtags');

const pristine = new Pristine(formLoadPicture);

const closeModal = () => {
  modalEditPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  buttonLoad.value = '';
};

const onKeydownCloseModal = (evt) => {
  if(isEscapeKey(evt)) {
    closeModal();
    document.removeEventListener('keydown', onKeydownCloseModal);
  }
};

const openModal = () => {
  modalEditPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeydownCloseModal);
};

buttonLoad.addEventListener('change', () => {
  openModal();
});

closeFormButton.addEventListener('click', () => {
  closeModal();
  document.removeEventListener('keydown', onKeydownCloseModal);
});

const validateHashtags = (value) => {
  let hashtags = value.split(' ');
  hashtags = hashtags.filter((element) => element !== '');
  const duplicates = hashtags.filter((element, indexCurrentElement, hashtagsArray) => hashtagsArray.indexOf(element) !== indexCurrentElement);
  if(!!duplicates && hashtags.length <= 5 && hashtags.every((hashtag) => hashtagRegex.test(hashtag))) {
    return true;
  }

  return false;
};

pristine.addValidator(textHashtags, validateHashtags);

formLoadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if(isValid) {
    console.log('valid');
  }
});
