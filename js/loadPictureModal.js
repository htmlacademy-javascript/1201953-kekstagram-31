import { isEscapeKey } from '/js/utility.js';
import { validateInicial } from '/js/validateUploadImageForm.js';
import { scaleImage } from '/js/editPictureModal.js';

const formLoadPicture = document.querySelector('#upload-select-image');
const buttonLoad = formLoadPicture.querySelector('#upload-file');
const modalEditPicture = formLoadPicture.querySelector('.img-upload__overlay');
const closeFormButton = modalEditPicture.querySelector('#upload-cancel');
const textHashtags = modalEditPicture.querySelector('.text__hashtags');
const textComment = modalEditPicture.querySelector('.text__description');
const submitButton = modalEditPicture.querySelector('#upload-submit');
// const buttonScaleLess = modalEditPicture.querySelector('.scale__control--smaller');
// const buttonScaleMore = modalEditPicture.querySelector('.scale__control--bigger');
const scaleText = modalEditPicture.querySelector('.scale__control--value');
const uploadImagePreview = modalEditPicture.querySelector('.img-upload__preview');

const imageUploadScale = modalEditPicture.querySelector('.img-upload__scale');

const scaleImageChange = scaleImage(scaleText, uploadImagePreview);

imageUploadScale.addEventListener('click', scaleImageChange);

// buttonScaleLess.addEventListener('click', scaleImageLess);
// buttonScaleMore.addEventListener('click', scaleImageMore);

const validateForm = validateInicial(formLoadPicture, textHashtags, textComment);
let pristine;

const closeModal = () => {
  modalEditPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadImagePreview.style.transform = `scale(${1})`;

  formLoadPicture.reset();
  pristine.destroy();
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
  pristine = validateForm();

  document.addEventListener('keydown', onKeydownCloseModal);
};

buttonLoad.addEventListener('change', () => {
  openModal();
});

closeFormButton.addEventListener('click', () => {
  closeModal();
  document.removeEventListener('keydown', onKeydownCloseModal);
});

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
