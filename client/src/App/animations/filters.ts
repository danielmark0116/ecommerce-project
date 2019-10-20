import { TweenMax, Power1 } from 'gsap';

const animationTime = 0.2;
const easing = Power1.easeOut;

export const triggerFiltersContainer = (node: any, active: Boolean) => {
  if (active) {
    TweenMax.fromTo(
      node,
      animationTime,
      {
        left: '-100%'
      },
      {
        left: '0%',
        ease: easing
      }
    );
  } else {
    TweenMax.fromTo(
      node,
      animationTime,
      {
        left: '0%'
      },
      {
        left: '-100%',
        ease: easing
      }
    );
  }
};
