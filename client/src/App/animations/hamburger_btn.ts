import { TweenMax, Back } from 'gsap';

const animationTime = 0.4;
const easing = Back.easeInOut.config(4);

export const animateHamburger = (nodes: any[], isActive: Boolean) => {
  if (isActive) {
    nodes.forEach(node => {
      TweenMax.to(node, animationTime, { width: 35, ease: easing });
    });
  } else {
    nodes.forEach((node, index) => {
      TweenMax.to(node, animationTime, {
        width: 30 - index * 5,
        ease: easing
      });
    });
  }
};
