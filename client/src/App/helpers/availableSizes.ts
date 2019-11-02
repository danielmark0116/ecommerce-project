import { sizeData } from '../types/sizeData';

export const checkAvailableSizes = (data: sizeData | null) => {
  if (!data) {
    return [];
  } else {
    return Object.values(data)
      .map((value, index) => {
        if (value !== 0) return Object.keys(data)[index];
        return '';
      })
      .filter(item => item !== '');
  }
};

export const checkAvailableSizesObj = (data: sizeData | null) => {
  if (!data) {
    return {};
  } else {
    let initSizes = {};

    return Object.values(data)
      .map((value, index) => {
        if (value !== 0) return Object.keys(data)[index];
        return '';
      })
      .filter(item => item !== '');
  }
};
