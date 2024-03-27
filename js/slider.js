const generateSlider = (range) => {
  noUiSlider.create(range, {
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1,
    start: 1
  });
};

const updateSliderRange = (sliderElement, minRange, maxRange, step, start) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minRange,
      max: maxRange
    },
    step: step,
    start: start
  });
};

export { generateSlider, updateSliderRange };
