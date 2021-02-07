import "./index.css";

const videoUrlArray = [
  "./videos/screen-1.mp4",
  "./videos/screen-2.mp4",
  "./videos/screen-3.mp4",
];

const appState = {
  auto: false,
  currentIndex: 0,
  items: null,
};

let intervalID;
const sliderEl = document.querySelector(".mockup-gallery");

const mobileElement = document.querySelector(".mobile-mockup");

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

// INITIAL SLIDER
const initSlider = () => {
  // Set state
  let currentIndex = 0;
  let items = sliderEl.querySelectorAll(".slide");

  items[0].classList.add("active");

  appState.currentIndex = 0;
  appState.items = items;

  // starter
  setCurrentItem(appState, 0);

  // ADD NAVIGATION
  const nextBtn = sliderEl.querySelector("#next");
  const prevBtn = sliderEl.querySelector("#prev");

  // Set click event to NEXT button
  nextBtn.addEventListener("click", () => setCurrentItem(appState, +1));

  // Set click event to PREV button
  prevBtn.addEventListener("click", () => setCurrentItem(appState, -1));
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
const cretateMediaElement = (url) => {
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
  mobileElement.appendChild(newSlide);

  console.log(newSlide);

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

      cretateMediaElement(url);
    };
    reader.readAsDataURL(filed);
  });

  // initSlider(sliderEl);
  //initiMedia(videoUrlArray);
};

const initiMedia = (urlArray) => {
  const mediaElement = urlArray.map((url) => cretateMediaElement(url));

  const mediaElementWithChain = mediaElement.map((el, index, array) =>
    addOnEndCallBack(el, index, array)
  );

  initSlider();

  mediaElementWithChain[0].play();
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

const autoButton = document
  .getElementById("auto")
  .addEventListener("click", startStopAuto);
