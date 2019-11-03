import { TweenMax, Back } from 'gsap';

const animationTime = 1;
const easing = Back.easeInOut.config(1);

export const fadeIn = (node: any) => {
  TweenMax.from(node, animationTime, {
    opacity: 0,
    ease: easing
  });
};

export const fadeInUp = (node: any) => {
  TweenMax.from(node, animationTime, {
    bottom: '-100px',
    opacity: 0,
    ease: easing
  });
};

export const fadeInDown = (node: any) => {
  TweenMax.from(node, animationTime, {
    top: '-100px',
    opacity: 0,
    ease: easing
  });
};
