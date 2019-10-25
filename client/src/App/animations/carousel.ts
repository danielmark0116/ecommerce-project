import { TweenMax } from 'gsap';

export const handleCarousel = (node: any, slideNo: number) => {
  TweenMax.to(node, 0.3, { x: `-${100 * slideNo}%` });
};
