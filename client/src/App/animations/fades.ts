import { TweenMax, TimelineLite, Back, Power2 } from 'gsap';

const animationTime = 1;
const easing = Back.easeInOut.config(1);
const initDelay = 0.1;

export const fadeIn = (node: any, index: number = 0) => {
  TweenMax.from(node, animationTime, {
    opacity: 0,
    ease: easing
  }).delay(initDelay * index);
};

export const fadeInUp = (node: any, index: number = 0) => {
  TweenMax.from(node, animationTime, {
    y: '-100px',
    opacity: 0,
    ease: easing
  }).delay(initDelay * index);
};

export const fadeInDown = (node: any, index: number = 0) => {
  TweenMax.from(node, animationTime, {
    top: '-100px',
    opacity: 0,
    ease: easing
  }).delay(initDelay * index);
};

export const fadeOut = (node: any, cb: Function = () => null) => {
  const t1 = new TimelineLite();

  t1.to(node, animationTime * 0.5, {
    opacity: 0,
    ease: Power2.easeInOut,
    onComplete: () => cb()
  }).to(node, 0.1, { opacity: 1 });
};
