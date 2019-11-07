import { TweenMax, TimelineLite, Back, Power1 } from 'gsap';

const animationTime = 1;
const easing = Back.easeInOut.config(1);
const easingStrong = Back.easeOut.config(4);

export const contactFloEnlarge = (node: any, active: Boolean) => {
  const t1 = new TimelineLite();
  t1.to(node, 0.2, {
    width: '100vw',
    height: '100vh',
    bottom: 0,
    right: 0,
    borderRadius: 0,
    ease: Power1.easeOut
  }).pause(0);
  if (active) {
    t1.play();
  } else {
    t1.clear();
  }
};

export const contactFloEnter = (node: any, delay: number) => {
  TweenMax.set(node, {
    opacity: 0,
    scale: 0,
    transformPerspective: 400,
    transformOrigin: 'center center',
    rotationX: -200,
    rotationY: 200,
    zIndex: 32
  });

  TweenMax.to(node, animationTime, {
    opacity: 1,
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    ease: easing
  }).delay(delay);
};

export const contactFloBlobEnter = (node: any, delay: number) => {
  TweenMax.set(node, {
    opacity: 0,
    transformPerspective: 400,
    transformOrigin: 'center center'
  });

  TweenMax.fromTo(
    node,
    animationTime * 0.5,
    {
      opacity: 0,
      scale: 0,
      width: 180,
      ease: easing,
      rotationX: -200,
      rotationY: 200
    },
    {
      opacity: 1,
      scale: 1,
      width: 210,
      ease: easing,
      rotationX: 0,
      rotationY: 0
    }
  ).delay(delay);

  TweenMax.to(node, animationTime * 0.5, {
    opacity: 0,
    display: 'none',
    ease: easing,
    rotationX: -200,
    rotationY: 200
  }).delay(delay * 2);
};

export const floatingClickIn = (node: any) => {
  TweenMax.to(node, 0.2, { scale: 0.8, ease: easingStrong });
};

export const floatingClickOut = (node: any) => {
  TweenMax.to(node, 0.2, {
    scale: 1,
    ease: easingStrong
  });
};
