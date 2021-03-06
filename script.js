'use strict:';
gsap.registerPlugin(ScrollTrigger);
const html = document.documentElement;
const canvas = document.querySelector('.home-img');
const context = canvas.getContext('2d');
const home = document.getElementById('home');
const about = document.getElementById('about-me');
const currentFrame = (index) =>
  `https://nicholai.tech/v2/img/Home4/Home4_${index
    .toString()
    .padStart(5, `0`)}.png`;

const frameCount = 51;

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
ScrollTrigger.create({
  trigger: '#home',
  pin: '#home',
  end: '+=1000',
});

window.addEventListener('scroll', () => {
  scrollTheImage();
});

let observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === true) scrollToNextPage();
  },
  { threshold: [0] }
);

observer.observe(document.querySelector('#about-me'));
