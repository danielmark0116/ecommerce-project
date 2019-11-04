import { TimelineLite, Bounce, Power1, Back } from 'gsap';

const easing = Bounce.easeOut;
const backEasing = Back.easeInOut.config(4);

export const animatePillBg = (node: any, cb: Function) => {
  const timeline = new TimelineLite();

  timeline
    .to(node, 0.1, {
      width: 100,
      ease: Power1.easeIn,
      onComplete: () => cb()
    })
    .to(node, 0.4, { width: 40, ease: easing });
};

export const pillBounce = (node: any) => {
  const timeline = new TimelineLite();

  timeline
    .to(node, 0.1, {
      scale: 0.9,
      ease: Power1.easeIn
    })
    .to(node, 0.4, { scale: 1, ease: backEasing });
};
