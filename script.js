'use strict:';
const html = document.documentElement;
const canvas = document.querySelector('.home-img');
const context = canvas.getContext('2d');
const home = document.getElementById('home');
const currentFrame = (index) =>
  `https://nicholai.tech/v2/img/Home2/Home2_${index
    .toString()
    .padStart(5, `0`)}.png`;

const frameCount = 53;

canvas.height = 800;
canvas.width = 800;
const img = new Image();

img.src = currentFrame(1);

img.onload = () => {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};
const scrollToNextPage = () => {
  about.scrollIntoView({
    behavior: 'smooth',
  });
};

const toTheTop = () => {
  home.scrollTo(0, 0);
};
const scrollTheImage = () => {
  let scrollTop = html.scrollTop;
  let maxScrollTop = html.scrollHeight - window.innerHeight;
  let scrollFraction = scrollTop / maxScrollTop;
  let frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => {
    updateImage(frameIndex + 1);
  });
};
