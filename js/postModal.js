import { getObjectsByDomElements } from '/js/printPosts.js';
import { isEscapeKey } from '/js/utility.js';
import { createComment } from './createElements';

const objectsByElements = getObjectsByDomElements();

const pictures = document.querySelector('.pictures');
const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('#picture-cancel');

const commentsBlock = popup.querySelector('.social__comments');

const closeModalPost = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onKeydownClosePopupPost);
};

const onKeydownClosePopupPost = (evt) => {
  if (isEscapeKey(evt)) {
    closeModalPost();
  }
};

closeButton.addEventListener('click', () => closeModalPost());

const addCommentsToDomElement = (commentsToPrint) => {
  commentsBlock.append(commentsToPrint);
  popup.querySelector('.social__comment-shown-count').textContent = commentsBlock.children.length;
};

const showComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  const commentsToPrint = document.createDocumentFragment();
  comments.forEach((comment) => commentsFragment.append(createComment(comment)));
  const commentsFragmentChilds = commentsFragment.childNodes;
  let counter = 0;
  for(let i = commentsFragmentChilds.length - 1; i >= 0 && counter < 5; i--) {
    commentsToPrint.append(commentsFragmentChilds[i]);
    counter++;
  }
  addCommentsToDomElement(commentsToPrint);
  popup.querySelector('.social__comment-total-count').textContent = comments.length;

  const onClickShowMoreComments = () => {
    counter = 0;
    for(let i = commentsFragmentChilds.length - 1; i >= 0 && counter < 5; i--) {
      commentsToPrint.append(commentsFragmentChilds[i]);
      counter++;
    }
    addCommentsToDomElement(commentsToPrint);
  };

  return onClickShowMoreComments;
};

const printModalPost = (post) => {
  const { url, description, likes, comments } = objectsByElements.get(post);
  popup.querySelector('.big-picture__img img').src = url;
  popup.querySelector('.likes-count').textContent = likes;
  popup.querySelector('.social__comments').innerHTML = '';
  popup.querySelector('.social__caption').textContent = description;

  const onClickShowMoreComments = showComments(comments);

  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeydownClosePopupPost);
  popup.querySelector('.comments-loader').addEventListener('click', onClickShowMoreComments);
};

const onClickOpenPopupPost = (evt) => {
  evt.preventDefault();
  const post = evt.target.closest('.picture');
  if (post) {
    printModalPost(post);
  }
};

pictures.addEventListener('click', onClickOpenPopupPost);
