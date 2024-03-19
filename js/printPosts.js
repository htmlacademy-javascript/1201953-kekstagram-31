import { getPosts } from './post.js';

const MAX_POST_LENGTH = 25;
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const posts = getPosts(MAX_POST_LENGTH);

const documentFragment = document.createDocumentFragment();

const printPictures = (elementToRenedder) => {
  if(!(elementToRenedder instanceof Node))
  {
    console.error('Параметр не является дом-элементом');
    return false;
  }

  posts.forEach(({ url, description, likes, coments }) => {
    const picture = pictureTemplate.cloneNode(true);
    const postImage = picture.querySelector('.picture__img');
    postImage.src = url;
    postImage.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = coments.length;
    documentFragment.append(picture);
  });

  elementToRenedder.append(documentFragment);
};

export {printPictures};
