import { getObjectsByDomElements } from '/js/printPosts.js';
import { isEscapeKey } from '/js/utility.js';
import { createComment } from './createElements';

const objectsByElements = getObjectsByDomElements();

const pictures = document.querySelector('.pictures');
const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('#picture-cancel');

const onKeydownClosePopupPost = (evt) => {
  if (isEscapeKey(evt)) {
    closeModalPost();
  }
};

const onClickClosePopupPost = () => closeModalPost();

const printModalPost = (post) => {
  const commentsFragment = document.createDocumentFragment();

  const { url, description, likes, comments } = objectsByElements.get(post);
  popup.querySelector('.big-picture__img img').src = url;
  popup.querySelector('.likes-count').textContent = likes;
  popup.querySelector('.social__comment-shown-count').textContent = comments.length;
  popup.querySelector('.social__comment-total-count').textContent = comments.length;

  comments.forEach((comment) => commentsFragment.append(createComment(comment)));

  popup.querySelector('.social__comments').innerHTML = '';
  popup.querySelector('.social__comments').append(commentsFragment);
  popup.querySelector('.social__caption').textContent = description;

  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeydownClosePopupPost);
  closeButton.addEventListener('click', onClickClosePopupPost);

  //Временное скрытие элементов в попапе
  popup.querySelector('.social__comment-count').classList.add('hidden');
  popup.querySelector('.comments-loader').classList.add('hidden');
};

const onClickOpenPopupPost = (evt) => {
  evt.preventDefault();
  const post = evt.target.closest('.picture');
  if (post) {
    printModalPost(post);
  }
};

pictures.addEventListener('click', onClickOpenPopupPost);

const closeModalPost = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', onClickClosePopupPost);
  document.removeEventListener('keydown', onKeydownClosePopupPost);
};
