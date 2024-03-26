import { isEscapeKey } from '/js/utility.js';

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}/i;

const formLoadPicture = document.querySelector('#upload-select-image');
const buttonLoad = formLoadPicture.querySelector('#upload-file');
const modalEditPicture = formLoadPicture.querySelector('.img-upload__overlay');
const closeFormButton = modalEditPicture.querySelector('#upload-cancel');
const textHashtags = modalEditPicture.querySelector('.text__hashtags');
const textComment = modalEditPicture.querySelector('.text__description');
const submitButton = modalEditPicture.querySelector('#upload-submit');

let hashtags;
let duplicates;

const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;

const pristine = new Pristine(formLoadPicture, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const closeModal = () => {
  modalEditPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hashtags = [];
  duplicates = [];

  formLoadPicture.reset();
  pristine.reset();
};

const onKeydownCloseModal = (evt) => {
  if (isEscapeKey(evt)) {
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
  hashtags = value.toLowerCase().split(' ');
  hashtags = hashtags.filter((element) => element !== '');
  duplicates = hashtags.filter((element, indexCurrentElement, hashtagsArray) => hashtagsArray.indexOf(element) !== indexCurrentElement);
  if (duplicates.length === 0 && hashtags.length <= MAX_COUNT_HASHTAGS && hashtags.every((hashtag) => hashtagRegex.test(hashtag))) {
    return true;
  }
  return false;
};

const errorHashtags = () => {
  if (hashtags.length > MAX_COUNT_HASHTAGS) {
    return 'превышено количество хэштегов';
  }
  // if (!hashtags.every((hashtag) => hashtagRegex.test(hashtag))) {
  //   return 'введён невалидный хэштег';
  // }
  if (duplicates.length > 0) {
    return 'хэштеги повторяются';
  }
  const invalidHashtags = [];
  hashtags.forEach((hashtag) => {
    if(!hashtagRegex.test(hashtag)) {
      invalidHashtags.push(hashtag);
    }
  });

  if(invalidHashtags !== 0) {
    return invalidHashtags.length > 1 ? `введены невалидные хэштеги: ${invalidHashtags.join(', ')}` : `введен невалидный хэштег: ${invalidHashtags.join()}`;
  }
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(textHashtags, validateHashtags, errorHashtags);
pristine.addValidator(textComment, validateComment, 'длина комментария больше 140 символов');

formLoadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    formLoadPicture.submit();
    submitButton.setAttribute('disabled', 'disabled');
  }
});

textHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textComment.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
