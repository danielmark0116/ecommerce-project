import { TweenMax, TimelineLite, Back, Power2 } from 'gsap';

const animationTime = 0.4;
const easing = Back.easeOut.config(1);
const easingPop = Power2.easeInOut;
const easingOut = Back.easeIn.config(1);

export const toggleNotification = (
  node: any,
  active: Boolean,
  cb: Function
) => {
  if (active) {
    TweenMax.to(node, animationTime, {
      right: '40px',
      ease: easing
    });
  } else {
    TweenMax.to(node, animationTime, {
      right: '-100%',
      ease: easingOut,
      onComplete: () => cb()
    });
  }
};

export const popNotification = (node: any) => {
  const timeL = new TimelineLite();

  timeL
    .to(node, animationTime, {
      opacity: 0,
      right: '-100%',
      ease: easingOut
    })
    .to(node, animationTime, {
      right: '40px',
      opacity: 1,
      ease: easingPop
    });
};
