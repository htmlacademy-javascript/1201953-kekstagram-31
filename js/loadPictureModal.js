import { isEscapeKey } from '/js/utility.js';
import { validateInicial } from '/js/validateUploadImageForm.js';
import { scaleImage, editPicture } from '/js/editPictureModal.js';
import { resetFilter } from './slider.js';

const formLoadPicture = document.querySelector('#upload-select-image');
const buttonLoad = formLoadPicture.querySelector('#upload-file');
const modalEditPicture = formLoadPicture.querySelector('.img-upload__overlay');
const closeFormButton = modalEditPicture.querySelector('#upload-cancel');
const textHashtags = modalEditPicture.querySelector('.text__hashtags');
const textComment = modalEditPicture.querySelector('.text__description');
const submitButton = modalEditPicture.querySelector('#upload-submit');
const scaleText = modalEditPicture.querySelector('.scale__control--value');
const uploadImagePreview = modalEditPicture.querySelector('.img-upload__preview');
const range = modalEditPicture.querySelector('.effect-level__slider');
const effectsList = modalEditPicture.querySelector('.effects__list');
const uploadImage = modalEditPicture.querySelector('.img-upload__preview');
const sliderContainer = modalEditPicture.querySelector('.img-upload__effect-level');
const originalEffect = effectsList.querySelector('#effect-none');
const effectLevel = modalEditPicture.querySelector('.effect-level__value');

const imageUploadScale = modalEditPicture.querySelector('.img-upload__scale');

const scaleImageChange = scaleImage(scaleText, uploadImagePreview);

imageUploadScale.addEventListener('click', scaleImageChange);

const onChangeSelectEffect = editPicture(range, uploadImage, sliderContainer, effectLevel);
let pristine;

const closeModal = () => {
  modalEditPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFilter(uploadImagePreview, originalEffect, uploadImage);

  formLoadPicture.reset();
  pristine.destroy();

  effectsList.removeEventListener('change', onChangeSelectEffect);
};

const onKeydownCloseModal = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
    document.removeEventListener('keydown', onKeydownCloseModal);
  }
};

const openModal = () => {
  const validateForm = validateInicial(formLoadPicture, textHashtags, textComment);
  modalEditPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  pristine = validateForm();
  sliderContainer.classList.add('hidden');

  document.addEventListener('keydown', onKeydownCloseModal);
  effectsList.addEventListener('change', onChangeSelectEffect);
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
