import {getMessages, getNames, getDescription} from './data.js';
import {generateId, getUnicueIdentifierFromRange, getStringFromArray, getRandomArrayElement, getRandomNumberFromRange} from './utility.js';

const messages = getMessages();
const names = getNames();
const descriptions = getDescription();

const generateCommentId = generateId();
const generatePostId = getUnicueIdentifierFromRange(1, 25);
const generateUrl = getUnicueIdentifierFromRange(1, 25);


const createPost = () => {
  const postId = generatePostId();
  if(!postId) {
    console.error('Объект не будет создан, т к закончились уникальные идентификаторы');
    return null;
  }
  const post = {
    id: postId,
    url: `photos/${generateUrl()}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomNumberFromRange(15, 200),
    coments: Array.from({length: getRandomNumberFromRange(0, 30)}, () => {
      const coment = {
        id: generateCommentId(),
        avatar: `img/avatar-${getRandomNumberFromRange(1, 6)}.svg`,
        message: Array.from({length: getRandomNumberFromRange(1, 2)}, getStringFromArray(messages)).join(' '),
        name: getRandomArrayElement(names)
      };
      return coment;
    })
  };
  return post;
};

const getPosts = (postsQuantity) => Array.from({length: postsQuantity}, createPost);

export {getPosts};
