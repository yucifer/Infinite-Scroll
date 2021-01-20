const count = 30;
const apiKey = "mnxsU24GP9yQmB-UdKJ273jAsVOyIgQ6DD7ANjYRLp0";

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready = ", ready);
  }
}

// Set Attribute Helper Function
function setAttributes(element, attributes) {
  const newElement = document.createElement(element);
  for (key in attributes) {
    newElement.setAttribute(key, attributes[key]);
  }
  //   console.log(newElement);
  //   console.log(attributes);
  //   console.log(element);
  return newElement;
}

async function getPhotos() {
  try {
    ready = false;
    imagesLoaded = 0;
    loader.hidden = false;
    const response = await fetch(apiUrl);
    const photoArray = await response.json();
    totalImages = photoArray.length;
    console.log("totalImages = ", totalImages);
    photoArray.forEach((photo) => {
      const a = setAttributes("a", {
        href: photo.links.html,
        target: "_blank",
      });

      const image = setAttributes("img", {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      //   Event Listener, check when each is finished loading.
      image.addEventListener("load", imageLoaded);
      a.appendChild(image);
      imageContainer.appendChild(a);
    });
  } catch (error) {
    console.log("oops!! error", error);
  }
}

// Check to see if scrolling near the bottom of the page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    858;
    // console.log("getting photos");
    // console.log("totalImages in scroll", totalImages);
    // console.log("ready in scroll", ready);
  }
});

// On Load
getPhotos();
AOS.init({
  duration: 1200,
});
// WITHOUT HELPER
//   const a = document.createElement("a");
//   a.setAttribute("href", photo.links.html);
//   a.setAttribute("target", "_blank");
