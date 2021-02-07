import "./index.css";

const appState = {
  auto: false,
  currentIndex: 0,
  items: null,
};

let intervalID;
const sliderEl = document.querySelector(".mockup-gallery");

const mockupElement = document.getElementById("mockup");
const initialSlideElement = document.getElementById("initial-slide");
const contorlersElement = document.getElementById("contorlers");

// SET CURRENT ELEMENT
const setCurrentItem = (state, step) => {
  let { currentIndex, items } = state;
  // use modulo to set new index in looped array
  const newIndex = (currentIndex + step + items.length) % items.length;
  // handle DOM
  items[currentIndex].classList.remove("active");
  items[newIndex].classList.add("active");
  // set global Index out of the setSlide function
  state.currentIndex = newIndex;
};

// THAT LOOP TROUGHT ARRAY OF VIDEOS
const addOnEndCallBack = (el, index, array) => {
  const newIndex = (index + 1) % array.length;
  console.log(array[newIndex]);
  el.onended = () => {
    array[newIndex].parentElement.classList.add("active");
    el.parentElement.classList.remove("active");
    array[newIndex].play();
  };

  return el;
};

// ADD SLIDE FUNCTION
const cretateVideoElement = (url) => {
  // Add image
  // let newMedia = document.createElement("img");
  // newMedia.setAttribute("src", url);

  // Add video
  let newVideo = document.createElement("video");
  newVideo.defaultMuted = true;
  newVideo.setAttribute("type", "video/mp4");
  newVideo.setAttribute("src", url);
  newVideo.setAttribute("width", "720");
  newVideo.load();
  newVideo.play();
  newVideo.setAttribute("loop", "true");

  let newSlide = document.createElement("div");
  newSlide.classList.add("slide");

  newSlide.appendChild(newVideo);
  mockupElement.appendChild(newSlide);
  mockupElement.removeChild(initialSlideElement);
  contorlersElement.classList.add("hidden");

  return newVideo;
};

// ADD SLIDE FUNCTION
const addSlide = (url, index, array) => {
  // create image element
  let newSlide = document.createElement("div");
  newSlide.classList.add("slide");

  // Add image
  // let newImege = document.createElement("img");
  // newImege.setAttribute("src", localUrl);
};

// LOAD IMAGE FUNCTION
const loadMedia = (event) => {
  console.log(event);
  const { files } = event.target;
  const filesArray = Array.from(files);

  filesArray.forEach((filed) => {
    var reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target.result;
      cretateVideoElement(url);
    };
    reader.readAsDataURL(filed);
  });

  // initSlider(sliderEl);
  //initiMedia(videoUrlArray);
};

const startStopAuto = (params) => {
  if (!appState.auto) {
    window.clearInterval(intervalID);
    setCurrentItem(appState, +1);
    intervalID = window.setInterval(() => setCurrentItem(appState, +1), 2500);
    const element = appState.items[appState.index];
    const childVideo = element.childNodes;
    appState.auto = true;
  } else {
    window.clearInterval(intervalID);
    appState.auto = false;
  }
};

//INIT INPUT ELEMENT
const inputElement = document.querySelector(".imageInput");
inputElement.addEventListener("change", loadMedia);

/////////////////////
// COLOR PICKER
////////////////////

const handleThemeUpdate = (cssVars) => {
  const root = document.querySelector(":root");
  const keys = Object.keys(cssVars);
  keys.forEach((key) => {
    root.style.setProperty(key, cssVars[key]);
  });
};

const initialiteInput = (input) => {
  input.addEventListener("input", watchColorPicker, false);
  //input.addEventListener("change", watchColorPicker, false);

  function watchColorPicker(event) {
    const { value } = event.target;
    console.log(value);
    const root = document.querySelector(":root");
    console.log(value);
    root.style.setProperty("--bg-color", value);
  }
};

const ColorPickerElement = document.getElementById("bg-color");
initialiteInput(ColorPickerElement);
