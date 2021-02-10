import "./index.css";

const appState = {
  auto: false,
  currentIndex: 0,
  items: null,
};

let mediaRecorder;
let recordedBlobs = [];

const mockupElement = document.getElementById("mockup");
const initialSlideElement = document.getElementById("initial-slide");
const contorlersElement = document.getElementById("contorlers");

/////////////////////////////
// SCREEN CAPTURE
////////////////////////////

const captureOptions = {
  video: {
    cursor: "never",
  },
  audio: false,
};

var recordedChunks = [];

function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  } else {
    // ...
  }
}
function startRecording() {
  let options = { mimeType: "video/webm;codecs=vp9,opus" };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.error(`${options.mimeType} is not supported`);
    options = { mimeType: "video/webm;codecs=vp8,opus" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not supported`);
      options = { mimeType: "video/webm" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not supported`);
        options = { mimeType: "" };
      }
    }
  }

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
      e
    )}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  mediaRecorder.onstop = (event) => {
    console.log("Recorder stopped: ", event);
    console.log("Recorded Blobs: ", recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

function handleSuccess(stream) {
  console.log("getUserMedia() got stream:", stream);
  window.stream = stream;
  startRecording();
}

const startCapture = async () => {
  console.log("startCapture");
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(captureOptions);
    handleSuccess(stream);
  } catch (err) {
    console.error("Error: " + err);
  }
};

const stopCapture = (evt) => {
  mediaRecorder.stop();
};

// TODO LOGICAL FUNCTION
const cretateVideoElement = (url) => {
  // Add image
  // let newMedia = document.createElement("img");
  // newMedia.setAttribute("src", url);

  // Add video
  let newVideo = document.createElement("video");
  newVideo.defaultMuted = true;
  newVideo.setAttribute("type", "video/mp4");
  newVideo.setAttribute("src", url);
  newVideo.setAttribute("width", "100%");
  newVideo.load();
  newVideo.play();
  newVideo.setAttribute("loop", "true");

  let newSlide = document.createElement("div");
  newSlide.classList.add("slide");

  newSlide.appendChild(newVideo);
  mockupElement.appendChild(newSlide);
  mockupElement.removeChild(initialSlideElement);
  mockupElement.classList.remove("initial-height");

  contorlersElement.classList.add("hidden");

  return newVideo;
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

/////////////////////////////
// Drag title
////////////////////////////
// Make the DIV element draggable:
dragElement(document.getElementById("draggable"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-handler")) {
    // if present, the handler is where you move the DIV from:
    document.getElementById(elmnt.id + "-handler").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
