const scaleImage = (scaleValueInput, uploadImagePreviewImput) => function (evt) {
  if (evt.target.nodeName === 'BUTTON') {
    let scaleValue = parseInt(scaleValueInput.value, 10);
    if (evt.target.classList.contains('scale__control--smaller')) {
      if (scaleValue > 25) {
        scaleValue -= 25;
      }
    } else {
      if (scaleValue < 100) {
        scaleValue += 25;
      }
    }
    scaleValueInput.value = `${scaleValue}%`;
    uploadImagePreviewImput.style.transform = `scale(${scaleValue / 100})`;
  }
};

export { scaleImage };
