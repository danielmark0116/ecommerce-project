import { TweenMax } from 'gsap';

const animationTime = 0.5;
const initDelay = 0.2;

export const animateLink = (node: any, index: number) => {
  TweenMax.from(node, animationTime, { scale: 0, x: -10 }).delay(
    initDelay * index
  );
};
