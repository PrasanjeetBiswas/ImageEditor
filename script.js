const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("image-input");
const canvasContext = imageCanvas.getContext("2d");
let file = null;
let img = null;
const resetFilter = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");

let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hue: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  opacity:{
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  blur: {
    value: 0,
    min: 0,
    max: 10,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.textContent = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (e) => {
    filters[name].value = input.value;
    applyFilters();
  });
  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
  const filter = filters[key];
  // console.log(key, filter);
  const filterElement = createFilterElement(
    key,
    filter.unit,
    filter.value,
    filter.min,
    filter.max,
  );

  filtersContainer.appendChild(filterElement);
});
};
createFilters();


imageInput.addEventListener("change", (e) => {
    imageCanvas.style.display = "block";
    const imageHolder = document.querySelector(".imageholder");
    imageHolder.style.display = "none";
     file = e.target.files[0];
    const image = new Image();

    image.src = URL.createObjectURL(file);

    image.onload = () => {
      img = image;
        imageCanvas.width = image.width;
        imageCanvas.height = image.height;
        canvasContext.drawImage(image, 0, 0);

        applyFilters();
    };
});

function applyFilters() {
  if (!img) return;

  canvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasContext.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hue.value}${filters.hue.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  invert(${filters.invert.value}${filters.invert.unit})`.trim();

  canvasContext.drawImage(img, 0, 0);
};

resetFilter.addEventListener("click", () => {
  filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hue: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  opacity:{
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  blur: {
    value: 0,
    min: 0,
    max: 10,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

applyFilters();
filtersContainer.innerHTML = "";
createFilters();
});

downloadBtn.addEventListener("click", () => {
  if (!img) return;
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});


const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    opacity: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 85,
    hue: 10,
    opacity: 100,
    blur: 0,
    grayscale: 10,
    sepia: 40,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 120,
    hue: 180,
    opacity: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 105,
    saturation: 115,
    hue: 20,
    opacity: 100,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    invert: 0,
  },

  dramatic: {
    brightness: 90,
    contrast: 140,
    saturation: 110,
    hue: 0,
    opacity: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturation: 70,
    hue: 0,
    opacity: 100,
    blur: 0,
    grayscale: 20,
    sepia: 10,
    invert: 0,
  },

  noir: {
    brightness: 100,
    contrast: 130,
    saturation: 0,
    hue: 0,
    opacity: 100,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    invert: 0,
  },

  sepiaTone: {
    brightness: 100,
    contrast: 90,
    saturation: 90,
    hue: 0,
    opacity: 100,
    blur: 0,
    grayscale: 20,
    sepia: 80,
    invert: 0,
  },

  inverted: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    opacity: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    invert: 100,
  },

  softBlur: {
    brightness: 105,
    contrast: 95,
    saturation: 100,
    hue: 0,
    opacity: 100,
    blur: 2,
    grayscale: 0,
    sepia: 0,
    invert: 0,
  },
};


function applyPreset(presetName) {
  const preset = presets[presetName];

  Object.keys(preset).forEach((key) => {
    filters[key].value = preset[key];

    // update slider UI also
    const input = document.getElementById(key);
    if (input) input.value = preset[key];
  });

  applyFilters();
}

const presetContainer = document.querySelector(".presets");

Object.keys(presets).forEach((presetName) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = presetName;

  btn.addEventListener("click", () => {
    applyPreset(presetName);
  });

  presetContainer.appendChild(btn);
});