const hashtagRegex = /^#[a-zа-яё0-9]{1,19}/i;

const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateInicial = (validateForm, hashtagsInput, commentInput) => {
  const validateHashtags = (value) => {
    let hashtags = value.toLowerCase().split(' ');
    hashtags = hashtags.filter((element) => element !== '');
    const duplicates = hashtags.filter((element, indexCurrentElement, hashtagsArray) => hashtagsArray.indexOf(element) !== indexCurrentElement);
    const validHashtags = hashtags.every((hashtag) => hashtagRegex.exec(hashtag) ? hashtagRegex.exec(hashtag)[0] === hashtag : false);
    if (duplicates.length === 0 && hashtags.length <= MAX_COUNT_HASHTAGS && validHashtags) {
      return true;
    }
    return false;
  };

  const errorHashtags = () => {
    let hashtags = hashtagsInput.value.toLowerCase().split(' ');
    hashtags = hashtags.filter((element) => element !== '');
    const duplicates = hashtags.filter((element, indexCurrentElement, hashtagsArray) => hashtagsArray.indexOf(element) !== indexCurrentElement);
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
      if (hashtagRegex.exec(hashtag) ? hashtagRegex.exec(hashtag)[0] !== hashtag : true) {
        invalidHashtags.push(hashtag);
      }
    });

    if (invalidHashtags !== 0) {
      return invalidHashtags.length > 1 ? `введены невалидные хэштеги: ${invalidHashtags.join(', ')}` : `введен невалидный хэштег: ${invalidHashtags.join()}`;
    }
  };
  return () => {
    const pristine = new Pristine(validateForm, {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'img-upload__field-wrapper--error',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'div',
    },
    false);

    pristine.addValidator(hashtagsInput, validateHashtags, errorHashtags);
    pristine.addValidator(commentInput, validateComment, 'длина комментария больше 140 символов');
    return pristine;
  };
};

export { validateInicial };
