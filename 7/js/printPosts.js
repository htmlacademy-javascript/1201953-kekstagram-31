import {getPosts} from './post.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const posts = getPosts(25);

const documentFragment = document.createDocumentFragment();

posts.forEach(({url, description, likes, coments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const postImage = picture.querySelector('.picture__img');
  postImage.src = url;
  postImage.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = coments.length;
  documentFragment.append(picture);
});

pictures.append(documentFragment);
