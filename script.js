'use strict:';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
const html = document.documentElement;
const canvas = document.querySelector('.home-img');
const context = canvas.getContext('2d');
const home = document.getElementById('home');
const about = document.getElementById('about-me');
const projects = document.getElementById('projects');
const contact = document.getElementById('contact');
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

//SCROLLING
ScrollTrigger.create({
  trigger: '#home',
  pin: '#home',
  end: '+=1000',
});
// ScrollTrigger.create({
//   trigger: '#about-me',
//   pin: '#about-me',
//   end: '+=1000',
// });

window.addEventListener('scroll', () => {
  scrollTheImage();
});

const horizontalSections = gsap.utils.toArray('.horizontal');

horizontalSections.forEach(function (sec, i) {
  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

  gsap.fromTo(
    thisAnimWrap,
    {
      x: () => (thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()),
    },
    {
      x: () => (thisAnimWrap.classList.contains('to-right') ? getToValue() : 0),
      ease: 'none',
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: () => '+=' + (thisAnimWrap.scrollWidth - window.innerWidth),
        pin: thisPinWrap,
        invalidateOnRefresh: true,
        //anticipatePin: 1,
        scrub: true,
        //markers: true,
      },
    }
  );
});
