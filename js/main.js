const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Мирослава',
  'Александр',
  'Иван',
  'Федор',
  'Сергей',
  'Алексей',
  'Светлана',
  'Евгения',
];

const DESCRIPTIONS = [
  'На море!',
  'Зарядитесь нашим теплом.',
  'Просто я',
  'Мыслями на пляже.',
  'Я после марафона… любимого сериала.',
  'Работаю как босс',
  'Старые подходы не помогут открыть новые двери'
];

const generateId = () => {
  let id = 0;

  return function() {
    id++;
    return id;
  };
};

const getRandomNumberFromRange = (min, max) =>
  Math.round(min + (max - min) * Math.random());

const getRandomArrayElement = (array) => array[getRandomNumberFromRange(0, array.length - 1)];

const getUnicueIdentifierFromRange = (min, max) => {
  const createdIdentifiers = [];

  return function() {
    let randomValue = getRandomNumberFromRange(min, max);

    if(createdIdentifiers.length >= (max - min + 1)) {
      console.error(`Идентификаторы в диапазоне от ${min} до ${max} созданы`);
      return;
    }

    while(createdIdentifiers.includes(randomValue)) {
      randomValue = getRandomNumberFromRange(min, max);
    }

    createdIdentifiers.push(randomValue);
    return randomValue;
  };
};

/*Альтернативный вариант
const getStringFromArray = (value, array) => {
  const elements = [];
  for(let i = 0; i < value; i++) {
    elements[i] = getRandomArrayElement(array);
  }
  return elements.join(' ');
}*/

const getStringFromArray = (elements) => {
  function getElement() {
    const element = getRandomArrayElement(elements);
    return element;
  }

  return getElement;
};

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
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumberFromRange(15, 200),
    coments: Array.from({length: getRandomNumberFromRange(0, 30)}, () => {
      const coment = {
        id: generateCommentId(),
        avatar: `img/avatar-${getRandomNumberFromRange(1, 6)}.svg`,
        message: Array.from({length: getRandomNumberFromRange(1, 2)}, getStringFromArray(MESSAGES)).join(' '),
        name: getRandomArrayElement(NAMES)
      };
      return coment;
    })
  };
  return post;
};

const posts = Array.from({length: 25}, createPost);

console.log(posts);
