import { TimelineLite, Back } from 'gsap';

const animationTime = 0.1;
const easing = Back.easeIn.config(1);
const color = '#060036';

export const animateCheckBox = (nodes: any[], index: number) => {
  nodes.forEach((node, key) => {
    const t1 = new TimelineLite();

    t1.to(node, animationTime, {
      scale: 0.9,
      x: key === index ? -2 : 0,
      ease: easing
    }).to(node, animationTime, {
      scale: 1,
      x: 0,
      backgroundColor: key === index ? color : 'transparent',
      borderColor: key === index ? color : '#bebdbf',
      ease: easing
    });
  });
};
