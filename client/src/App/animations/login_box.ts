import { TweenMax, Power4, Power1 } from 'gsap';

export const toggleLoginBox = (node: any, isAcitve: Boolean) => {
  if (isAcitve) {
    TweenMax.fromTo(
      node,
      0.4,
      {
        right: '-100%',
        display: 'block'
      },
      {
        right: '0',
        ease: Power4.easeOut
      }
    );
  } else {
    TweenMax.fromTo(
      node,
      1,
      {
        right: '0'
      },
      {
        right: '-100%',
        ease: Power4.easeInOut
      }
    );
  }
};

export const toggleOverlay = (node: any, isAcitve: Boolean) => {
  if (isAcitve) {
    // TweenMax.set(node, { display: 'block' });

    TweenMax.fromTo(
      node,
      0.4,
      {
        opacity: '0',
        display: 'block'
      },
      {
        opacity: '1',
        ease: Power1.easeOut
      }
    );
  } else {
    TweenMax.fromTo(
      node,
      1,
      {
        opacity: '1'
      },
      {
        opacity: '0',
        display: 'none',
        ease: Power4.easeInOut,
        onComplete: () => {
          // TweenMax.set(node, { display: 'block' });
        }
      }
    );
  }
};
