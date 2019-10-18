import { TweenMax, Back } from 'gsap';

const animationTime = 0.4;
const easing = Back.easeInOut;

export const animateHamburger = (nodes: any[], isActive: Boolean) => {
  if (isActive) {
    nodes.forEach(node => {
      TweenMax.to(node, animationTime, { width: 30, ease: easing });
    });
  } else {
    nodes.forEach((node, index) => {
      TweenMax.to(node, animationTime, {
        width: 25 - index * 5,
        ease: easing
      });
    });
  }
};
